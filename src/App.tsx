import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import MasterLayout from "./layouts/MasterLayout";
import SignUpForm from "./pages/AuthPages/SignUpForm";
import { ToastContainer } from "react-toastify";
import PlantCare from "./pages/PlantCare/PlantCare";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,

    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/plantcare",
        element: <PlantCare />,
      },
      {
        index: true, // Matches the default path "/"
        element: <Navigate to="/home" replace />,
      },
    ],
  },
  {
    path: "/",
    element: <SignUpForm />,
    children: [
      {
        path: "/signup",
        element: <SignUpForm />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
