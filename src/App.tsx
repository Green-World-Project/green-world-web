import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import MasterLayout from "./layouts/MasterLayout";
import { ToastContainer } from "react-toastify";
import PlantCare from "./pages/PlantCare/PlantCare";
import Identify from "./pages/Identifiy/Identify";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import History from "./pages/History/History";
import ProtectedRoute from "./shared/ProtectedRoute";
import NotFound from "./shared/NotFound";

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
        path: "/identify",
        element: <Identify />,
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
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
    element: <SignUpPage />,
    children: [
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*", // Catch-all for unknown routes
    element: <NotFound />,
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
