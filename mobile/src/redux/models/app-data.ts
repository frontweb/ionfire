export interface AppData {
  id?: number;
  fetchAppUrl?: string;
  apiEndpoint?: string;
  appDataVersion?: number;

  name?: string;
  theme?: string;
  styles?: string;
  pages?: IPage[];
  shopEmail?: string;
  sideMenu?: {
    appLogo?: AppLogo;
    socialMediaLinks?: SocialMediaLinks;
  };
  admob?: {
    banner: {
      iosBannerId: string;
      androidBannerId: string;
    },
    interstitial: {
      millisBetweenDisplays: number;
      autoShowMillis: number;
      iosInterstitialId: string;
      androidInterstitialId: string;
    }
  };
  metadata?: {
    poweredBy?: PoweredBy;
    googleAnalyticsTrackerId: string;
    gcmProjectNumber?: string;
  };
}

export interface AppLogo {
  logoUrl?: string;
  tagline?: string;
}

export interface SocialMediaLinks {
  iconOnly?: boolean;
  urls?: string[];
}

export interface PoweredBy {
  text: string;
  url: string;
}

export interface IPage {
  title: string;
  showAsTab?: boolean;
  iconName?: string;
  cssClasses?: string;
  styles?: string;
  contentBlocks: IContentBlock[];
}

export interface IContentBlock {
  component: string;
  data: any;
  cssClasses?: string;
  styles?: string;
}
