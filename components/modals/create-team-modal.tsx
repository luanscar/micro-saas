import { useRouter } from "next/navigation";
import { teamSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Sheet, SheetContent } from "../ui/sheet";
import { useToast } from "../ui/use-toast";

export default function CreateTeamModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "createTeam";
  const teams = data;
  console.log("=>", teams);

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof teamSchema>) => {
    try {
      console.log(values);
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
