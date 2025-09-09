"use client";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import {
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "../../componentStyles/register.module.css";
import { useState } from "react";

interface RegisterProps {
  handleRegisterUser: any;
  handleSnackbar: any;
  handleRegisterError: any;
}

export const RegisterForm: React.FC<RegisterProps> = ({
  handleRegisterUser,
  handleSnackbar,
  handleRegisterError,
}) => {
  const [loading, setLoading] = useState(false);

  type Inputs = {
    fullName: string;
    email: string;
    password: string;
    confirmpassword: string;
  };

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password === data.confirmpassword) {
      clearErrors("confirmpassword");
      setLoading(true);
      try {
        const response = await fetch(
          `/ecommerce/auth/register?email=${data.email}&password=${data.password}&fullName=${data.fullName}`
        );
        if (response.ok) {
          const registerRes = await response.json();
          handleSnackbar(true);
          handleRegisterUser(false);
          handleRegisterError(false);
          setLoading(false);
          reset();
        } else {
          setLoading(false);
          handleRegisterError(true);
        }
      } catch (error) {
        setLoading(false);
        handleRegisterError(true);
      }
    } else {
      setError("confirmpassword", {
        type: "manual",
        message: "Passwords do not match!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <DialogContent>
        <div className={styles.fields}>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Please enter a full name" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Full Name"
                fullWidth
                variant="outlined"
                error={errors.fullName ? true : false}
                helperText={errors.fullName ? errors.fullName.message : ""}
              />
            )}
          />
        </div>
        <div className={styles.fields}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please enter a valid email",
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Email Address"
                fullWidth
                variant="outlined"
                error={errors.email ? true : false}
                helperText={
                  errors.email
                    ? errors.email.type === "pattern"
                      ? "Invalid email address"
                      : errors.email.message
                    : ""
                }
              />
            )}
          />
        </div>
        <div className={styles.fields}>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Please enter a valid password" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
        </div>
        <div className={styles.fields}>
          <Controller
            name="confirmpassword"
            control={control}
            rules={{ required: "Please re enter your password" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Confirm Password"
                fullWidth
                variant="outlined"
                type="password"
                error={errors.confirmpassword ? true : false}
                helperText={
                  errors.confirmpassword ? errors.confirmpassword.message : ""
                }
              />
            )}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <ActionButton
          variant="outlined"
          label="Cancel"
          color="secondary"
          buttonClick={() => handleRegisterUser(false)}
        ></ActionButton>
        {!loading ? (
          <ActionButton
            variant="contained"
            label="Register"
            color="primary"
            type="submit"
          ></ActionButton>
        ) : (
          <CircularProgress />
        )}
      </DialogActions>
    </form>
  );
};
