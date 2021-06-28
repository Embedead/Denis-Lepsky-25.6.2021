import React from "react";
import { errorStore } from "../stores/errorStore";

export const useToast = () => {
  const { setErr } = errorStore();
  const handleNewToast = (errorMessage: string) => {
    setErr(errorMessage);
  };

  return {
    handleNewToast,
  };
};
