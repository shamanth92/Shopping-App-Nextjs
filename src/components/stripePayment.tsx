"use client";
import { Box, Typography } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

interface InputProps {
  sendClick: any;
}

export const StripePayment: React.FC<InputProps> = ({ sendClick }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  // const editMode = useAppStore((state) => state.editMode);
  // const setEditMode = useAppStore((state) => state.setEditMode);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({});

  // Billing Address
  // Error message
  // Form Validation
  // paymentIntent with actual amount
  // save card?

  const goback = () => {
    // setEditMode(true);
    sendClick();
  };

  const onSubmit = async (event: any) => {
    router.push("/products/review");
    // goback();
    // event.preventDefault();
    // if (!stripe || !elements) {
    //   // Stripe.js hasn't yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //   return;
    // }
    // // console.log(elements.fetchUpdates());
    // const { error } = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   confirmParams: {
    //     return_url: "http://localhost:3000/products",
    //   },
    // });
    // console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "300px",
        }}
      >
        <Box>
          <PaymentElement />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ActionButton
            variant="contained"
            label="Save Card"
            color="primary"
            // buttonClick={() => setPaymentScreen(true)}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ActionButton
            variant="contained"
            label="Review your Details"
            color="primary"
            type="submit"
          />
        </Box>
        {/* {editMode && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ActionButton
              variant="contained"
              label="Submit Order"
              color="primary"
              type="submit"
            />
          </Box>
        )} */}
      </Box>
    </form>
  );
};
