import React from "react";

import SettingsPage from "@/client/components/user/SettingsComponent";
import { AvatarProvider } from "@/libs/contexts/AvatarContext";

function page() {
  return (
    <>
      <SettingsPage />
    </>
  );
}

export default page;
