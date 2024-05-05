import React from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import CompanyDetails from "@/components/forms/company-details";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


export default async function StartPage() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    redirect("/");
  }

  return (
    <div className="container mx-auto h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>Please enter your company details</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <CompanyDetails />
        </CardContent>
      </Card>
    </div>
  );
}
