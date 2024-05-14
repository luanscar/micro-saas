import { notFound } from "next/navigation";
import { getUserWithCompanyWithPermissions } from "@/actions/user";

import { getCurrentUser } from "@/lib/session";
import CompanyDetails from "@/components/forms/company-details";
import CompanyForm from "@/components/forms/company-form";
import { Page } from "@/components/layout/page";

export default async function CompanyPage() {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const userDetails = await getUserWithCompanyWithPermissions(loggedUser.id);

  const company = userDetails.company;
  return (
    <Page.Root>
      <Page.Main>
        <Page.MainContainer>
          <div>
            <CompanyForm data={company} />
          </div>
        </Page.MainContainer>
      </Page.Main>
    </Page.Root>
  );
}
