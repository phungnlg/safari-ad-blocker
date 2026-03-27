import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useStore } from '../src/store/useStore';
import { StatsService } from '../src/services/StatsService';
import { WhitelistEntry } from '../src/types';
import { COLORS } from '../src/constants';

export default function WhitelistScreen() {
  const [newDomain, setNewDomain] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { whitelistedDomains, addWhitelistDomain, removeWhitelistDomain } =
    useStore();

  const handleAdd = () => {
    const trimmed = newDomain.trim();
    if (!trimmed) return;

    addWhitelistDomain(trimmed);
    setNewDomain('');

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics may not be available
    }
  };

  const handleDelete = (entry: WhitelistEntry) => {
    Alert.alert(
      'Remove Domain',
      `Remove "${entry.domain}" from the whitelist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeWhitelistDomain(entry.id);
            try {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            } catch {
              // Haptics may not be available
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: WhitelistEntry }) => (
    <View style={[styles.entryRow, isDark && styles.entryRowDark]}>
      <View style={styles.entryText}>
        <Text style={[styles.domain, isDark && styles.domainDark]}>
          {item.domain}
        </Text>
        <Text style={styles.dateAdded}>
          Added {StatsService.formatDate(item.dateAdded)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        style={styles.deleteButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.deleteIcon}>{'\u{1F5D1}\uFE0F'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>{'\u{1F310}'}</Text>
      <Text style={[styles.emptyTitle, isDark && styles.emptyTitleDark]}>
        No Whitelisted Domains
      </Text>
      <Text style={styles.emptySubtitle}>
        Add domains above to disable ad blocking on specific websites.
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.screen, isDark && styles.screenDark]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      {/* Add Domain Input */}
      <View style={styles.inputSection}>
        <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
          ADD DOMAIN
        </Text>
        <View style={[styles.inputCard, isDark && styles.inputCardDark]}>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="example.com"
            placeholderTextColor={COLORS.textSecondary}
            value={newDomain}
            onChangeText={setNewDomain}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              !newDomain.trim() && styles.addButtonDisabled,
            ]}
            onPress={handleAdd}
            disabled={!newDomain.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.inputFooter}>
          Whitelisted domains will not have ads or trackers blocked.
        </Text>
      </View>

      {/* Domain List */}
      <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark, styles.listHeader]}>
        WHITELISTED DOMAINS ({whitelistedDomains.length})
      </Text>

      <FlatList
        data={whitelistedDomains}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
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
  inputSection: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 16,
    letterSpacing: 0.5,
  },
  sectionHeaderDark: {
    color: COLORS.textSecondary,
  },
  listHeader: {
    paddingHorizontal: 16,
  },
  inputCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputCardDark: {
    backgroundColor: COLORS.cardDark,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 8,
  },
  inputDark: {
    color: COLORS.textDark,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  addButtonDisabled: {
    opacity: 0.4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  inputFooter: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
    marginHorizontal: 16,
    lineHeight: 18,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  entryRow: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  entryRowDark: {
    backgroundColor: COLORS.cardDark,
  },
  entryText: {
    flex: 1,
  },
  domain: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  domainDark: {
    color: COLORS.textDark,
  },
  dateAdded: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyTitleDark: {
    color: COLORS.textDark,
  },
  emptySubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 21,
  },
});
