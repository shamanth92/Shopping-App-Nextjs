import { Product } from "@/components/product";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { Products } from "@/components/allProducts";
import { useAppStore } from "@/zustand/store";

interface Params {
  id: string;
}

export default async function SingleProduct({ params }: { params: Params }) {
  const productDetails: Products = await getProductDetails(params.id);

  return (
    <div>
      <AppHeader />
      <Product productDetails={productDetails} />
    </div>
  );
}

const getProductDetails = async (id: string) => {
  const res = await fetch(`http://localhost:3000/ecommerce/products?id=${id}`);

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
