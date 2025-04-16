import { ReactNode, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useContext(StoreContext);
  if (token || token !== null) return children;
  else return <Navigate to="/" />;
}
