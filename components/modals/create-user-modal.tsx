"use client";

import { getRandomValues } from "crypto";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendInvitation } from "@/actions/company";
import { userSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, User } from "@prisma/client";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Sheet, SheetContent } from "../ui/sheet";
import { useToast } from "../ui/use-toast";

interface SendInvitationProps {
  companyId: string;
}

export default function CreateUserModal({ companyId }: SendInvitationProps) {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "createUser";

  const { user } = data;

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      role: Role.MODERATOR,
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const response = await sendInvitation(
        values.role,
        values.email,
        user?.companyId ?? "",
      );

      if (response.error) {
        toast({
          title: "✨ Ops!",
          variant: "destructive",
          description: response.error,
        });
      }

      if (response.ok) {
        toast({
          title: "✨ Membro criado!",
          description: "Convite enviado para o e-mail",
        });
        onClose();
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "",
      });
      console.error(error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  const isDirtyAlt = !!Object.keys(form.formState.dirtyFields).length;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Sheet open={isModalOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full bg-primary-foreground">
        <CardHeader>
          <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
            Membro
          </CardTitle>
          <CardDescription className="mb-1">
            Crie ou atualize os dados aqui.
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
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
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
                      <FormLabel>Função</FormLabel>
                      <Select
                        disabled={field.value === "OWNER"}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Função do membro..." />
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
      </SheetContent>
    </Sheet>
  );
}
