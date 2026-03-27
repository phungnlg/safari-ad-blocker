import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../src/store/useStore';
import { StatusCard } from '../src/components/StatusCard';
import { QuickStatsCard } from '../src/components/QuickStatsCard';
import { CategoryToggleRow } from '../src/components/CategoryToggleRow';
import { COLORS, FILTER_CATEGORIES } from '../src/constants';
import { FilterEngine } from '../src/services/FilterEngine';
import { StatsService } from '../src/services/StatsService';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    onboardingCompleted,
    isLoading,
    isReloading,
    activeRuleCount,
    enabledCategories,
    installDate,
    toggleCategory,
    isCategoryEnabled,
  } = useStore();

  // Show loading screen while hydrating
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, isDark && styles.loadingContainerDark]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Redirect to onboarding if not completed
  if (!onboardingCompleted) {
    // Use setTimeout to avoid navigation during render
    setTimeout(() => router.replace('/onboarding'), 0);
    return (
      <View style={[styles.loadingContainer, isDark && styles.loadingContainerDark]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const estimatedBlocked = StatsService.calculateEstimatedBlocked(
    activeRuleCount,
    installDate
  );

  return (
    <View style={[styles.screen, isDark && styles.screenDark, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          AdBlocker
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>{'\u2699\uFE0F'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <StatusCard
          activeRuleCount={activeRuleCount}
          isReloading={isReloading}
        />

        {/* Quick Stats */}
        <QuickStatsCard
          activeRuleCount={activeRuleCount}
          estimatedBlocked={estimatedBlocked}
          onPress={() => router.push('/stats')}
        />

        {/* Category Toggles */}
        <View style={[styles.categoriesCard, isDark && styles.categoriesCardDark]}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Filter Categories
          </Text>

          {FILTER_CATEGORIES.map((category, index) => (
            <React.Fragment key={category.id}>
              {index > 0 && (
                <View style={[styles.separator, isDark && styles.separatorDark]} />
              )}
              <CategoryToggleRow
                category={category}
                enabled={isCategoryEnabled(category.id)}
                ruleCount={FilterEngine.getRuleCount(category.id)}
                onToggle={() => toggleCategory(category.id)}
              />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenDark: {
    backgroundColor: COLORS.backgroundDark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingContainerDark: {
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerTitleDark: {
    color: COLORS.textDark,
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 8,
    gap: 16,
    paddingBottom: 40,
  },
  categoriesCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  categoriesCardDark: {
    backgroundColor: COLORS.cardDark,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  sectionTitleDark: {
    color: COLORS.textDark,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.separator,
    marginLeft: 48,
  },
  separatorDark: {
    backgroundColor: COLORS.separatorDark,
  },
});
