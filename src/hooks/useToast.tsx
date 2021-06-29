import React from "react";
import { toast } from "react-toastify";

export const useToast = () => {
  const handleNewToast = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  const addKnownToast = (errorMessage: string) => {
    toast.error(errorMessage, {
      toastId: "KnownToast",
    });
  };

  return {
    handleNewToast,
    addKnownToast,
  };
};
