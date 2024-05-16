import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import CompanyForm from "@/components/forms/company-form";
import { Page } from "@/components/layout/page";
import { getUserWithCompanyWithPermissions } from "@/actions/user";
import { Company } from "@prisma/client";
import { prisma } from "@/lib/db";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

type CompanyPageProps = {
  params: {
    companyId: string
  }
}
export default async function CompanyPage({ params }: CompanyPageProps) {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const company = await prisma.company.findUnique({
    where: { id: params.companyId }
  });

  if (!company || !company.id) {

    return console.log({ error: "Company information is missing" })
  }


  return (
    <Page.Root>
      <Page.Container>
        <Page.Content>
          <div className="flex-1 max-w-2xl pb-14">
            <CompanyForm data={company} />
          </div>
        </Page.Content>
      </Page.Container>
    </Page.Root>
  );
}
