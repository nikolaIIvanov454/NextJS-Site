import React from "react";

import ProductPageComponent from "@/client/components/home/ProductPage";

async function Page({ params }) {
  const productId = params?.productId

  return <ProductPageComponent productId={productId}/>;
}

export default Page;
