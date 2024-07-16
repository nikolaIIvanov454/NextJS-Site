import React from "react";
import { AdminProvider } from "@/libs/contexts/AdminContext.js";
import AddProductFormComponent from "@/client/components/admin/AddProductForm";

AddProductFormComponent;

function page() {
  return (
    <AdminProvider>
      <AddProductFormComponent></AddProductFormComponent>
    </AdminProvider>
  );
}

export default page;
