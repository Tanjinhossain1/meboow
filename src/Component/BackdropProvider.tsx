"use client"
import { Backdrop, CircularProgress } from '@mui/material';
// context/MyContext.js
import { createContext, ReactNode, useState } from 'react';


// Define the types for the context values
interface BackdropProviderType {
    handleOpen: () => void;
    handleClose: () => void;
  }
  
  // Define default values (you can set them to functions that do nothing or any initial values)
  const defaultValues: BackdropProviderType = {
    handleOpen: () => {},
    handleClose: () => {}
  };
  
  // Create the context with the defined types
  const BackdropProviderContext = createContext<BackdropProviderType>(defaultValues);
  
  // Define the props for the provider component
  interface BackdropProviderProps {
    children: ReactNode;
  }
export const BackdropProviderComponent = ({ children }:BackdropProviderProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <BackdropProviderContext.Provider value={{ handleClose, handleOpen }}>
     {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </BackdropProviderContext.Provider>
  );
};

export default BackdropProviderContext;
