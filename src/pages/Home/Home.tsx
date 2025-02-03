import LoginForm from "../AuthPages/LoginForm";
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
    </>
  );
}
