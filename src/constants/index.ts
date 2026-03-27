import { FilterCategory, FilterCategoryId } from '../types';

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'ads',
    displayName: 'Ads',
    description: 'Block advertisements and ad networks',
    iconName: 'ban',
    ruleCount: 25,
  },
  {
    id: 'trackers',
    displayName: 'Trackers',
    description: 'Block analytics and tracking scripts',
    iconName: 'eye-off',
    ruleCount: 15,
  },
  {
    id: 'social',
    displayName: 'Social Widgets',
    description: 'Block social media widgets and share buttons',
    iconName: 'users',
    ruleCount: 10,
  },
  {
    id: 'annoyances',
    displayName: 'Annoyances',
    description: 'Block cookie banners and newsletter popups',
    iconName: 'x-circle',
    ruleCount: 10,
  },
];

export const ALL_CATEGORY_IDS: FilterCategoryId[] = ['ads', 'trackers', 'social', 'annoyances'];

export const ESTIMATED_BLOCKS_PER_RULE_PER_DAY = 2.5;

export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  ENABLED_CATEGORIES: 'enabledCategories',
  WHITELISTED_DOMAINS: 'whitelistedDomains',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  INSTALL_DATE: 'installDate',
  DNS_BLOCKING_ENABLED: 'dnsBlockingEnabled',
} as const;

export const COLORS = {
  primary: '#007AFF',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  secondary: '#8E8E93',
  background: '#F2F2F7',
  card: '#FFFFFF',
  cardDark: '#1C1C1E',
  backgroundDark: '#000000',
  text: '#000000',
  textDark: '#FFFFFF',
  textSecondary: '#8E8E93',
  separator: '#C6C6C8',
  separatorDark: '#38383A',
} as const;
