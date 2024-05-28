import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import CompanyForm from "@/components/forms/company-form";
import { Page } from "@/components/layout/page";

export default async function StartPage() {
  const loggedUser = await getCurrentUser();

  if (!loggedUser?.id) {
    redirect("/login");
  }

  const company = await prisma.company.findFirst({
    where: {
      users: {
        some: {
          id: loggedUser.id,
        },
      },
    },
  });

  if (company?.id) {
    return redirect(`/${company.id}/dashboard`);
  }

  return (
    <>
      <Page.Root>
        <Page.Container>
          <Page.Container>
            <CompanyForm />
          </Page.Container>
        </Page.Container>
      </Page.Root>
    </>
  );
}
