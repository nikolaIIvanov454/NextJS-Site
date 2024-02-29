'use client'

import React from 'react';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Carousel } from 'flowbite-react';

import NavbarComponent from '../Navbar';
import FooterComponent from '../Footer';

import '../../css/product.css';

const ProductPage = () => {
  const _id = useSearchParams().get('id');

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-products/by-id', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({_id : _id})
        });

        if (!response.ok) {
          console.error('Error fetching product:', response.statusText);
          return;
        }

        const data = await response.json();
      
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const { id, name, price, imageUrl } = product;

  return (
    <div>
    <NavbarComponent/>
    <h1>Product Page</h1>
        <div>
          <p>ID: {id}</p>
          <p>Name: {name}</p>
          <p>Price: {price}</p>
        </div>
      <div className="flex justify-start h-96 m-10 opacity-0 animate-appear transition-opacity duration-500 delay-300">
        <Carousel className='w-1/2' slide={false}>
          {imageUrl ? (
            imageUrl.map((url, index) => (
              <img key={index} src={url} alt={`Image ${index}`} className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto" />
            ))
          ) : (
            <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." className="max-h-64 sm:max-h-72 xl:max-h-96 2xl:max-h-120 w-auto h-auto" />
          )}
        </Carousel>
      </div>
    <FooterComponent />
    </div>
  );
};

export default ProductPage;