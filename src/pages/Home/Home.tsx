import LoginForm from "../AuthPages/LoginForm";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Hero from "./components/Hero";
import UploadPlant from "./components/UploadPlant";

export default function Home() {
  return (
    <>
      <LoginForm />
      <Hero />
      <Features />
      <UploadPlant />
      <FAQ />
    </>
  );
}
