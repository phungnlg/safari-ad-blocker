import { ESTIMATED_BLOCKS_PER_RULE_PER_DAY } from '../constants';

/**
 * StatsService - TypeScript equivalent of the Swift StatsService.
 *
 * Calculates estimated blocking statistics based on active rules
 * and days since installation. Since neither Safari Content Blockers
 * nor DNS-based blocking provide per-request callbacks, stats are estimated.
 */
export class StatsService {
  /**
   * Calculate estimated number of blocked requests.
   */
  static calculateEstimatedBlocked(
    activeRuleCount: number,
    installDate: string
  ): number {
    const install = new Date(installDate);
    const now = new Date();
    const diffMs = now.getTime() - install.getTime();
    const daysActive = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    return Math.round(
      activeRuleCount * ESTIMATED_BLOCKS_PER_RULE_PER_DAY * daysActive
    );
  }

  /**
   * Format a large number with commas for display.
   */
  static formatNumber(num: number): string {
    return num.toLocaleString();
  }

  /**
   * Format a date for display.
   */
  static formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Get the number of days since installation.
   */
  static daysSinceInstall(installDate: string): number {
    const install = new Date(installDate);
    const now = new Date();
    const diffMs = now.getTime() - install.getTime();
    return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  }
}
