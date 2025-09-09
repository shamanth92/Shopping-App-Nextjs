import {
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Button,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import styles from "./../componentStyles/savedAddress.module.css";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { AccountActions } from "@/ui-components/AccountActions/AccountActions";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { useAppStore } from "@/zustand/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR, { mutate } from "swr";
import { getBaseUrl } from './../../getBaseUrl';

type ShippingInputs = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export default function SavedAddress() {
  const [address, setAddress] = useState([]);
  const [openAddress, setOpenAddress] = useState(false);
  const [saveSnackbar, setSaveSnackbar] = useState(false);
  const [editModeOn, setEditModeOn] = useState(false);
  const [editModeData, setEditModeData] = useState({ id: "", default: false });
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);
  const addAccountAddress = () => {
    setOpenAddress(true);
  };

  const getAddresses = (args: any) =>
    fetch(args, {
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${getBaseUrl()}/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`,
    getAddresses
  );

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ShippingInputs>();

  const onSubmit: SubmitHandler<ShippingInputs> = async (values: any) => {
    let addressRequest: any = {
      email: userInfo.emailAddress,
      fullName: values.name,
      addressLineOne: values.address,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      phoneNumber: values.phoneNumber,
      setAsDefault: !editModeOn ? false : editModeData.default,
    };
    if (!editModeOn) {
      try {
        const res = await fetch(`${getBaseUrl()}/ecommerce/account/saveAddress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenInfo.accessToken}`,
          },
          body: JSON.stringify(addressRequest),
        });

        if (!res.ok) {
          throw new Error(`Failed to call API: ${res.statusText}`);
        } else {
          setOpenAddress(false);
          setSaveSnackbar(true);
          reset();
          const response = await fetch(
            `${getBaseUrl()}/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`,
            {
              headers: {
                Authorization: `Bearer ${tokenInfo.accessToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            mutate(`${getBaseUrl()}/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`, data, false);
          }
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    } else {
      addressRequest = { ...addressRequest, _id: editModeData.id };
      try {
        const res = await fetch(
          `/ecommerce/account/saveAddress?id=${editModeData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenInfo.accessToken}`,
            },
            body: JSON.stringify(addressRequest),
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to call API: ${res.statusText}`);
        } else {
          setOpenAddress(false);
          setEditModeOn(false);
          setSaveSnackbar(true);
          reset();
          const response = await fetch(
            `/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`,
            {
              headers: {
                Authorization: `Bearer ${tokenInfo.accessToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            mutate(`${getBaseUrl()}/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`, data, false);
          }
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    }
  };

  const removeAddress = async (id: string) => {
    console.log(id);
    try {
      const res = await fetch(`${getBaseUrl()}/ecommerce/account/saveAddress?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenInfo.accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to call API: ${res.statusText}`);
      } else {
        const response = await fetch(
          `${getBaseUrl()}/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`,
          {
            headers: {
              Authorization: `Bearer ${tokenInfo.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          mutate(`${getBaseUrl()}/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`, data, false);
        }
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const editAddress = (p: any) => {
    setOpenAddress(true);
    setEditModeOn(true);
    setEditModeData({ id: p._id, default: p.setAsDefault });
    setValue("name", p.fullName);
    setValue("email", p.email);
    setValue("phoneNumber", p.phoneNumber);
    setValue("address", p.addressLineOne);
    setValue("city", p.city);
    setValue("state", p.state);
    setValue("zipCode", p.zipCode);
  };

  const handleCancel = () => {
    setEditModeOn(false);
    setOpenAddress(false);
  };

  const setAsDefault = async (p: any) => {
    if (!p.setAsDefault) {
      try {
        const res = await fetch("/ecommerce/account/saveAddress/setAsDefault", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenInfo.accessToken}`,
          },
          body: JSON.stringify({
            id: p._id,
            property: "setAsDefault",
            value: true,
            email: userInfo.emailAddress,
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to call API: ${res.statusText}`);
        } else {
          const response = await fetch(
            `/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`,
            {
              headers: {
                Authorization: `Bearer ${tokenInfo.accessToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            mutate(`${getBaseUrl()}/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`, data, false);
          }
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    }
  };

  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  const allAddresses = data?.map((p: any) => (
    <Grid item xs={isDesktopOrLaptop ? 3 : 4} key={p._id}>
      <Card>
        <CardContent>
          <b>{p.fullName}</b>
          <p>{p.addressLineOne}</p>
          <p>
            {p.city} {p.state} {p.zipCode}
          </p>
          <p>Phone Number: {p.phoneNumber}</p>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <AccountActions
            defaultProperty={p.setAsDefault}
            removeClick={() => removeAddress(p._id)}
            editClick={() => editAddress(p)}
            setAsDefaultClick={() => setAsDefault(p)}
          />
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <>
      {data && data.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <HomeIcon sx={{ fontSize: "50px" }} />
          <Typography sx={{ padding: "20px", fontSize: "20px" }}>
            You have not saved any addresses.
          </Typography>
          <ActionButton
            variant="contained"
            label="Add Address"
            color="primary"
            buttonClick={() => addAccountAddress()}
          />
        </Box>
      ) : (
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={12}>
            {allAddresses}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ActionButton
              variant="contained"
              label="Add Address"
              color="primary"
              buttonClick={() => addAccountAddress()}
            />
          </Box>
        </Box>
      )}
      <Dialog open={openAddress}>
        <DialogTitle>Add a new address</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <Box className={styles.fields}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Please enter a full name" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />
            </Box>
            <Box className={styles.fields}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Please enter an email address" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    sx={{ width: "400px" }}
                    label="Email"
                    variant="outlined"
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                )}
              />
            </Box>
            <Box className={styles.fields}>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "Please enter your phone number" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    sx={{ width: "400px" }}
                    label="Phone Number"
                    variant="outlined"
                    error={errors.phoneNumber ? true : false}
                    helperText={
                      errors.phoneNumber ? errors.phoneNumber.message : ""
                    }
                  />
                )}
              />
            </Box>
            <Box className={styles.fields}>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Please enter your address" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Address"
                    variant="outlined"
                    error={errors.address ? true : false}
                    helperText={errors.address ? errors.address.message : ""}
                  />
                )}
              />
            </Box>
            <Box className={styles.fields}>
              <Controller
                name="city"
                control={control}
                rules={{ required: "Please enter a city" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="City"
                    variant="outlined"
                    error={errors.city ? true : false}
                    helperText={errors.city ? errors.city.message : ""}
                  />
                )}
              />
            </Box>
            <Box className={styles.fields}>
              <Controller
                name="state"
                control={control}
                rules={{ required: "Please select your state" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="State"
                    variant="outlined"
                    error={errors.state ? true : false}
                    helperText={errors.state ? errors.state.message : ""}
                  />
                )}
              />
            </Box>
            <Box className={styles.fields}>
              <Controller
                name="zipCode"
                control={control}
                rules={{ required: "Please enter your Zip Code" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Zip Code"
                    variant="outlined"
                    error={errors.zipCode ? true : false}
                    helperText={errors.zipCode ? errors.zipCode.message : ""}
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <ActionButton
              variant="outlined"
              label="Cancel"
              color="secondary"
              buttonClick={() => handleCancel()}
            ></ActionButton>

            <ActionButton
              variant="contained"
              label="Save"
              color="primary"
              type="submit"
            ></ActionButton>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={saveSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={6000}
        onClose={() => setSaveSnackbar(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Address Saved to your account!
        </Alert>
      </Snackbar>
    </>
  );
}
