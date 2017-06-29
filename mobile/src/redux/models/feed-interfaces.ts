export const CTA_ACTION_OPEN_URL = 'openURL';
export const CTA_ACTION_OPEN_EMAIL = 'openEmail';

export interface IFeedData {
  nextUrl?: string;
  items?: IFeedItem[];
}

export interface IFeedItem {
  type?: string;
  publishedAt?: string;
  data: any;
  cta?: IFeedItemCta;
}

export interface IFeedItemCta {
  label?:   string;
  action?:  any;
  email?:   string;
  url?:     string;
}
