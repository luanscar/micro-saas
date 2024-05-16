import { redirect } from "next/navigation";
import { getCompanyByUserId } from "@/actions/company";

import { getCurrentUser } from "@/lib/session";
import CompanyDetails from "@/components/forms/company-details";

export default async function StartPage() {
  const loggedUser = await getCurrentUser();

  if (!loggedUser?.id) {
    redirect("/login");
  }

  const companyDetails = await getCompanyByUserId(loggedUser.id);
  console.log(companyDetails?.name)

  if (companyDetails?.id) {
    return redirect(`/${companyDetails.id}/dashboard`);
  }

  return (
    <>

      <CompanyDetails data={companyDetails} />

    </>
  );
}
