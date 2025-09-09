"use client";
import { TextField, Button, Typography, Box } from "@mui/material";
import styles from "./mfa.module.css";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useRouter } from "next/navigation";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Login() {
  const codes = ["field1", "field2", "field3", "field4", "field5", "field6"];
  const router = useRouter();
  const [mfaError, setMFAError] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      field1: "",
      field2: "",
      field3: "",
      field4: "",
      field5: "",
      field6: "",
    },
  });

  const showErrors = (e: any, a: any) => {
    if (e[a]) {
      setMFAError(true);
    }
    return e[a] ? true : false;
  };

  const handleKeyPress = (event: any, nextFieldId: string) => {
    if (event.target.value.length === 1) {
      document.getElementById(nextFieldId)?.focus();
    }
  };

  const codeFields = codes.map((a, i) => (
    <Controller
      key={a}
      name={a as any}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          {...field}
          id={a}
          variant="outlined"
          error={showErrors(errors, a)}
          onChange={(e) => {
            field.onChange(e);
            handleKeyPress(e, codes[i + 1]);
          }}
          inputProps={{
            maxLength: 1,
            style: { width: "50px", fontWeight: "bold", textAlign: "center" },
          }}
        />
      )}
    />
  ));

  const onSubmit: SubmitHandler<any> = (data) => {
    setMFAError(false);
    router.push("/products");
  };

  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  return (
    <Box className={styles.mfaContainer}>
      <h3>Multi Factor Authentication</h3>
      <p>
        Enter below the 6-digit authentication code sent to your email address
      </p>
      {mfaError && (
        <Typography sx={{ color: "red" }}>
          Please enter a valid 6-digit code
        </Typography>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={!isDesktopOrLaptop ? styles.laptopCodeBox : styles.codeBox}
      >
        <Box>
          <Box className={styles.mfa}>{codeFields}</Box>
          <Box className={styles.actions}>
            <ActionButton
              variant="outlined"
              label="Cancel"
              color="secondary"
              buttonClick={() => router.push("/login")}
            />
            <ActionButton
              variant="contained"
              label="Continue"
              color="primary"
              type="submit"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}
