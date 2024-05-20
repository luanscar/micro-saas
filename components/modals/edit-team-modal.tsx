import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateTeam } from "@/actions/team";
import { teamSchema } from "@/schemas";
import { TeamWithCompanyWithUsers } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { uuid as v4 } from "uuidv4";
import { z } from "zod";

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

export type Member = {
  label: string;
  value: string;
};

export default function EditTeamModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [usersTeste, setUsers] = useState<Option[]>([]);
  const [isMember, setIsMember] = useState<Member[]>([]);

  const isModalOpen = isOpen && type === "editTeam";
  const { team } = data as { team: TeamWithCompanyWithUsers };
  console.log(team);

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      members: isMember as Member[],
    },
  });

  const onSubmit = async (values: z.infer<typeof teamSchema>) => {
    try {
      const response = updateTeam(
        {
          id: team?.id ? team?.id : v4(),
          teamName: values.name,
          companyId: team?.companyId as string,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        values.members as Member[],
      );
      if (response) {
        toast({
          title: "✨ Saved member information!",
          description: "Member has been updated successfully",
        });
        form.setValue("name", (await response).teamName);
        router.refresh();
        onClose();
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
    const users = team?.users.flatMap((user) => ({
      label: user.user.name,
      value: user.userId,
    }));

    const options = team?.companies?.users.flatMap((user) => ({
      label: user.name,
      value: user.id,
    }));

    form.setValue("name", team?.teamName as string);
    form.setValue("members", users as Member[]);
    setUsers(options as Option[]);
    setIsMember(users as Member[]);
  }, [team, form, setIsMember, setUsers]);

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
                    defaultValue={isMember as Member[]}
                    name="members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membros</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            value={isMember as Member[]}
                            defaultOptions={usersTeste}
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
