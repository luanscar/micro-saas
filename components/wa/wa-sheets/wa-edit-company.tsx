import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { editCompany } from "@/actions/company";
import { companySchema } from "@/schemas";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSheet } from "@/hooks/use-sheet-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

export default function WaEditCompany() {
  const { sheets, closeSheet, setSheetClose, data } = useSheetStoreTest();

  const { company } = data as { company: Company };

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    mode: "onSubmit",
    defaultValues: {
      companyName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    try {
      if (company.id) {
        const response = await editCompany(values, company.id);

        if (response) {
          toast({
            title: "✨ Atualizado!",
            description: "Informações da empresa salvas!",
          });
          closeSheet("editCompany");
          router.refresh();
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

  useEffect(() => {
    form.setValue("companyName", company?.companyName);
  }, [form, company]);

  const isSubmitting = form.formState.isSubmitting;

  const isDirtyAlt = !!Object.keys(form.formState.dirtyFields).length;

  return (
    <Sheet
      open={sheets.editCompany?.isOpen}
      onOpenChange={() => closeSheet("editCompany")}
    >
      <SheetContent side="left" className="w-[448px] bg-background !p-0">
        <SheetHeader className="!m-0 flex h-[16vh] flex-row items-end gap-4 bg-secondary p-6 ">
          <SheetClose>
            <ArrowLeft className="h-7" />
          </SheetClose>
          <SheetTitle>Empresa</SheetTitle>
        </SheetHeader>
        <div className="mt-[1vh] p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4 flex items-center gap-2">
                <Avatar className="size-9 rounded-md object-cover">
                  <AvatarImage
                    className="size-9 rounded-md object-cover"
                    src="https://avatar.vercel.sh/personal"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
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
                      {/* <FormLabel htmlFor="nome">Nome</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Nome da empresa"
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
          <Button
            disabled={!isDirtyAlt}
            onClick={() => form.handleSubmit(onSubmit)()}
            variant="default"
            className="mt-[8vh] w-full"
          >
            Salvar alterações
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
