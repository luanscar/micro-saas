"use client";

import { useMounted } from "@/hooks/use-mounted";
import UpsertUser from "@/components/forms/upsert-user";
import { SignInModal } from "@/components/layout/sign-in-modal";
import CreateTeamModal from "@/components/modals/create-team-modal";
import CreateUserModal from "@/components/modals/create-user-modal";
import EditTeamModal from "@/components/modals/edit-team-modal";

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      <UpsertUser />
      <CreateUserModal />
      <CreateTeamModal />
      <EditTeamModal />
      {/* add your own modals here... */}
    </>
  );
};
