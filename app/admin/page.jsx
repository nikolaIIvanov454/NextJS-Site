"use client"

import React from "react";

import AdminPanelComponent from "@/client/components/admin/AdminPanel";
import StatisticsComponent from "@/client/components/admin/Statistics";

import withAuth from "@/app/components/ProtectComponent";

function Page() {
  return (
    <>
      <AdminPanelComponent />
      <StatisticsComponent />
    </>
  );
}

export default withAuth(Page);
