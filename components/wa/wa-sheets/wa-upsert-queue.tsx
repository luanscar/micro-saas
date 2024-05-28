"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { upsertQueue, usersOnQueue } from "@/actions/company";
import { useDataStore } from "@/providers/store-provider";
import { queueSchema } from "@/schemas";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { useSheet } from "@/hooks/use-sheet-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MODERATOR";
};

export default function WaUpsertQueue() {
  const { openSheet, closeSheet, sheets } = useSheetStoreTest();
  const [options, setOptions] = useState<Option[]>([]);

  const { queue } = sheets.upsertQueue.data;
  // console.log("=>", queue);
  const [queueUsersData, setQeueUsersData] = useState<any | null>(null);

  const { toast } = useToast();
  const router = useRouter();
  const path = usePathname();
  const companyId = path.split("/")[1];

  const form = useForm<z.infer<typeof queueSchema>>({
    resolver: zodResolver(queueSchema),
    mode: "onChange",
    defaultValues: {
      queueName: "",
      members: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof queueSchema>) => {
    try {
      const response = await upsertQueue(
        {
          id: queue ? queue.id : uuidv4(),
          queueName: values.queueName || queue?.queueName!,
          companyId: companyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        values,
      );

      if (response) {
        toast({
          title: "✨ Sucesso!",
          description: "Os dados foram salvos com sucesso.",
        });
        form.reset();

        closeSheet("upsertUser");
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "🛑 Oppse!",
        description: "Ocorreu um erro!",
      });
      console.error(error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    form.setValue("queueName", "");
    form.setValue("members", []);
    setQeueUsersData([]);
    if (queue) {
      const fetchDetails = async (queueId: string) => {
        const response = await usersOnQueue(queueId);

        if (response) {
          const users = response.map((u) => ({
            label: u.user.name,
            value: u.user.id,
          }));
          form.setValue("members", users as Option[]);
          setQeueUsersData(users);
        }
      };
      fetchDetails(queue.id as string);
      form.reset(queue);
    }
  }, [queue, form]);

  const isDirtyAlt = !!Object.keys(form.formState.dirtyFields).length;

  return (
    <Sheet open={sheets.upsertQueue.isOpen}>
      <SheetContent
        side="left"
        className=" h-100vh w-[448px] bg-background !p-0"
      >
        <SheetHeader className="!m-0 flex h-[16vh] flex-row items-end gap-4 bg-secondary p-6 ">
          <ArrowLeft
            onClick={() => closeSheet("upsertQueue")}
            className="h-7 cursor-pointer"
          />
          <SheetTitle>Editar Fila</SheetTitle>
        </SheetHeader>
        <div className="mt-[1vh] flex h-full flex-col items-center  p-6">
          <Button
            variant="secondary"
            disabled={true}
            className="mb-[2vh] text-secondary-foreground"
          >
            ✨ Lembre de salvar os dados!
          </Button>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <FormField
                    name="queueName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Nome da fila"
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
                    name="members"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel htmlFor="role">Função</FormLabel> */}
                        <MultipleSelector
                          {...field}
                          defaultOptions={sheets.upsertQueue.data.company.map(
                            (user) => ({
                              label: user.name!,
                              value: user.id!,
                            }),
                          )}
                          value={queueUsersData}
                          placeholder="Selecione os membros..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Sem dados.
                            </p>
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          {isDirtyAlt && (
            <div className="absolute bottom-20 flex grow animate-fade-up  items-center justify-center transition-all">
              <Button
                onClick={() => form.handleSubmit(onSubmit)()}
                variant="default"
                className="mt-[1vh] size-12 rounded-full "
              >
                <Check className="text-secondary-foreground" size={48} />
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
