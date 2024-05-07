"use client";

import { useRouter } from "next/navigation";
import { upsertCompany } from "@/actions/company";
import { initUser } from "@/actions/user";
import { companySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { useForm } from "react-hook-form";
import { uuid as v4 } from "uuidv4";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { toast, useToast } from "../ui/use-toast";

type CompanyDetails = {
  data: Company | null;
};

export default function CompanyDetails({ data }: CompanyDetails) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    mode: "onSubmit",
    defaultValues: {
      companyName: data?.name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    try {
      let newUserData;

      if (!data?.id || data?.id) {
        newUserData = await initUser({ role: "OWNER" });

        const response = await upsertCompany({
          id: data?.id ? data.id : v4(),
          name: values.companyName.trim(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (response) {
          toast({
            title: "✨ Saved company information!",
            description: "Your company has been created successfully",
          });
        }

        if (data?.id) return router.refresh();
        if (response) {
          return router.refresh();
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "could not update your company",
      });
      console.error(error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  const onFieldChange = form.getValues("companyName") !== data?.name;
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Company name</CardTitle>
          <CardDescription>
            <CardDescription>
              This is the company details page, where you can view and edit your
              company information.
            </CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter company name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button
            onClick={() => form.handleSubmit(onSubmit)()}
            variant="default"
            disabled={!onFieldChange}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
