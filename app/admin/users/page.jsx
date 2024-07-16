"use client";

import React from "react";

import UserTable from "@/client/components/admin/UserTable";

import { AdminProvider } from "@/libs/contexts/AdminContext.js";

function page() {
  return (
    <>
      <AdminProvider>
        <UserTable />
      </AdminProvider>
    </>
  );
}

export default page;
