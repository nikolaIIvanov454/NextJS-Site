import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import SuccessPopup from "@/client/components/SuccessPopup";

function Product({ product, onClickAdminPage }) {
  const { _id, id, name, price, imageUrl } = product;

  const [showMessage, setShowMessage] = useState(false);

  const [text, setText] = useState("");

  const router = useRouter();

  const handleProductClick = () => {
    if (!onClickAdminPage) {
      router.push(`/home/product/${_id}`);
    }
  };

  const removeProduct = async () => {
    try {
      const response = await fetch("/api/remove-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await response.json();

      setShowMessage(true);

      if (response.ok) {
        setText(data.message);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <>
      <SuccessPopup
        openModal={showMessage}
        text={text}
        setOpenModal={setShowMessage}
      />
      <div
        className={!onClickAdminPage ? "px-4 mb-8 cursor-pointer" : "px-4 mb-8"}
        onClick={handleProductClick}
      >
        <div className="border rounded overflow-hidden">
          <img
            className="aspect-square object-cover max-w-lg w-full h-full"
            src={imageUrl[0]}
            alt={name}
          />
          <div className="p-4">
            <h3 className="font-semibold mb-2">{name}</h3>
            <p className="text-gray-700">$ {price}</p>
          </div>
          <h4 className="text-center">{showMessage}</h4>
          {onClickAdminPage ? (
            <div className="flex justify-center pb-4">
              <Button color="red" onClick={removeProduct} pill>
                Изтрии продукт
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
