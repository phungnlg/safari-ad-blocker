import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useStore } from '../src/store/useStore';
import { StatsService } from '../src/services/StatsService';
import { COLORS } from '../src/constants';

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    activeRuleCount,
    enabledCategories,
    whitelistedDomains,
    installDate,
  } = useStore();

  const estimatedBlocked = StatsService.calculateEstimatedBlocked(
    activeRuleCount,
    installDate
  );

  const daysActive = StatsService.daysSinceInstall(installDate);

  return (
    <ScrollView
      style={[styles.screen, isDark && styles.screenDark]}
      contentContainerStyle={styles.content}
    >
      {/* Main Stat Hero */}
      <View style={[styles.heroCard, isDark && styles.heroCardDark]}>
        <Text style={styles.heroIcon}>{'\u{1F4CA}'}</Text>
        <Text style={[styles.heroNumber, isDark && styles.heroNumberDark]}>
          {StatsService.formatNumber(estimatedBlocked)}
        </Text>
        <Text style={styles.heroLabel}>
          Estimated Blocked Requests
        </Text>
      </View>

      {/* Details Section */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        DETAILS
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <DetailRow
          label="Active Rules"
          value={StatsService.formatNumber(activeRuleCount)}
          isDark={isDark}
        />
        <View style={[styles.separator, isDark && styles.separatorDark]} />
        <DetailRow
          label="Categories Enabled"
          value={`${enabledCategories.size}`}
          isDark={isDark}
        />
        <View style={[styles.separator, isDark && styles.separatorDark]} />
        <DetailRow
          label="Whitelisted Domains"
          value={`${whitelistedDomains.length}`}
          isDark={isDark}
        />
        <View style={[styles.separator, isDark && styles.separatorDark]} />
        <DetailRow
          label="Days Active"
          value={`${daysActive}`}
          isDark={isDark}
        />
        <View style={[styles.separator, isDark && styles.separatorDark]} />
        <DetailRow
          label="Protected Since"
          value={StatsService.formatDate(installDate)}
          isDark={isDark}
        />
      </View>

      {/* Breakdown Section */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        DAILY BREAKDOWN
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <DetailRow
          label="Avg. Blocks Per Day"
          value={StatsService.formatNumber(
            daysActive > 0 ? Math.round(estimatedBlocked / daysActive) : 0
          )}
          isDark={isDark}
        />
        <View style={[styles.separator, isDark && styles.separatorDark]} />
        <DetailRow
          label="Blocks Per Rule/Day"
          value="2.5 (est.)"
          isDark={isDark}
        />
      </View>

      {/* Disclaimer */}
      <View style={[styles.card, isDark && styles.cardDark, styles.disclaimerCard]}>
        <Text style={styles.disclaimer}>
          Statistics are estimated based on the number of active filter rules and
          days of protection. Content blockers and DNS-based filtering do not
          provide per-request blocking callbacks, so actual numbers may vary.
        </Text>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  isDark: boolean;
}

function DetailRow({ label, value, isDark }: DetailRowProps) {
  return (
    <View style={detailStyles.row}>
      <Text style={[detailStyles.label, isDark && detailStyles.labelDark]}>
        {label}
      </Text>
      <Text style={detailStyles.value}>{value}</Text>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
  },
  labelDark: {
    color: COLORS.textDark,
  },
  value: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenDark: {
    backgroundColor: COLORS.backgroundDark,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroCardDark: {
    backgroundColor: COLORS.cardDark,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  heroNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.text,
    fontVariant: ['tabular-nums'],
  },
  heroNumberDark: {
    color: COLORS.textDark,
  },
  heroLabel: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
    letterSpacing: 0.5,
  },
  sectionHeaderDark: {
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardDark: {
    backgroundColor: COLORS.cardDark,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.separator,
    marginLeft: 16,
  },
  separatorDark: {
    backgroundColor: COLORS.separatorDark,
  },
  disclaimerCard: {
    marginTop: 24,
    padding: 16,
  },
  disclaimer: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 20,
  },
});
