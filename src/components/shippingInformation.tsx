import { useAppStore } from "@/zustand/store";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import useSWR from "swr";

export const ShippingInformation = () => {
  type ShippingInputs = {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };

  const editMode = false;
  const [showEdit, setShowEdit] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);

  const getAddresses = (args: any) =>
    fetch(args, {
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`,
    getAddresses
  );

  // useEffect(() => {
  //   setShowEdit(editMode);
  // }, [editMode]);

  const selectAddress = (address: any) => {
    setValue("name", address.fullName);
    setValue("email", address.email);
    setValue("phoneNumber", address.phoneNumber);
    setValue("address", address.addressLineOne);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("zipCode", address.zipCode);
    setOpenAddress(false);
  };

  const {
    control,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useFormContext<ShippingInputs>();
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Shipping Information
        </Typography>
        <Box>
          <ActionButton
            variant="contained"
            label="Use Saved Addresses"
            color="primary"
            buttonClick={() => setOpenAddress(true)}
          ></ActionButton>
          <Dialog open={openAddress}>
            <DialogTitle>Select an address</DialogTitle>
            <DialogContent>
              {data?.map((d: any) => (
                <Box
                  key={d._id}
                  sx={{ padding: "15px", border: "1px solid black" }}
                >
                  <Typography>{d.fullName}</Typography>
                  <Typography>{d.addressLineOne}</Typography>
                  <Typography>
                    {d.city} {d.state} {d.zipCode}
                  </Typography>
                  <Typography>{d.phoneNumber}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <ActionButton
                      variant="contained"
                      label="Select Address"
                      color="primary"
                      buttonClick={() => selectAddress(d)}
                    ></ActionButton>
                  </Box>
                </Box>
              ))}
            </DialogContent>
            <DialogActions>
              <ActionButton
                variant="outlined"
                label="Cancel"
                color="secondary"
                buttonClick={() => setOpenAddress(false)}
              ></ActionButton>
            </DialogActions>
          </Dialog>
        </Box>
        {editMode && (
          <Tooltip title="Edit shipping information">
            <Box onClick={() => setShowEdit(false)}>
              <EditIcon sx={{ cursor: "pointer" }} />
            </Box>
          </Tooltip>
        )}
      </Box>
      <Box>
        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please enter a full name" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Full Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: "Please enter an email address" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                sx={{ width: "400px" }}
                label="Email"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Please enter your phone number" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                sx={{ width: "400px" }}
                label="Phone Number"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={errors.phoneNumber ? true : false}
                helperText={
                  errors.phoneNumber ? errors.phoneNumber.message : ""
                }
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          <Controller
            name="address"
            control={control}
            rules={{ required: "Please enter your address" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Address"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={errors.address ? true : false}
                helperText={errors.address ? errors.address.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Controller
            name="city"
            control={control}
            rules={{ required: "Please enter a city" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="City"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={errors.city ? true : false}
                helperText={errors.city ? errors.city.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            rules={{ required: "Please select your state" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="State"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={errors.state ? true : false}
                helperText={errors.state ? errors.state.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
          <Controller
            name="zipCode"
            control={control}
            rules={{ required: "Please enter your Zip Code" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Zip Code"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={errors.zipCode ? true : false}
                helperText={errors.zipCode ? errors.zipCode.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
