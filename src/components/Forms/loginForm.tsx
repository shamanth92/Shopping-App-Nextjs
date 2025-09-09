"use client";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useAppStore } from "@/zustand/store";
import { Box, TextField, CircularProgress, useMediaQuery } from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./../../app/login/login.module.scss";

interface LoginProps {
  handleLoginError: any;
}

export const LoginForm: React.FC<LoginProps> = ({ handleLoginError }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const setAccessToken = useAppStore((state) => state.setAccessToken);
  type Inputs = {
    username: string;
    password: string;
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    handleLoginError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `/ecommerce/auth/login?email=${data.username}&password=${data.password}`
      );
      if (response.ok) {
        const loginRes = await response.json();
        handleLoginError(false);
        setUserInfo({
          emailAddress: loginRes.email,
          fullName: loginRes.displayName,
          accountCreated: loginRes.createdAt,
          lastLoggedIn: loginRes.lastLoginAt,
        });
        const userResponse = await fetch(
          `/ecommerce/account/user?email=${loginRes.email}`,
          {
            headers: {
              Authorization: `Bearer ${loginRes.stsTokenManager.accessToken}`,
            },
          }
        );
        if (userResponse.ok) {
          const data = await userResponse.json();
          if (Object.keys(data).length === 0) {
            const saveAccount = await fetch(`/ecommerce/account/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginRes.stsTokenManager.accessToken}`,
              },
              body: JSON.stringify({
                emailAddress: loginRes.email,
                fullName: loginRes.displayName,
                accountCreated: loginRes.createdAt,
                lastLoggedIn: loginRes.lastLoginAt,
              }),
            });
            if (saveAccount.ok) {
              setCookie("token", loginRes.stsTokenManager.accessToken, {
                maxAge: 3600,
                path: "/",
              });
              setAccessToken({
                accessToken: loginRes.stsTokenManager.accessToken,
                expirationTime: loginRes.stsTokenManager.expirationTime,
                refreshToken: loginRes.stsTokenManager.refreshToken,
              });
              router.push("/login/mfa");
              setLoading(false);
              reset();
            }
          } else {
            setCookie("token", loginRes.stsTokenManager.accessToken, {
              maxAge: 3600,
              path: "/",
            });
            setAccessToken({
              accessToken: loginRes.stsTokenManager.accessToken,
              expirationTime: loginRes.stsTokenManager.expirationTime,
              refreshToken: loginRes.stsTokenManager.refreshToken,
            });
            router.push("/login/mfa");
            setLoading(false);
            reset();
          }
        }
      } else {
        setLoading(false);
        handleLoginError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleLoginError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        className={
          isDesktopOrLaptop ? styles.loginFields : styles.laptopLoginFields
        }
      >
        <Controller
          name="username"
          control={control}
          rules={{ required: "Please enter your username" }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Username"
              fullWidth
              variant="outlined"
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : ""}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Please enter your password" }}
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
        {!loading ? (
          <ActionButton
            variant="contained"
            label="Login"
            color="primary"
            type="submit"
          />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </form>
  );
};
