import React from "react";

import { OrganizationList } from "@clerk/nextjs";

export default function OrgSelectionPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <OrganizationList
        hidePersonal={true} // team-based architecture only
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
