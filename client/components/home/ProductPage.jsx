"use client";

import React from "react";

import { useEffect, useState } from "react";
import { Avatar, Carousel } from "flowbite-react";
import { useSession } from "next-auth/react";

import Rating from "@/client/components/RatingComponent";
import Stars from "@/client/components/StarsComponent";
import AddReviewComponent from "@/client/components/AddReviewForm";

import "@/app/css/product.css";

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState({});
  const [openForm, setOpenForm] = useState(false);

  const { data } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-products/by-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: productId }),
        });

        if (!response.ok) {
          console.error("Error fetching product:", response.statusText);
          return;
        }

        const data = await response.json();

        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const { id, name, price, imageUrl, description } = product;

  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full h-full p-4 md:p-10">
      <div className="flex justify-center w-full md:w-6/12 h-96 opacity-0 animate-appear transition-opacity duration-500 delay-300">
        <Carousel
          pauseOnHover
          className="w-full border-2 border-dashed rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform-gpu dark:dark:bg-gray-800"
        >
          {imageUrl ? (
            imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index}`}
                className="w-full h-auto max-h-96 object-contain"
              />
            ))
          ) : (
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="Default Carousel"
              className="w-full h-auto max-h-96 object-contain"
            />
          )}
        </Carousel>
      </div>

      <div className="flex flex-col justify-center w-full md:w-5/12 h-auto mt-10 md:mt-0 md:ml-10 p-4 border rounded-md shadow-lg hover:shadow-xl transition-all dark:dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400 text-lg">ID: {id}</p>
        <p className="text-gray-800 dark:text-gray-200 text-2xl font-semibold">
          {name}
        </p>
        <h3 className="text-gray-900 dark:text-gray-100 text-3xl font-bold mt-4">
          ${price}
        </h3>

        <div className="mt-4 p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <h2 className="text-xl font-bold mb-4 text-center">
            Инфромация за продукта:
          </h2>
          <p>{description}</p>
        </div>

        <div className="flex justify-around">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105 transform-gpu">
            Добави в количката
          </button>
          <button
            className="mt-6 px-6 py-3 bg-yellow-400 text-white text-lg font-semibold rounded-md shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105 transform-gpu"
            onClick={() => setOpenForm(true)}
          >
            Добави ревю
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4 flex-wrap border rounded-md shadow-lg p-4 hover:shadow-xl transition-all dark:dark:bg-gray-800 mt-16">
        <div className="flex justify-start flex-col">
          <Rating></Rating>
        </div>

        <div className="flex flex-col border-2">
          {/* for cycle */}
          <div className="flex justify-end items-start">
            <div className="p-2 h-min">
              <Stars></Stars>
            </div>
            <div className="px-2 h-min">
              <Avatar
                alt="User settings"
                img={
                  data?.user
                    ? data.accessToken?.image
                    : "https://ui-avatars.com/api/?name=notsigned"
                }
                rounded
              />
            </div>
            <div className="px-2 h-min">{data.user.name}</div>
          </div>
          <div className="p-2">description</div>
        </div>
      </div>

      <AddReviewComponent
        openModal={openForm}
        setOpenModal={setOpenForm}
      ></AddReviewComponent>
    </div>
  );
};

export default ProductPage;
