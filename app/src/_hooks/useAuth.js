import { useContext } from "react";
import AuthContext from "../_context/AuthProvider";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth