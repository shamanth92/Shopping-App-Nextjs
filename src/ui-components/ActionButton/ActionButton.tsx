"use client";
import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  variant: any;
  label: string;
  color: any;
  buttonClick?: any;
  type?: string;
  disabled?: any;
}

export const ActionButton: React.FC<ButtonProps> = ({
  variant,
  label,
  color,
  buttonClick,
  type,
  disabled,
}) => {
  const handleButtonClick = () => {
    buttonClick();
  };

  return type !== "submit" ? (
    <Button
      variant={variant}
      color={color}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      {label}
    </Button>
  ) : (
    <Button type="submit" variant={variant} color={color} disabled={disabled}>
      {label}
    </Button>
  );
};
