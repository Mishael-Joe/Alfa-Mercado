import { useContext } from "react";
import { Context } from "./StateContext";

export const useStateContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useStateContext must be used within a StateContext Provider');
    }
    return context;
  };