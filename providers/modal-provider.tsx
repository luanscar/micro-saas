"use client";

import { useMounted } from "@/hooks/use-mounted";
import UpsertUser from "@/components/forms/upsert-user";
import { SignInModal } from "@/components/layout/sign-in-modal";

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      <UpsertUser />
      {/* add your own modals here... */}
    </>
  );
};
