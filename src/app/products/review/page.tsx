"use client";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { useAppStore } from "@/zustand/store";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Link from "next/link";

export default function Review() {
  const currentOrder = useAppStore((state) => state.currentOrder);
  const itemsInCart = useAppStore((state) => state.itemsInCart);
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);
  const setCurrentOrder = useAppStore((state) => state.setCurrentOrder);
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const router = useRouter();

  const submitOrder = async () => {
    itemsInCart.forEach(async (item) => {
      try {
        const res = await fetch(
          `/ecommerce/checkoutCart?id=${item.product.id}&email=${userInfo.emailAddress}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenInfo.accessToken}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error(`Failed to call API: ${res.statusText}`);
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    });

    try {
      const res = await fetch("/ecommerce/orderSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenInfo.accessToken}`,
        },
        body: JSON.stringify(currentOrder[0]),
      });
      if (!res.ok) {
        throw new Error(`Failed to call API: ${res.statusText}`);
      } else {
        setOrderNumber(currentOrder[0].orderNumber);
        setCurrentOrder([]);
        setConfirmScreen(true);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <>
      <AppHeader />
      {!confirmScreen && (
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card>
              <CardContent>
                <Box sx={{ padding: "15px" }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Shipping Address
                  </Typography>
                  <Typography>
                    {currentOrder[0]?.shippingInfo?.address}
                  </Typography>
                  <Typography>{currentOrder[0]?.shippingInfo?.city}</Typography>
                  <Typography>{`${currentOrder[0]?.shippingInfo?.state} ${currentOrder[0]?.shippingInfo?.zipCode}`}</Typography>
                  <Typography>
                    Email: {currentOrder[0]?.shippingInfo?.email}
                  </Typography>
                </Box>
                <Box sx={{ padding: "15px" }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Estimated Delivery
                  </Typography>
                  <Typography>
                    {currentOrder[0]?.shippingInfo?.deliveryType}
                  </Typography>
                </Box>
                <Box sx={{ padding: "15px" }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Payment Method:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Avatar
                      alt="Visa"
                      src="https://www.logodesignlove.com/images/symbols/mastercard-symbol-02.jpg"
                    />
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      card ending in 1002
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Card>
              <CardContent>
                <Typography sx={{ fontWeight: "bold" }}>
                  Order Summary
                </Typography>
                {currentOrder[0]?.products?.map((item: any) => (
                  <Box key={item.id} sx={{ padding: "15px" }}>
                    <Grid container>
                      <Grid item xs={3}>
                        <Box
                          component="img"
                          height="75px"
                          width="75px"
                          alt="The house from the offer."
                          src={item.product.image}
                        ></Box>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                          }}
                          onClick={() =>
                            router.push(`/products/${item.product.id}`)
                          }
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            {item.product.title}
                          </Typography>
                          <Typography>Quantity: {item.quantity}</Typography>
                          <Typography>${item.product.price}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ActionButton
              variant="contained"
              label="Submit Order"
              color="primary"
              buttonClick={() => submitOrder()}
            ></ActionButton>
          </Box>
        </Box>
      )}
      {confirmScreen && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <TaskAltIcon sx={{ fontSize: "100px" }} />
          <h1>Thank you for your order!</h1>
          <h3>
            A confirmation has been sent to your email for Order # {orderNumber}
          </h3>
          <Typography>
            Click <Link href="/orders">here</Link> to view your order details.
          </Typography>
        </Box>
      )}
    </>
  );
}
