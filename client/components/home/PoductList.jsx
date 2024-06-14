"use client";

import React from "react";
import { useEffect, useState } from "react";

import Product from "@/app/components/home_components/Product";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-products");

        const data = await response.json();
        
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: "0 auto", padding: "20px" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        What We Offer
      </h2>
      <div className="flex flex-wrap -mx-4 justify-center items-center">
        {products.map((product) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
