import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layouts/Root.jsx";
import HomeLayout from "./Layouts/HomeLayout.jsx";
import AuthContextProvider from "./Auth/AuthContextProvider.jsx";
import Events from "./Routes/Events.jsx";
import EventsByCategory from "./Routes/EventsByCategory.jsx";
import EventDetails from "./Routes/EventDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:category",
        element: <EventsByCategory />,
      },
      {
        path: "/event-details/:id",
        element: <EventDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
