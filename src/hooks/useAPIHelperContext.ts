import { useContext } from "react";
import { APIHelperContext } from "../contexts/APIHelperContext";

export const useAPIHelperContext = () => {
  const context = useContext(APIHelperContext);
  if (!context) {
    throw new Error("useAPIHelper must be used within APIHelperProvider");
  }
  return context;
};
