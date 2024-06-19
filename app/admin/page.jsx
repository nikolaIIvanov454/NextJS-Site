import React from "react";
import AdminPanelComponent from "@/client/components/admin/AdminPanel";
import StatisticsComponent from "@/client/components/admin/Statistics";

function Page() {
  return (
    <>
      <AdminPanelComponent />
      <StatisticsComponent />
    </>
  );
}

export default Page;
