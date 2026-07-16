import { useContext } from "react"; // used to read a context
import AuthContext from "@/context/AuthContext"; // our auth context which was created earlier

// we're creating our own custom hook
const useAuth = () => {
  return useContext(AuthContext); // instead of every component writing useContext(AuthContext) we simply write useAuth();
};

export default useAuth;
