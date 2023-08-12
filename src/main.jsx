import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import Login from "./components/Pages/Shared/Login.jsx";
import Home from "./components/Pages/Home/Home.jsx";
import Signup from "./components/Pages/Shared/Signup.jsx";
import Deshboard from "./components/Pages/Deshboard/Deshboard.jsx";
import ManageUsers from "./components/Pages/Deshboard/ManageUsers.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddClass from "./components/Pages/Deshboard/AddClass.jsx";
import PrivateRoutes from "./AuthProvider/Routes/PrivetRoutes.jsx";
import MyClasses from "./components/Pages/Deshboard/MyClasses.jsx";
import ManageClasses from "./components/Pages/Deshboard/ManageClasses.jsx";
import MySelectedClasses from "./components/Pages/Deshboard/MySelectedClasses.jsx";
import Payment from "./components/Pages/Deshboard/payement/Payment.jsx";
import MyEnrolledClasses from "./components/Pages/Deshboard/MyEnrolledClasses.jsx";
import PaymentHistory from "./components/Pages/Deshboard/PaymentHistory.jsx";
import Classes from "./components/Pages/Classes/Classes.jsx";
import AdminRoutes from "./AuthProvider/Routes/AdminRoutes.jsx";
import InstructorRoutes from "./AuthProvider/Routes/InstructorRoute.jsx";
import Instructors from "./components/Pages/Instructors/Instructors.jsx";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructor",
        element: <Instructors />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/class",
        element: <Classes />,
      },
    ],
  },
  {
    path: "Dashboard",
    element: <Deshboard />,
    children: [
      {
        path: "manageUsers",
        element: <AdminRoutes><ManageUsers /></AdminRoutes> ,
      },
      {
        path: "addClasses",
        element: <InstructorRoutes><AddClass  /></InstructorRoutes> ,
      },
      {
        path: "myClasses",
        element:  <InstructorRoutes><MyClasses  /></InstructorRoutes> ,
      },
      {
        path: "manageClasses",
        element:  <AdminRoutes> <ManageClasses  /></AdminRoutes>,
      },
      {
        path: "mySelectedClasses",
        element:  <PrivateRoutes><MySelectedClasses  /></PrivateRoutes> ,
      },
      {
        path: "payment/:id",
        element: <Payment />  ,
      },
      {
        path: "MyEnrolledClasses",
        element:<MyEnrolledClasses />  ,
      },
      {
        path: "paymentHistory",
        element:<PaymentHistory />  ,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
