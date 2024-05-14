"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { upsertCompany } from "@/actions/company";
import { initUser } from "@/actions/user";
import { companySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { uuid as v4 } from "uuidv4";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
  data: Company | null;
};

export default function CompanyForm({ data }: CompanyFormProps) {
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
      if (!data?.id || data?.id) {
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
  const isDirty = form.formState.isDirty;

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
              <Avatar className="h-9 w-9 rounded-md object-cover">
                <AvatarImage
                  className="h-9 w-9 rounded-md object-cover"
                  src="https://avatar.vercel.sh/personal"
                  alt="@shadcn"
                />
                <AvatarFallback>{data?.name}</AvatarFallback>
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
              <Label htmlFor="nome">Nome</Label>
              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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
          disabled={!isDirty}
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