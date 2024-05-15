import { Page } from "@/components/layout/page";

export default function DashboardPage() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title>Dashboard</Page.Title>
      </Page.Header>
      <Page.Content>
        <div className="h-full ">
          {/* <ProfileForm userData={userDetails} /> */}
          content
        </div>
      </Page.Content>
    </Page.Root>
  );
}
