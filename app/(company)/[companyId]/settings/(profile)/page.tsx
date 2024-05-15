import { notFound } from "next/navigation";
import { getUserWithCompanyWithPermissions } from "@/actions/user";

import { getCurrentUser } from "@/lib/session";
import ProfileForm from "@/components/forms/profile-form";
import { Page } from "@/components/layout/page";

export default async function ProfilePage() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser || !loggedUser.id) return notFound();

  const userDetails = await getUserWithCompanyWithPermissions(loggedUser.id);

  return (
    <Page.Root>
      <Page.Container>
        <ProfileForm userData={userDetails} />
        <ProfileForm userData={userDetails} />
        <ProfileForm userData={userDetails} />
        <ProfileForm userData={userDetails} />
      </Page.Container>
    </Page.Root>
  );
}
