import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Welcome to VoiceForge</h1>
      <div className="flex items-center gap-4">
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </div>
  );
}
