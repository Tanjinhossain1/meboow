"use client";
import {
  Snackbar,
  CircularProgress,
  Alert,
  SnackbarCloseReason,
} from "@mui/material";
// context/MyContext.js
import { createContext, ReactNode, useState } from "react";

// Define the types for the context values
interface SnackbarProviderType {
  handleOpen: (
    message: string,
    severityProp: "success" | "error" | "warning" | "info"
  ) => void;
  handleClose: () => void;
}

// Define default values (you can set them to functions that do nothing or any initial values)
const defaultValues: SnackbarProviderType = {
  handleOpen: (
    message: string,
    severityProp: "success" | "error" | "warning" | "info"
  ) => {},
  handleClose: () => {},
};

// Create the context with the defined types
const SnackbarProviderContext =
  createContext<SnackbarProviderType>(defaultValues);

// Define the props for the provider component
interface SnackbarProviderProps {
  children: ReactNode;
}
export const SnackbarProviderComponent = ({
  children,
}: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const handleOpen = (
    message: string,
    severityProp: "success" | "error" | "warning" | "info"
  ) => {
    setSeverity(severityProp);
    setMessage(message);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SnackbarProviderContext.Provider value={{ handleClose, handleOpen }}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
          
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarProviderContext.Provider>
  );
};

export default SnackbarProviderContext;
