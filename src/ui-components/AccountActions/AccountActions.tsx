import { Box, Button, Tooltip } from "@mui/material";
import React from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

interface AccountActionProps {
  defaultProperty: boolean;
  removeClick?: any;
  editClick?: any;
  setAsDefaultClick?: any;
}

export const AccountActions: React.FC<AccountActionProps> = ({
  defaultProperty,
  removeClick,
  editClick,
  setAsDefaultClick,
}) => {
  const handleRemoveClick = () => {
    removeClick();
  };

  const handleEditClick = () => {
    editClick();
  };

  return (
    <>
      <Box onClick={handleEditClick}>
        <Tooltip title="Edit">
          <EditIcon />
        </Tooltip>
      </Box>

      <Box onClick={handleRemoveClick}>
        <Tooltip title="Remove">
          <ClearIcon />
        </Tooltip>
      </Box>

      {defaultProperty ? (
        <ActionButton
          variant="outlined"
          label="Default"
          color="secondary"
          buttonClick={setAsDefaultClick}
        />
      ) : (
        <ActionButton
          variant="contained"
          label="Set as Default"
          color="primary"
          buttonClick={setAsDefaultClick}
        />
      )}
    </>
  );
};
