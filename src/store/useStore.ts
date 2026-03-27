import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilterCategoryId, WhitelistEntry } from '../types';
import { ALL_CATEGORY_IDS, STORAGE_KEYS } from '../constants';
import { FilterEngine } from '../services/FilterEngine';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

interface AppState {
  // Onboarding
  onboardingCompleted: boolean;
  setOnboardingCompleted: (value: boolean) => void;

  // Categories
  enabledCategories: Set<FilterCategoryId>;
  toggleCategory: (categoryId: FilterCategoryId) => void;
  isCategoryEnabled: (categoryId: FilterCategoryId) => boolean;

  // Whitelist
  whitelistedDomains: WhitelistEntry[];
  addWhitelistDomain: (domain: string) => void;
  removeWhitelistDomain: (id: string) => void;

  // Stats
  installDate: string;
  activeRuleCount: number;

  // DNS blocking (React Native approach)
  dnsBlockingEnabled: boolean;
  setDnsBlockingEnabled: (value: boolean) => void;

  // Loading
  isLoading: boolean;
  isReloading: boolean;

  // Actions
  reloadRules: () => void;
  hydrate: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  onboardingCompleted: false,
  enabledCategories: new Set<FilterCategoryId>(ALL_CATEGORY_IDS),
  whitelistedDomains: [],
  installDate: new Date().toISOString(),
  activeRuleCount: 0,
  dnsBlockingEnabled: false,
  isLoading: true,
  isReloading: false,

  // Onboarding
  setOnboardingCompleted: (value: boolean) => {
    set({ onboardingCompleted: value });
    AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, JSON.stringify(value));
  },

  // Category toggles
  toggleCategory: (categoryId: FilterCategoryId) => {
    const { enabledCategories } = get();
    const newCategories = new Set(enabledCategories);

    if (newCategories.has(categoryId)) {
      newCategories.delete(categoryId);
    } else {
      newCategories.add(categoryId);
    }

    set({ enabledCategories: newCategories });
    AsyncStorage.setItem(
      STORAGE_KEYS.ENABLED_CATEGORIES,
      JSON.stringify(Array.from(newCategories))
    );

    // Recalculate active rules
    get().reloadRules();
  },

  isCategoryEnabled: (categoryId: FilterCategoryId) => {
    return get().enabledCategories.has(categoryId);
  },

  // Whitelist
  addWhitelistDomain: (domain: string) => {
    const trimmed = domain.trim().toLowerCase();
    if (!trimmed) return;

    const { whitelistedDomains } = get();
    if (whitelistedDomains.some((e) => e.domain === trimmed)) return;

    const newEntry: WhitelistEntry = {
      id: generateId(),
      domain: trimmed,
      dateAdded: new Date().toISOString(),
    };

    const updated = [...whitelistedDomains, newEntry];
    set({ whitelistedDomains: updated });
    AsyncStorage.setItem(STORAGE_KEYS.WHITELISTED_DOMAINS, JSON.stringify(updated));

    get().reloadRules();
  },

  removeWhitelistDomain: (id: string) => {
    const { whitelistedDomains } = get();
    const updated = whitelistedDomains.filter((e) => e.id !== id);
    set({ whitelistedDomains: updated });
    AsyncStorage.setItem(STORAGE_KEYS.WHITELISTED_DOMAINS, JSON.stringify(updated));

    get().reloadRules();
  },

  // DNS blocking
  setDnsBlockingEnabled: (value: boolean) => {
    set({ dnsBlockingEnabled: value });
    AsyncStorage.setItem(STORAGE_KEYS.DNS_BLOCKING_ENABLED, JSON.stringify(value));
  },

  // Rule assembly
  reloadRules: () => {
    set({ isReloading: true });

    const { enabledCategories, whitelistedDomains } = get();
    const domains = whitelistedDomains.map((e) => e.domain);
    const rules = FilterEngine.assembleRules(enabledCategories, domains);

    set({
      activeRuleCount: rules.length,
      isReloading: false,
    });
  },

  // Hydrate from AsyncStorage
  hydrate: async () => {
    try {
      const [
        onboardingStr,
        categoriesStr,
        domainsStr,
        installDateStr,
        dnsStr,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED),
        AsyncStorage.getItem(STORAGE_KEYS.ENABLED_CATEGORIES),
        AsyncStorage.getItem(STORAGE_KEYS.WHITELISTED_DOMAINS),
        AsyncStorage.getItem(STORAGE_KEYS.INSTALL_DATE),
        AsyncStorage.getItem(STORAGE_KEYS.DNS_BLOCKING_ENABLED),
      ]);

      const onboardingCompleted = onboardingStr ? JSON.parse(onboardingStr) : false;

      const enabledCategories = categoriesStr
        ? new Set<FilterCategoryId>(JSON.parse(categoriesStr))
        : new Set<FilterCategoryId>(ALL_CATEGORY_IDS);

      const whitelistedDomains: WhitelistEntry[] = domainsStr
        ? JSON.parse(domainsStr)
        : [];

      let installDate: string;
      if (installDateStr) {
        installDate = JSON.parse(installDateStr);
      } else {
        installDate = new Date().toISOString();
        await AsyncStorage.setItem(
          STORAGE_KEYS.INSTALL_DATE,
          JSON.stringify(installDate)
        );
      }

      const dnsBlockingEnabled = dnsStr ? JSON.parse(dnsStr) : false;

      // Calculate active rules
      const domains = whitelistedDomains.map((e) => e.domain);
      const rules = FilterEngine.assembleRules(enabledCategories, domains);

      set({
        onboardingCompleted,
        enabledCategories,
        whitelistedDomains,
        installDate,
        dnsBlockingEnabled,
        activeRuleCount: rules.length,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to hydrate store:', error);
      set({ isLoading: false });
    }
  },
}));
