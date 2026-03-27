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
import { COLORS } from '../../src/constants';

interface FeatureRowProps {
  icon: string;
  title: string;
  description: string;
  isDark: boolean;
}

function FeatureRow({ icon, title, description, isDark }: FeatureRowProps) {
  return (
    <View style={featureStyles.row}>
      <Text style={featureStyles.icon}>{icon}</Text>
      <View style={featureStyles.textContainer}>
        <Text style={[featureStyles.title, isDark && featureStyles.titleDark]}>
          {title}
        </Text>
        <Text style={featureStyles.description}>{description}</Text>
      </View>
    </View>
  );
}

const featureStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    fontSize: 28,
    marginRight: 16,
    marginTop: 2,
    width: 36,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  titleDark: {
    color: COLORS.textDark,
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
});

export default function OnboardingHowItWorksScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark, { paddingBottom: insets.bottom }]}>
      <View style={styles.spacer} />

      <View style={styles.content}>
        <Text style={styles.icon}>{'\u2699\uFE0F'}</Text>

        <Text style={[styles.title, isDark && styles.titleDark]}>
          How It Works
        </Text>

        <View style={styles.features}>
          <FeatureRow
            icon={'\u{1F310}'}
            title="DNS-Based Blocking"
            description="Blocks ads and trackers at the network level using DNS filtering. Works across all apps."
            isDark={isDark}
          />

          <FeatureRow
            icon={'\u{1F512}'}
            title="On-Device Processing"
            description="All filtering rules are stored locally. No data leaves your device."
            isDark={isDark}
          />

          <FeatureRow
            icon={'\u{1F39A}\uFE0F'}
            title="Customizable Filters"
            description="Choose which categories to block: ads, trackers, social widgets, or annoyances."
            isDark={isDark}
          />
        </View>
      </View>

      <View style={styles.spacer} />

      {/* Page indicator */}
      <View style={styles.pageIndicator}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/onboarding/activate')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Next</Text>
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
    marginBottom: 32,
  },
  titleDark: {
    color: COLORS.textDark,
  },
  features: {
    width: '100%',
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
