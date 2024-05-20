import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTeam } from "@/actions/team";
import { teamSchema } from "@/schemas";
import { CompanyWithUsersWithTeams } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getUsersByCompany } from "@/lib/company";
import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Sheet, SheetContent } from "../ui/sheet";
import { useToast } from "../ui/use-toast";

export default function CreateTeamModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [options, setOptions] = useState<Option[]>([]);
  const router = useRouter();

  const isModalOpen = isOpen && type === "createTeam";
  const { company } = data as { company: CompanyWithUsersWithTeams };
  // console.log(company);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getUsersByCompany();

      const OPTIONS = response.map((user) => ({
        label: user.name,
        value: user.id,
      }));
      setOptions(OPTIONS as Option[]);
    };
    getUsers();
  }, []);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof teamSchema>) => {
    try {
      const response = await createTeam(
        values,
        "105d85e5-bb49-49f7-81e8-d738beffc53b",
      );
      if (response) {
        toast({
          title: "✨ Saved member information!",
          description: "Member has been updated successfully",
        });
        form.reset();
        router.refresh();
        onClose();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "Verifique se já existe uma equipe com esse nome!",
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
      <SheetContent className="w-full">
        <CardHeader>
          <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
            Equipe
          </CardTitle>
          <CardDescription className="mb-1">
            Crie ou atualize os dados aqui.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="">
                <Label htmlFor="nome">Nome</Label>
                <div className="flex flex-col space-y-4">
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
                  <FormField
                    control={form.control}
                    name="members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membros</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            defaultOptions={options}
                            placeholder="Selecione os membros..."
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                no results found.
                              </p>
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            disabled={false}
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
