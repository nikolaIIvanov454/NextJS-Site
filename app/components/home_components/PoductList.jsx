'use client'

import React from 'react';

import Product from './Product';

function ProductList() {

  const products = [
    {id: 1, name: 'Sundown Audio ZV6 10" D2', price: '764.99', 
    imageUrl: ["https://cdn11.bigcommerce.com/s-h3p49i9/images/stencil/1280x1280/products/1735/7901/Zv6-10-001-333dd1cf__47569.1680016758.png?c=2", "https://sundownaudio.com/cdn/shop/products/z-series-zv6-10-2500w-subwoofer-z-v6-321762.png?v=1689637018", "https://sundownaudio.com/cdn/shop/products/z-series-zv6-10-2500w-subwoofer-z-v6-905454.png?v=1689637018&width=580", "https://sundownaudio.com/cdn/shop/products/z-series-zv6-10-2500w-subwoofer-z-v6-245355.png?v=1689637018"]},
    {id: 2, name: 'Orion HCCA 102 10" D2', price: '449.95', imageUrl: ["https://orioncaraudio.com/cdn/shop/articles/hcca152spl_1_0b5b214b-4ea3-40bd-abba-b732be3a8cde.jpg?v=1697094435&width=820", "https://orioncaraudio.com/cdn/shop/files/HCCA102-104.8.jpg?v=1703320010&width=550"]},
    {id: 3, name: 'PSI Platform 5 12" D2', price: '1,224.99', imageUrl: ["https://psicaraudio.com/wp-content/uploads/2016/04/Platform-5-12-1-Small-1.jpg"]},
    {id: 4, name: 'DD Audio 9912B 12" D2', price: '1,199.00', imageUrl: ["https://www.explicitcustoms.com/wp-content/uploads/2018/06/DD-Audio-Power-Tuned-9900-Series-subwoofer-installation-in-Melbourne-by-Explicit-Customs.png"]}  
  ];

  return (
    <div style={{margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center'}}>What We Offer</h2>
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