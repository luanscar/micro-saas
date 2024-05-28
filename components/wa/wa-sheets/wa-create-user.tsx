"use client";

import { usePathname, useRouter } from "next/navigation";
import { createUser } from "@/actions/user";
import { userSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { useSheet } from "@/hooks/use-sheet-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

export default function WaCreateUser() {
  const { type, isOpen, onClose, data } = useSheet();

  const onSheetOpen = isOpen && type === "createUser";

  const { toast } = useToast();
  const router = useRouter();
  const path = usePathname();
  const companyId = path.split("/")[1];

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      role: Role.OWNER,
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const response = await createUser({
        id: uuidv4(),
        companyId: parseInt(companyId),
        email: values.email,
        name: values.name,
        role: values.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (response) {
        toast({
          title: "✨ Novo usuário!",
          description: "Usuário criado com sucesso",
        });
        onClose();
        router.refresh();
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

  const isDirtyAlt = !!Object.keys(form.formState.dirtyFields).length;

  return (
    <Sheet onOpenChange={onClose} open={onSheetOpen}>
      <SheetContent side="left" className="w-[448px] bg-background !p-0">
        <SheetHeader className="!m-0 flex h-[16vh] flex-row items-end gap-4 bg-secondary p-6 ">
          <SheetClose>
            <ArrowLeft className="h-7" />
          </SheetClose>
          <SheetTitle>Novo usuário</SheetTitle>
        </SheetHeader>
        <div className="mt-[8vh] p-6">
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
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel htmlFor="nome">Nome</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Nome do usuário"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter email"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="role">Função</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user role..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem disabled={true} value="OWNER">
                            User Owner
                          </SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="MODERATOR">Moderator</SelectItem>
                        </SelectContent>
                      </Select>
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
