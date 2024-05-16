"use client";

import { useRouter } from "next/navigation";
import { upsertUser } from "@/actions/user";
import { userSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, User } from "@prisma/client";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { uuid as v4 } from "uuidv4";
import { z } from "zod";

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
  Card,
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
  FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";
import { formatRevalidate } from "next/dist/server/lib/revalidate";

type ProfileFormProps = {
  userData?: Partial<User> | null;
};

export default function ProfileForm({ userData }: ProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: userData?.name as string,
      email: userData?.email as string,
      role: userData?.role || Role.MODERATOR,
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {

    try {

      if (!userData?.id || userData?.id) {
        const response = await upsertUser({
          id: userData?.id || v4(),
          email: values.email,
          name: values.name,
          role: values.role,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (response) {
          toast({
            title: "✨ Saved user information!",
            description: "Your user has been saved successfully",
          });
          form.reset()
          form.setValue("name", response.name!)
          form.setValue("email", response.email!)
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

  const isDirtyAlt = !!Object.keys(form.formState.dirtyFields).length;


  const isModerator = userData?.role === Role.MODERATOR;
  return (
    <Card className="mx-auto my-12 w-full max-w-xl rounded-lg bg-primary-foreground">
      <CardHeader>
        <CardTitle className="mb-2 text-2xl font-bold">Perfil</CardTitle>
        <CardDescription className="mb-6">
          Atualize suas informações de perfil aqui.
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
              <Label htmlFor="nome">Nome</Label>
              <FormField
                name="name"
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
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        {...field}
                        disabled={isSubmitting && userData?.role === "ADMIN"}
                      />
                    </FormControl>
                    <Badge
                      className="text-muted-foreground"
                      variant="secondary"
                    >
                      Certifique-se de usar um endereço de email válido.
                    </Badge>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="role">Função</Label>
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>User Role: {data.user?.role}</FormLabel> */}

                    <Select
                      disabled={field.value === "OWNER"}
                      defaultValue={userData?.role}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user role..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem disabled={true} value="OWNER">
                          User Owner
                        </SelectItem>
                        <SelectItem disabled={isModerator} value="ADMIN">
                          Admin
                        </SelectItem>
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
    </Card>
  );
}
