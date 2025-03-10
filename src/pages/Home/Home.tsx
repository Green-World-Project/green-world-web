import LoginForm from "../../shared/LoginForm";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Hero from "./components/Hero";
import IdentifyRedirect from "./components/IdentifyRedirect";

export default function Home() {
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
