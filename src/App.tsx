import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import MasterLayout from "./layouts/MasterLayout";
import SignUpForm from "./pages/AuthPages/SignUpForm";

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
    </>
  );
}

export default App;
