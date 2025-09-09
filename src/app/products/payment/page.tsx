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
import { StripePayment } from "./../../../components/stripePayment";
import { useEffect } from "react";

const stripePromise: any = loadStripe("");
const stripe = require("stripe")(process.env.STRIPE_KEY);

interface InputProps {
  onClick: any;
}

export default function PaymentScreen() {
  //   useEffect(() => {
  //     const a = async () => {
  //       const paymentIntent = await stripe.paymentIntents.create({
  //         amount: 50,
  //         currency: "usd",
  //         payment_method: "pm_card_visa",
  //       });
  //       console.log(paymentIntent);
  //       return paymentIntent;
  //     };
  //     a();
  //   });
  const options = {
    clientSecret: process.env.CLIENT_SECRET,
  };

  const reviewClick = () => {
    //   onClick();
  };

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({});

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Add your Payment details
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <Elements stripe={stripePromise} options={options}>
          <div>
            <StripePayment sendClick={() => reviewClick()} />
          </div>
        </Elements>
      </Box>
    </Box>
  );
}
