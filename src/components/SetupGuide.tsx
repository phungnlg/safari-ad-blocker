import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Platform,
} from 'react-native';
import { COLORS } from '../constants';

const IOS_STEPS = [
  'Configure a DNS-based content blocker or VPN-based ad blocker',
  'Go to Settings > General > VPN & Device Management',
  'Enable the DNS configuration profile',
  'Return to AdBlocker and verify protection is active',
  'Customize filter categories to your preference',
];

const ANDROID_STEPS = [
  'Go to Settings > Network & Internet > Private DNS',
  'Select "Private DNS provider hostname"',
  'Enter your DNS blocking provider address',
  'Return to AdBlocker and verify protection is active',
  'Customize filter categories to your preference',
];

export function SetupGuide() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const steps = Platform.OS === 'ios' ? IOS_STEPS : ANDROID_STEPS;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={[styles.stepText, isDark && styles.stepTextDark]}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    padding: 16,
  },
  containerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  stepTextDark: {
    color: COLORS.textDark,
  },
});
