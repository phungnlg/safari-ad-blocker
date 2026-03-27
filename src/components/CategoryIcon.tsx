import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface CategoryIconProps {
  name: string;
  size: number;
  color: string;
}

const ICON_MAP: Record<string, string> = {
  'ban': '\u{1F6AB}',
  'eye-off': '\u{1F648}',
  'users': '\u{1F465}',
  'x-circle': '\u{274C}',
  'shield': '\u{1F6E1}',
  'shield-check': '\u{2705}',
  'shield-off': '\u{26D4}',
  'settings': '\u{2699}',
  'chart': '\u{1F4CA}',
  'list': '\u{1F4CB}',
  'chevron-right': '\u{203A}',
  'check': '\u{2713}',
  'plus': '+',
  'trash': '\u{1F5D1}',
  'globe': '\u{1F310}',
  'info': '\u{2139}',
  'zap': '\u{26A1}',
  'lock': '\u{1F512}',
  'sliders': '\u{1F39A}',
  'wifi': '\u{1F4F6}',
};

/**
 * Simple text-based icon component.
 * Uses Unicode characters/emoji as a lightweight alternative to icon libraries.
 */
export function CategoryIcon({ name, size, color }: CategoryIconProps) {
  const icon = ICON_MAP[name] || '\u{2022}';

  return (
    <Text style={[styles.icon, { fontSize: size, color }]}>
      {icon}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
});
