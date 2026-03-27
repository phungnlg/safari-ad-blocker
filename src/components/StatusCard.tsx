import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { COLORS } from '../constants';

interface StatusCardProps {
  activeRuleCount: number;
  isReloading: boolean;
  lastError?: string;
}

export function StatusCard({
  activeRuleCount,
  isReloading,
  lastError,
}: StatusCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isActive = activeRuleCount > 0;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={styles.shieldIcon}>
        {isActive ? '\u{1F6E1}\u{FE0F}' : '\u{26D4}'}
      </Text>

      <Text style={[styles.statusText, isDark && styles.statusTextDark]}>
        {isActive ? 'Protection Active' : 'Protection Inactive'}
      </Text>

      <Text style={[styles.ruleText, { color: isActive ? COLORS.success : COLORS.danger }]}>
        {activeRuleCount} active rules
      </Text>

      {isReloading && (
        <ActivityIndicator
          size="small"
          color={COLORS.primary}
          style={styles.loader}
        />
      )}

      {lastError && (
        <Text style={styles.errorText}>{lastError}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  containerDark: {
    backgroundColor: COLORS.cardDark,
  },
  shieldIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statusTextDark: {
    color: COLORS.textDark,
  },
  ruleText: {
    fontSize: 15,
    fontWeight: '600',
  },
  loader: {
    marginTop: 8,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: 8,
  },
});
