import { redirect } from "next/navigation";
import { getCompanyByUserId } from "@/actions/company";

import { getCurrentUser } from "@/lib/session";
import CompanyDetails from "@/components/forms/company-details";
import CompanyForm from "@/components/forms/company-form";

export default async function StartPage() {
  const loggedUser = await getCurrentUser();

  if (!loggedUser?.id) {
    redirect("/login");
  }

  const companyDetails = await getCompanyByUserId(loggedUser.id);
  console.log(companyDetails?.companyName);

  if (companyDetails?.id) {
    return redirect(`/${companyDetails.id}/dashboard`);
  }

  return (
    <>
      <CompanyForm data={companyDetails} />
    </>
  );
}
