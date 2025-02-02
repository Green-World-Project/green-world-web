import { useContext } from "react";
import LoginForm from "../AuthPages/LoginForm";
import Features from "./components/Features";
import Hero from "./components/Hero";
import UploadPlant from "./components/UploadPlant";
import { StoreContext } from "../../context/StoreContext";

export default function Home() {
  const { isPopUpOpen, setIsPopUpOpen } = useContext(StoreContext);
  return (
    <>
      <LoginForm isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
      <Hero />
      <Features />
      <UploadPlant />
    </>
  );
}
