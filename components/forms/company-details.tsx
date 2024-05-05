"use client";

import { companySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function CompanyDetails() {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    mode: "onChange",
    defaultValues: {
      companyName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof companySchema>) => {
    alert(JSON.stringify(data));
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <>
    <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 py-4">
                <FormField
                  name="companyName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company name</FormLabel>
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

                <Button disabled={isSubmitting}>Save</Button>
              </div>
            </form>
          </Form>
    </>
    
  );
}
