import React, { useState } from "react";

import { FileInput, Label } from "flowbite-react";

function FileUpload( { setImageValid, setImageFile, minPreferedWidth, maxPreferedWidth, minPreferedHeight, maxPreferedHeight } ) {
  const [imageValidator, setImageValidator] = useState({
    withinWidth: true,
    withinHeight: true,
  });

  const handleFileChange = (element) => {
    const file = element.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();

        img.src = event.target.result;

        img.onload = () => {
            console.log(img.width, img.height);
          setImageValidator({
            withinWidth: img.width >= minPreferedWidth && img.width <= maxPreferedWidth,
            withinHeight: img.height >= minPreferedHeight && img.height <= maxPreferedHeight,
          });

          console.log(img.width >= minPreferedWidth && img.width <= maxPreferedWidth)

          console.log(img.height >= minPreferedHeight && img.height <= maxPreferedHeight)

          console.log(imageValidator.withinWidth &&  imageValidator.withinHeight)

          setImageValid(imageValidator.withinWidth && imageValidator.withinHeight);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {imageValidator.withinWidth || imageValidator.withinHeight
        ? null
        : "Снимката е твърде голяма или твърде малка"}
      <div>
        <Label htmlFor="file-upload-helper-text" value="Снимка на продукта:" />
      </div>
      <FileInput
        id="file-upload-helper-text"
        onChange={handleFileChange}
        helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
      />
    </div>
  );
}

export default FileUpload;
