import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { FilterCategory } from '../types';
import { COLORS } from '../constants';
import { CategoryIcon } from './CategoryIcon';

interface CategoryToggleRowProps {
  category: FilterCategory;
  enabled: boolean;
  ruleCount: number;
  onToggle: () => void;
}

export function CategoryToggleRow({
  category,
  enabled,
  ruleCount,
  onToggle,
}: CategoryToggleRowProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CategoryIcon name={category.iconName} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          {category.displayName}
        </Text>
        <Text style={styles.description}>
          {category.description}
        </Text>
        <Text style={styles.ruleCount}>
          {ruleCount} rules
        </Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: COLORS.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  titleDark: {
    color: COLORS.textDark,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ruleCount: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
    fontWeight: '500',
  },
});
