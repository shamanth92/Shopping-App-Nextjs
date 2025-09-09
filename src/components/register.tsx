"use client";
import { Link, Dialog, DialogTitle, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { RegisterForm } from "./Forms/registerForm";

export default function Register() {
  const [registerUser, setRegister] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [registerError, showRegisterError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div>Dont have an account?</div>
      <Link underline="hover" onClick={() => setRegister(!registerUser)}>
        Sign Up
      </Link>
      <Dialog open={registerUser}>
        <DialogTitle>Register New User</DialogTitle>
        <RegisterForm
          handleRegisterUser={(bool: any) => setRegister(bool)}
          handleRegisterError={(bool: any) => showRegisterError(bool)}
          handleSnackbar={(bool: any) => setShowSnackbar(bool)}
        />
      </Dialog>
      <Snackbar
        open={showSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        {!registerError ? (
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            User registered! Login to Continue.
          </Alert>
        ) : (
          <Alert severity="error">Registration Failed!</Alert>
        )}
      </Snackbar>
    </>
  );
}
