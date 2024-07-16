"use client";

import React, { useState } from "react";

import { Button, Label, Textarea, TextInput } from "flowbite-react";

import DropdownComponent from "@/client/components/admin/Dropdown";
import SuccessPopup from "@/client/components/SuccessPopup";
import FileUploadComponent from "@/client/components/FileUpload";

import "@/app/css/styles.css";

function AddProductFormComponent() {
  const [imageFile, setImageFile] = useState(null);
  const [selectedType, setSelectedType] = useState("Тип на продукта");
  const [imageValid, setImageValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState("");

  const minWidth = 120;
  const maxWidth = 850;
  const minHeight = 120;
  const maxHeight = 550;

  console.log(imageValid)

  // const handleFileChange = (element) => {
  //   setImageFile(element.target.files[0]);

  //   if (imageFile) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const img = new Image();

  //       img.src = event.target.result;

  //       img.onload = () => {
  //         setImageValidator({
  //           withinWidth: img.width >= 120 && img.width <= 850,
  //           withinHeight: img.height >= 120 && img.height <= 550,
  //         });
  //       };
  //     };
  //     reader.readAsDataURL(imageFile);
  //   }
  // };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (imageValid) {
      const name = event.target[0].value;
      const price = event.target[2].value;
      const description = event.target[4].value;

      console.log(imageValid)

      const formData = new FormData();
      formData.set("name", name);
      formData.set("image", imageFile);
      formData.set("price", price);
      formData.set("type", selectedType);
      formData.set("description", description);

      try {
        const response = await fetch("/api/add-product", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();

          setText(result.message);
          setShowMessage(true);

          console.log(result.message);
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
    }
  };

  return (
    <>
      <SuccessPopup
        openModal={showMessage}
        text={text}
        setOpenModal={setShowMessage}
      />
      <div className="flex justify-center align-center p-4">
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleAddProduct}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Име на продукт:" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Име"
              required
              shadow
            />
          </div>
          <div>
            <FileUploadComponent setImageValid={setImageValid} setImageFile={setImageFile} minPreferedWidth={minWidth} maxPreferedWidth={maxWidth} minPreferedHeight={minHeight} maxPreferedHeight={maxHeight}/>
            {/* <div>
              {imageValidator.withinWidth && imageValidator.withinHeight
                ? ""
                : "Снимката е твърде голяма или твърде малка"}
              <div>
                <Label
                  htmlFor="file-upload-helper-text"
                  value="Снимка на продукта:"
                />
              </div>
              <FileInput
                id="file-upload-helper-text"
                onChange={handleFileChange}
                helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
              />
            </div> */}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Цена:" />
            </div>
            <TextInput
              id="price"
              type="text"
              placeholder="Цена"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="type" value="Вид продукт:" />
            </div>
            <DropdownComponent
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            ></DropdownComponent>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Описание" />
            </div>
            <Textarea
              id="description"
              placeholder="Описание"
              required
              rows={6}
            />
          </div>
          <Button color={"blue"} type="submit">
            Добави нов продукт
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddProductFormComponent;
