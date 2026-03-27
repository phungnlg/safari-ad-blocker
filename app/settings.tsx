import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../src/store/useStore';
import { SetupGuide } from '../src/components/SetupGuide';
import { CategoryIcon } from '../src/components/CategoryIcon';
import { COLORS, FILTER_CATEGORIES, APP_VERSION } from '../src/constants';
import { FilterEngine } from '../src/services/FilterEngine';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    enabledCategories,
    toggleCategory,
    isCategoryEnabled,
    whitelistedDomains,
    activeRuleCount,
    dnsBlockingEnabled,
    setDnsBlockingEnabled,
  } = useStore();

  return (
    <ScrollView
      style={[styles.screen, isDark && styles.screenDark]}
      contentContainerStyle={styles.content}
    >
      {/* Filter Categories Section */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        FILTER CATEGORIES
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        {FILTER_CATEGORIES.map((category, index) => (
          <React.Fragment key={category.id}>
            {index > 0 && (
              <View style={[styles.separator, isDark && styles.separatorDark]} />
            )}
            <View style={styles.row}>
              <View style={styles.rowIconContainer}>
                <CategoryIcon
                  name={category.iconName}
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.rowTextContainer}>
                <Text style={[styles.rowTitle, isDark && styles.rowTitleDark]}>
                  {category.displayName}
                </Text>
                <Text style={styles.rowSubtitle}>
                  {FilterEngine.getRuleCount(category.id)} rules
                </Text>
              </View>
              <Switch
                value={isCategoryEnabled(category.id)}
                onValueChange={() => toggleCategory(category.id)}
                trackColor={{ false: '#767577', true: COLORS.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </React.Fragment>
        ))}
      </View>

      {/* Whitelist Section */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        WHITELIST
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/whitelist')}
          activeOpacity={0.6}
        >
          <Text style={styles.rowEmoji}>{'\u{1F4CB}'}</Text>
          <View style={styles.rowTextContainer}>
            <Text style={[styles.rowTitle, isDark && styles.rowTitleDark]}>
              Whitelisted Domains
            </Text>
          </View>
          <Text style={styles.rowBadge}>{whitelistedDomains.length}</Text>
          <Text style={styles.chevron}>{'\u203A'}</Text>
        </TouchableOpacity>
      </View>

      {/* DNS Blocking Section */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        DNS BLOCKING
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <View style={styles.row}>
          <Text style={styles.rowEmoji}>{'\u{1F310}'}</Text>
          <View style={styles.rowTextContainer}>
            <Text style={[styles.rowTitle, isDark && styles.rowTitleDark]}>
              DNS-Based Blocking
            </Text>
            <Text style={styles.rowSubtitle}>
              Block ads at the network level
            </Text>
          </View>
          <Switch
            value={dnsBlockingEnabled}
            onValueChange={setDnsBlockingEnabled}
            trackColor={{ false: '#767577', true: COLORS.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
      <Text style={styles.sectionFooter}>
        DNS blocking intercepts domain lookups to prevent connections to known ad
        and tracking servers. This works across all apps on the device.
      </Text>

      {/* Setup Guide Section */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        SETUP GUIDE
      </Text>
      <View style={[styles.card, isDark && styles.cardDark, styles.guideCard]}>
        <SetupGuide />
      </View>

      {/* About Section */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        ABOUT
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <View style={styles.row}>
          <Text style={[styles.rowTitle, isDark && styles.rowTitleDark]}>
            Version
          </Text>
          <Text style={styles.rowValue}>{APP_VERSION}</Text>
        </View>
        <View style={[styles.separator, isDark && styles.separatorDark]} />
        <View style={styles.row}>
          <Text style={[styles.rowTitle, isDark && styles.rowTitleDark]}>
            Active Rules
          </Text>
          <Text style={styles.rowValue}>{activeRuleCount}</Text>
        </View>
        <View style={[styles.separator, isDark && styles.separatorDark]} />
        <View style={styles.row}>
          <Text style={[styles.rowTitle, isDark && styles.rowTitleDark]}>
            Enabled Categories
          </Text>
          <Text style={styles.rowValue}>{enabledCategories.size}</Text>
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
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
  sectionFooter: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
    marginHorizontal: 16,
    lineHeight: 18,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardDark: {
    backgroundColor: COLORS.cardDark,
  },
  guideCard: {
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  rowIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    color: COLORS.text,
  },
  rowTitleDark: {
    color: COLORS.textDark,
  },
  rowSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  rowValue: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  rowBadge: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.separator,
    marginLeft: 16,
  },
  separatorDark: {
    backgroundColor: COLORS.separatorDark,
  },
  bottomSpacer: {
    height: 20,
  },
});
