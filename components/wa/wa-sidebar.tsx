import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import WaSidebarHeader from "./wa-sidebar/wa-sidebar-header";

type SidebarProps = {
  companyId: string;
};

export default async function WaSidebar({ companyId }: SidebarProps) {
  const loggedUser = await getCurrentUser();

  if (!loggedUser) {
    return redirect("/");
  }

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      queues: {
        orderBy: {
          queueName: "asc",
        },
        include: {
          userQueues: {
            include: {
              user: true,
            },
          },
        },
      },
      users: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!company) {
    return redirect("/");
  }

  const users = company?.users.filter((user) => user.id !== loggedUser.id);

  return (
    <div className="flex h-full flex-col border-r border-muted-foreground/15">
      <WaSidebarHeader company={company} />
      <main className="flex-1">chatlist</main>
      <footer>UpgradeToPro</footer>
    </div>
  );
}
