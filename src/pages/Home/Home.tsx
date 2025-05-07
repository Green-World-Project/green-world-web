import { useEffect } from "react";
import LoginForm from "../../shared/LoginForm";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Hero from "./components/Hero";
import IdentifyRedirect from "./components/IdentifyRedirect";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <LoginForm />
      <Hero />
      <Features />
      <IdentifyRedirect />
      <FAQ />
    </>
  );
}
