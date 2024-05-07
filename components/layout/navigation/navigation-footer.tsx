import { User } from "next-auth";

import { UserAccountNav } from "../user-account-nav";

type NavigationFooterProps = {
  user: Partial<User>;
};

export async function NavigationFooter({ user }: NavigationFooterProps) {
  return (
    <div className="mt-auto border-t border-border p-6">
      <UserAccountNav user={user} />
    </div>
  );
}
