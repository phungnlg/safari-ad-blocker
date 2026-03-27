import { FilterCategoryId, FilterRule } from '../types';

import adsRules from '../assets/filters/ads_rules.json';
import trackersRules from '../assets/filters/trackers_rules.json';
import socialRules from '../assets/filters/social_rules.json';
import annoyancesRules from '../assets/filters/annoyances_rules.json';

const BUNDLED_RULES: Record<FilterCategoryId, FilterRule[]> = {
  ads: adsRules as FilterRule[],
  trackers: trackersRules as FilterRule[],
  social: socialRules as FilterRule[],
  annoyances: annoyancesRules as FilterRule[],
};

/**
 * FilterEngine - TypeScript equivalent of the Swift FilterEngine.
 *
 * Assembles filter rules based on enabled categories and whitelist entries.
 * In the native iOS version, assembled rules are written to an App Group container
 * and picked up by the Safari Content Blocker extension. In this React Native version,
 * rules are assembled in-memory and could be used with a DNS-based blocking approach
 * or a local proxy.
 */
export class FilterEngine {
  /**
   * Get all bundled rules for a given category.
   */
  static getRulesForCategory(categoryId: FilterCategoryId): FilterRule[] {
    return BUNDLED_RULES[categoryId] || [];
  }

  /**
   * Get the count of rules in a specific category.
   */
  static getRuleCount(categoryId: FilterCategoryId): number {
    return (BUNDLED_RULES[categoryId] || []).length;
  }

  /**
   * Assemble all active rules based on enabled categories and whitelisted domains.
   * Returns the full set of rules that would be applied.
   */
  static assembleRules(
    enabledCategories: Set<FilterCategoryId>,
    whitelistedDomains: string[]
  ): FilterRule[] {
    const allRules: FilterRule[] = [];

    for (const categoryId of enabledCategories) {
      const rules = BUNDLED_RULES[categoryId];
      if (rules) {
        allRules.push(...rules);
      }
    }

    // Append whitelist rules (ignore-previous-rules) for each whitelisted domain
    for (const domain of whitelistedDomains) {
      allRules.push({
        trigger: {
          'url-filter': '.*',
          'if-domain': [`*${domain}`],
        },
        action: {
          type: 'ignore-previous-rules',
        },
      });
    }

    return allRules;
  }

  /**
   * Extract all blocked domains/patterns from the active rules.
   * Useful for DNS-based blocking integration.
   */
  static extractBlockedDomains(
    enabledCategories: Set<FilterCategoryId>
  ): string[] {
    const domains: string[] = [];

    for (const categoryId of enabledCategories) {
      const rules = BUNDLED_RULES[categoryId];
      if (!rules) continue;

      for (const rule of rules) {
        if (rule.action.type === 'block') {
          // Extract domain-like patterns from url-filter
          const pattern = rule.trigger['url-filter'];
          // Clean up regex escapes to get approximate domain
          const cleaned = pattern
            .replace(/\\\./g, '.')
            .replace(/\.\*/g, '')
            .replace(/\\/g, '')
            .replace(/^\.\*/, '')
            .replace(/\.\*$/, '');

          if (cleaned && cleaned !== '.*' && cleaned.includes('.')) {
            domains.push(cleaned);
          }
        }
      }
    }

    return domains;
  }

  /**
   * Check if a given URL would be blocked by the current rule set.
   * Simplified pattern matching for demonstration purposes.
   */
  static wouldBlock(
    url: string,
    enabledCategories: Set<FilterCategoryId>,
    whitelistedDomains: string[]
  ): boolean {
    // Check whitelist first
    for (const domain of whitelistedDomains) {
      if (url.includes(domain)) {
        return false;
      }
    }

    // Check against blocking rules
    for (const categoryId of enabledCategories) {
      const rules = BUNDLED_RULES[categoryId];
      if (!rules) continue;

      for (const rule of rules) {
        if (rule.action.type !== 'block') continue;

        try {
          const pattern = rule.trigger['url-filter'];
          const regex = new RegExp(pattern, 'i');
          if (regex.test(url)) {
            return true;
          }
        } catch {
          // Invalid regex pattern, skip
          continue;
        }
      }
    }

    return false;
  }
}
