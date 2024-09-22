"use client";

import React, { useState, useEffect } from "react";

import Product from "@/app/components/home_components/Product";
import { AdminProvider } from "@/libs/contexts/AdminContext";

function page() {
  const [products, setProducts] = useState([]);

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
    <>
    <AdminProvider>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {products.map((product) => (
              <div key={product.id}>
                <Product
                  product={product}
                  onClickAdminPage={() => handleClick(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      </AdminProvider>
    </>
  );
}

export default page;
