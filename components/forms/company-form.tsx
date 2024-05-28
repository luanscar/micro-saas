"use client";

import { randomInt } from "crypto";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCompany, upsertCompany } from "@/actions/company";
import { initUser } from "@/actions/user";
import { companySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { uuid, uuid as v4 } from "uuidv4";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

type CompanyFormProps = {
  data?: Company;
};

export default function CompanyForm({ data }: CompanyFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    mode: "onSubmit",
    defaultValues: {
      companyName: data?.companyName || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("companyName", data.companyName);
    }
  }, [form, data]);

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    try {
      if (!data?.id || data?.id) {
        const response = await createCompany({
          companyName: values.companyName.trim(),
        });

        if (response) {
          toast({
            title: "✨ Saved company information!",
            description: "Your company has been created successfully",
          });
          router.refresh();
        }

        const newUserData = await initUser({ role: "OWNER" });

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
  const isDirty = form.formState.isDirty;
  const isDirtyAlt = !!Object.keys(form.formState.dirtyFields).length;

  return (
    <Card className="mx-auto my-12 w-full max-w-xl rounded-lg bg-primary-foreground">
      <CardHeader>
        <CardTitle className="mb-2 text-2xl font-bold">Empresa</CardTitle>
        <CardDescription className="mb-6">
          Atualize suas informações de sua empresa aqui.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4 flex items-center gap-2">
              <Avatar className="size-9 rounded-md object-cover">
                <AvatarImage
                  className="size-9 rounded-md object-cover"
                  src="https://avatar.vercel.sh/personal"
                  alt="@shadcn"
                />
                <AvatarFallback>{data?.companyName}</AvatarFallback>
              </Avatar>
              <Label
                htmlFor="file"
                className="flex h-9 max-w-sm items-center gap-2 rounded-md bg-background px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
              >
                <Upload size={15} />
                Carregar foto
              </Label>
              <Input type="file" id="file" className="hidden gap-2" />
            </div>
            <div className="mb-4">
              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nome">Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          disabled={!isDirtyAlt}
          onClick={() => form.handleSubmit(onSubmit)()}
          variant="default"
          className="w-full"
        >
          Salvar alterações
        </Button>
      </CardFooter>
    </Card>
  );
}
