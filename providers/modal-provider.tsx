"use client";

import { useMounted } from "@/hooks/use-mounted";
import { SignInModal } from "@/components/layout/sign-in-modal";
import CreateTeamModal from "@/components/modals/create-team-modal";
import EditTeamModal from "@/components/modals/edit-team-modal";
import WaSheetQueue from "@/components/wa/wa-sheet/wa-sheet-queue";
import WaSheetUsers from "@/components/wa/wa-sheet/wa-sheet-users";
import WaCreateUser from "@/components/wa/wa-sheets/wa-create-user";
import WaEditCompany from "@/components/wa/wa-sheets/wa-edit-company";
import WaUpsertQueue from "@/components/wa/wa-sheets/wa-upsert-queue";
import WaUpsertUser from "@/components/wa/wa-sheets/wa-upsert-user";

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      {/* <UpsertUser /> */}
      <CreateTeamModal />
      <EditTeamModal />
      <WaUpsertUser />
      <WaUpsertQueue />
      <WaCreateUser />
      <WaEditCompany />
      <WaSheetUsers />
      <WaSheetQueue />
    </>
  );
};
