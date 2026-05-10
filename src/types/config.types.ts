export type SiteConfig = {
  siteUrl: URL;
  lang: "zh_CN" | "en";
  author: string;
  title: string;
  uptime: Date;
  connectSymbol: string;
  websiteTitleStyle: "pathConnectTitle";
  defaultDescription: string;
  avatarLink: URL;
  viewportRecommend: boolean;
  FilingInfo: {
    filingStatus: boolean;
    icpFiling: string;
    psbUrl: URL;
    psbFiling: string;
  };
  umamiTrackingSrc: URL;
  websiteID: string;
};
