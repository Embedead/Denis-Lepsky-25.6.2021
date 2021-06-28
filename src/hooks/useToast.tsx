import React from "react";
import { errorStore } from "../stores/errorStore";
import { toast } from "react-toastify";

export const useToast = () => {
  const { setErr } = errorStore();
  const handleNewToast = (errorMessage: string) => {
    setErr(errorMessage);
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
