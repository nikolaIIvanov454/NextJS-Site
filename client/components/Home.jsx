"use client";

import React from "react";
import Products from "@/client/components/home/PoductList";

import withAuth from "@/client/components/ProtectComponent";

function HomeComponent() {
  return (
    <div>
      <Products />
    </div>
  );
}

export default withAuth(HomeComponent);
