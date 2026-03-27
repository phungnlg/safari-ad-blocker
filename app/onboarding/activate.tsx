import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useStore } from '../../src/store/useStore';
import { SetupGuide } from '../../src/components/SetupGuide';
import { COLORS } from '../../src/constants';

export default function OnboardingActivateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { setOnboardingCompleted, reloadRules } = useStore();

  const handleFinish = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // Haptics may not be available on all devices
    }
    setOnboardingCompleted(true);
    reloadRules();
    router.replace('/');
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark, { paddingBottom: insets.bottom }]}>
      <View style={styles.spacer} />

      <View style={styles.content}>
        <Text style={styles.icon}>{'\u2705'}</Text>

        <Text style={[styles.title, isDark && styles.titleDark]}>
          Activate Protection
        </Text>

        <SetupGuide />
      </View>

      <View style={styles.spacer} />

      {/* Page indicator */}
      <View style={styles.pageIndicator}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleFinish}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{"I've Set It Up - Let's Go!"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  containerDark: {
    backgroundColor: COLORS.backgroundDark,
  },
  spacer: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  titleDark: {
    color: COLORS.textDark,
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.separator,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
