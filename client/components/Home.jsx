"use client";

import React from "react";

import Navbar from "@/client/components/Navbar.jsx";
import Footer from "@/app/components/Footer";
import Products from "@/client/components/home/PoductList";

import withAuth from "@/client/components/ProtectComponent";

function HomeComponent() {
  return (
    <div>
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
}

export default withAuth(HomeComponent);
