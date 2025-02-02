import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

export default function MasterLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
