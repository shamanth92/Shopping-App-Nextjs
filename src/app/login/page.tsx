"use client";
import { Box, Link, Alert } from "@mui/material";
import styles from "./login.module.scss";
import Register from "@/components/register";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LoginForm } from "@/components/Forms/loginForm";

export default function Login() {
  const [loginError, setLoginError] = useState(false);
  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  return (
    <Box className={styles.container}>
      <Box className={styles.loginContainer}>
        <h3>Login to your ECommerce account</h3>
        <Box className={isDesktopOrLaptop ? styles.login : styles.laptopLogin}>
          <LoginForm handleLoginError={(bool: any) => setLoginError(bool)} />
          {loginError && (
            <Box sx={{ paddingTop: "10px" }}>
              <Alert severity="error">Invalid Login Credentials</Alert>
            </Box>
          )}
        </Box>
        <Box className={styles.forgot}>
          <Link underline="hover">Forgot Password</Link>
        </Box>
        <Box
          className={isDesktopOrLaptop ? styles.signUp : styles.laptopSignUp}
        >
          <Register />
        </Box>
      </Box>
      <Box className={styles.image}>
        <Box
          component="img"
          height="100vh"
          width="88%"
          sx={{
            opacity: 0.7,
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1555529771-4f81423a1207?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </Box>
    </Box>
  );
}
