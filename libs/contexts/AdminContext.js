"use client"

import AdminPanelComponent from "@/client/components/admin/AdminPanel";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const deleteUser = async () => {
      try {
        const response = await fetch("/api/remove-user");

        const data = await response.json();

        if (response.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    deleteUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-products");

        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminContext.Provider value={{ users, setUsers }}>
      <AdminPanelComponent countProducts={products.length} />
      {children}
    </AdminContext.Provider>
  );
};
