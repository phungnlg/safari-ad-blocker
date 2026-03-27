import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { COLORS } from '../constants';
import { StatsService } from '../services/StatsService';

interface QuickStatsCardProps {
  activeRuleCount: number;
  estimatedBlocked: number;
  onPress: () => void;
}

export function QuickStatsCard({
  activeRuleCount,
  estimatedBlocked,
  onPress,
}: QuickStatsCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      style={[styles.container, isDark && styles.containerDark]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.statColumn}>
        <Text style={styles.label}>Active Rules</Text>
        <Text style={[styles.value, isDark && styles.valueDark]}>
          {StatsService.formatNumber(activeRuleCount)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.statColumn, styles.statColumnRight]}>
        <Text style={styles.label}>Est. Blocked</Text>
        <Text style={[styles.value, isDark && styles.valueDark]}>
          {StatsService.formatNumber(estimatedBlocked)}
        </Text>
      </View>

      <Text style={styles.chevron}>{'\u203A'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  containerDark: {
    backgroundColor: COLORS.cardDark,
  },
  statColumn: {
    flex: 1,
  },
  statColumnRight: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  valueDark: {
    color: COLORS.textDark,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.separator,
    marginHorizontal: 16,
  },
  chevron: {
    fontSize: 24,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
});
