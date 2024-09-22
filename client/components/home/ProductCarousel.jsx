"use client";

import { Carousel } from "flowbite-react";

function ProductCarousel({ images }) {
  return (
    <Carousel pauseOnHover leftControl="left" rightControl="right">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Image ${index}`}
          className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto"
        />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
