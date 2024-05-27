import { Icon } from '@/components/icon';

export type NavLink = {
  title: string;
  href: string;
  disabled?: boolean; // リンクが有効かの判定に使う。
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
};

export type MarketingConfig = {
  mainNavLinks: NavLink[];
};
