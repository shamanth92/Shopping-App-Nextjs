"use client";
import { OrderSummary } from "@/components/orderSummary";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { CurrentOrder, ORDERSTATUS, useAppStore } from "@/zustand/store";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Link from "next/link";
import { ShippingInformation } from "@/components/shippingInformation";
import { ScheduleDelivery } from "@/components/scheduleDelivery";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
// import { PaymentScreen } from "@/components/paymentScreen";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";

export default function Checkout() {
  const [paymentScreen, setPaymentScreen] = useState(false);
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [currentOrderNumber, setOrderNumber] = useState("");
  const currentOrder = useAppStore((state) => state.currentOrder);
  const itemsInCart = useAppStore((state) => state.itemsInCart);
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);
  const setCurrentOrder = useAppStore((state) => state.setCurrentOrder);
  const updateItemsInCart = useAppStore((state) => state.updateItemsInCart);
  const methods = useForm({
    defaultValues: {
      deliveryType: "standard",
    },
  });

  const getCartItems = (args: any) =>
    fetch(args, {
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/ecommerce/checkoutCart?email=${userInfo.emailAddress}`,
    getCartItems
  );

  useEffect(() => {
    if (data) {
      let items: any = [];
      data.forEach((d: any) => {
        items.push({ product: d, quantity: d.quantity });
      });
      updateItemsInCart(items);
    }
  }, [data, updateItemsInCart]);

  const router = useRouter();

  const fromPayment = () => {
    setPaymentScreen(false);
  };

  const addAccountAddress = async () => {
    const values: any = methods.getValues();
    const addressRequest = {
      email: userInfo.emailAddress,
      fullName: values.name,
      addressLineOne: values.address,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      phoneNumber: values.phoneNumber,
      setAsDefault: false,
    };
    try {
      const res = await fetch("/ecommerce/account/saveAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenInfo.accessToken}`,
        },
        body: JSON.stringify(addressRequest),
      });

      if (!res.ok) {
        throw new Error(`Failed to call API: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const onSubmit = async (data: any) => {
    const random = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `ECOMM${random}`;
    setOrderNumber(orderNumber);
    const date = Date.now();
    const itemsOrdered: CurrentOrder = {
      orderNumber: orderNumber,
      dateOrdered: date.toString(),
      orderStatus: ORDERSTATUS.Ordered,
      products: itemsInCart,
      shippingInfo: data,
      email: userInfo.emailAddress,
    };
    setCurrentOrder([...currentOrder, itemsOrdered]);
    router.push("/products/payment");
  };

  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  return (
    <>
      {!confirmScreen && (
        <div>
          <AppHeader />
          {itemsInCart.length == 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <RemoveShoppingCartIcon sx={{ fontSize: "100px" }} />
              <h1>Your cart is empty.</h1>
              <Typography>
                Click <Link href="/products">here</Link> to continue shopping.
              </Typography>
            </Box>
          )}
          {itemsInCart.length > 0 && (
            <Box sx={{ padding: "20px" }}>
              <Grid container>
                <Grid item xs={6}>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={methods.handleSubmit(onSubmit)}
                      noValidate
                      style={{ width: "100%" }}
                    >
                      {!paymentScreen && (
                        <Box sx={{ paddingBottom: "20px" }}>
                          <Card>
                            <CardContent>
                              <Container>
                                <ShippingInformation />
                              </Container>
                            </CardContent>
                          </Card>
                        </Box>
                      )}
                      {!paymentScreen && (
                        <Box sx={{ paddingBottom: "20px" }}>
                          <Card>
                            <CardContent>
                              <Container>
                                <ScheduleDelivery />
                              </Container>
                            </CardContent>
                          </Card>
                        </Box>
                      )}
                      {!paymentScreen && (
                        <Box
                          sx={{
                            marginTop: "50px",
                            display: "flex",
                            justifyContent: "space-between",
                            width: isDesktopOrLaptop ? "40%" : "60%",
                            float: "right",
                          }}
                        >
                          <ActionButton
                            variant="contained"
                            label="Move to Payment Screen"
                            color="primary"
                            type="submit"
                          />
                          <ActionButton
                            variant="contained"
                            label="Save Address"
                            color="primary"
                            buttonClick={() => addAccountAddress()}
                          />
                        </Box>
                      )}
                    </form>
                  </FormProvider>
                  {/* {paymentScreen && !editMode && (
                    <PaymentScreen onClick={() => fromPayment()} />
                  )} */}
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                  <OrderSummary />
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
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
            A confirmation has been sent to your email for Order #{" "}
            {currentOrderNumber}
          </h3>
          <Typography>
            Click <Link href="/orders">here</Link> to view your order details.
          </Typography>
        </Box>
      )}
    </>
  );
}
