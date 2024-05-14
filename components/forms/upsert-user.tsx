"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUserDetails, upsertUser } from "@/actions/user";
import { userSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { uuid as v4 } from "uuidv4";
import { z } from "zod";

import { useModal } from "@/hooks/use-modal-store";
import { useMounted } from "@/hooks/use-mounted";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

type UpsertUserProps = {
  userData?: Partial<User> | null;
};

export default function UpsertUser({ userData }: UpsertUserProps) {
  const { data, onClose, isOpen, type } = useModal();
  const [authUserData, setAuthUserData] = useState<Partial<User>>();

  const isModalOpen = isOpen && type === "upsertUser";

  const { toast } = useToast();
  const router = useRouter();

  const { user } = data;

  useEffect(() => {
    if (user) {
      const fetchDetails = async () => {
        const response = await getAuthUserDetails();

        if (response) setAuthUserData(response);
      };
      fetchDetails();
    }
  }, [user]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: user?.name as string,
      email: user?.email as string,
      role: user?.role,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name || "");
      form.setValue("email", user.email || "");
      form.setValue("role", user.role || Role.ADMIN);
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      if (!user?.id || user?.id) {
        const response = await upsertUser({
          id: user?.id || v4(),
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

          router.refresh();
        }

        if (userData?.id) return router.refresh();
        if (response) {
          onClose();
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

  const isModerator = authUserData?.role === Role.MODERATOR;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const mounted = useMounted();
  if (!mounted) {
    return null;
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            This is the user details page, where you can view and edit your
            company information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>User Role: {data.user?.role}</FormLabel> */}

                    <Select
                      disabled={field.value === "OWNER"}
                      defaultValue={userData?.role || user?.role}
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

        <DialogFooter>
          <Button
            disabled={!isDirty}
            onClick={() => form.handleSubmit(onSubmit)()}
            variant="default"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
