export interface FilterRule {
  trigger: FilterTrigger;
  action: FilterAction;
}

export interface FilterTrigger {
  'url-filter': string;
  'url-filter-is-case-sensitive'?: boolean;
  'resource-type'?: string[];
  'load-type'?: string[];
  'if-domain'?: string[];
  'unless-domain'?: string[];
  'if-top-url'?: string[];
  'unless-top-url'?: string[];
}

export interface FilterAction {
  type: 'block' | 'css-display-none' | 'ignore-previous-rules';
  selector?: string;
}

export type FilterCategoryId = 'ads' | 'trackers' | 'social' | 'annoyances';

export interface FilterCategory {
  id: FilterCategoryId;
  displayName: string;
  description: string;
  iconName: string;
  ruleCount: number;
}

export interface WhitelistEntry {
  id: string;
  domain: string;
  dateAdded: string; // ISO date string
}

export interface BlockingStats {
  estimatedBlockedRequests: number;
  activeRuleCount: number;
  enabledCategoryCount: number;
  whitelistedDomainCount: number;
  protectedSince: string; // ISO date string
}
