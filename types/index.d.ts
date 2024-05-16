
import { Prisma, User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { prisma } from "@/lib/db";
import { Icons } from "@/components/shared/icons";
import { getTeamWithMembersByCompany, getUserWithCompanyWithPermissions } from "@/actions/user";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};
export type MobileNavItem = {
  title: string;
  href: string;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd: number;
    isPaid: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
  };

export type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
};

export type UserDetails = Prisma.PromiseReturnType<
  typeof getUserWithCompanyWithPermissions
>;

const __getTeamWithMembersByCompany = async (
  companyId: string
) => {
  return await prisma.user.findFirst({
    where: {
      company: {
        id: companyId,
      },
    },
    include: {
      teams: { include: { users: true } },
      permissions: { include: { companies: true } },
    },
  });
}

export type TeamMembersByCompany =
  Prisma.PromiseReturnType<
    typeof __getTeamWithMembersByCompany
  >


