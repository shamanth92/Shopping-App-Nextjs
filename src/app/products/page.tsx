"use client";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { AllProducts } from "@/components/allProducts";
import { useAppStore } from "@/zustand/store";
import useSWR from "swr";

export default function Products() {
  // const tokenInfo = useAppStore((state) => state.tokenInfo);
  // const products = await getProducts();
  const getProducts = (args: any) => fetch(args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`/ecommerce/products`, getProducts);

  console.log("data products: ", data);

  return (
    data && (
      <div>
        <AppHeader />
        <AllProducts products={data} />
      </div>
    )
  );
}

// const getProducts = async () => {
//   const res = await fetch("http://localhost:3000/ecommerce/products", {
//     // headers: {
//     //   Authorization: `Bearer ${tokenInfo.accessToken}`,
//     // },
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };
