import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCompanyByUserId } from "@/actions/company";

import { getCurrentUser } from "@/lib/session";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CompanyDetails from "@/components/forms/company-details";

export default async function StartPage() {
  const loggedUser = await getCurrentUser();

  if (!loggedUser?.id) {
    redirect("/login");
  }

  const companyDetails = await getCompanyByUserId(loggedUser.id);
  console.log(companyDetails?.name)

  if (companyDetails?.id) {
    return redirect(`/${companyDetails.id}`);
  }

  return (
    <>
      <Dialog open>
        <DialogContent className="overflow-hidden p-0">
          <DialogHeader className="p-8">
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>
              Please enter your company details
            </DialogDescription>
          </DialogHeader>
          <CompanyDetails data={companyDetails} />
        </DialogContent>
      </Dialog>
    </>
  );
}
