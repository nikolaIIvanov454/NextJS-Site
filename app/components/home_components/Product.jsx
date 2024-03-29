import React from 'react';

import { useRouter } from 'next/navigation';

function Product({ product }) {
  const { _id, name, price, imageUrl } = product;
  const router = useRouter(); 

  const handleProductClick = () => {
    router.push(`/home/product?id=${_id}`);
  };

  return (
    <div className="px-4 mb-8 cursor-pointer" onClick={handleProductClick}>
      <div className="border rounded overflow-hidden">
        <img className="aspect-square object-cover max-w-lg w-full h-full" src={imageUrl[0]} alt={name} />
        <div className="p-4">
          <h3 className="font-semibold mb-2">{name}</h3>
          <p className="text-gray-700">${price}</p>
          {/* Add buttons for add to cart, view details, etc. */}
        </div>
      </div>
    </div>
  );
}

export default Product;
