import { useAppStore } from "@/zustand/store";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";

export const ScheduleDelivery = () => {
  type ScheduleInputs = {
    deliveryType: string;
  };

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useFormContext<ScheduleInputs>();

  const editMode = false;
  const [showEdit, setShowEdit] = useState(false);

  // useEffect(() => {
  //   setShowEdit(editMode);
  // }, [editMode]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Schedule Delivery
        </Typography>
        {editMode && (
          <Tooltip title="Edit shipping information">
            <Box onClick={() => setShowEdit(false)}>
              <EditIcon sx={{ cursor: "pointer" }} />
            </Box>
          </Tooltip>
        )}
      </Box>
      <Box>
        <FormControl>
          <Controller
            name="deliveryType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup {...field} defaultValue="standard">
                <FormControlLabel
                  value="standard"
                  disabled={showEdit}
                  control={<Radio />}
                  label={
                    <Typography>
                      Standard Delivery{" "}
                      <b>(7-10 business days) - No shipping fees</b>
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="express"
                  disabled={showEdit}
                  control={<Radio />}
                  label={
                    <Typography>
                      Express Delivery <b>(3-5 business days) - $5.99</b>
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="priority"
                  disabled={showEdit}
                  control={<Radio />}
                  label={
                    <Typography>
                      Priority Delivery <b>(1-2 business days) - $10.99</b>
                    </Typography>
                  }
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>
    </Box>
  );
};
