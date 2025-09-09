"use client";
import { AllProducts, Products } from "@/components/allProducts";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { useAppStore } from "@/zustand/store";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";

export default function Favorites() {
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);

  const getFavorites = (args: any) =>
    fetch(args, {
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/ecommerce/addToWishlist?email=${userInfo.emailAddress}`,
    getFavorites
  );

  return (
    <div>
      <AppHeader />
      <h1>Your Wishlist</h1>
      {isLoading && <CircularProgress />}
      {data && <AllProducts products={data} />}
    </div>
  );
}
