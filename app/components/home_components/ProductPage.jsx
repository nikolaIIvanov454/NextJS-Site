'use client'

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Carousel } from 'flowbite-react';

import NavbarComponent from '../Navbar';
import FooterComponent from '../Footer';

import '../../css/product.css';

const ProductPage = () => {
  const router = useRouter();
  const getQueryParameters = useSearchParams();

  const id = getQueryParameters.get("id");
  const name = getQueryParameters.get("name");
  const price = getQueryParameters.get("price");
  const imageUrl = getQueryParameters.get("imageUrl") ? decodeURIComponent(getQueryParameters.get("imageUrl")).split(',') : [];

  console.log(imageUrl)

  return (
    <div>
    <NavbarComponent />
    <h1>Product Page</h1>
        <div>
          <p>ID: {id}</p>
          <p>Name: {name}</p>
          <p>Price: {price}</p>
        </div>
     <div className="flex justify-start h-96 m-10 opacity-0 animate-appear transition-opacity duration-500 delay-300">
      <Carousel className='w-1/2' slide={false}>
        <img src={imageUrl[1]} alt="..." className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto" />
        <img src={imageUrl[2]} alt="..." className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto" />
        <img src={imageUrl[3]} alt="..." className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto" />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto" />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto" />
      </Carousel>
    </div>
    <FooterComponent />
    </div>
  );
};

export default ProductPage;