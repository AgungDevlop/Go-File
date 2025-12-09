import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Contact } from "./pages/Contact.tsx";
import { PlayVideo } from "./pages/PlayVideo.tsx";
import { Download } from "./pages/Download.tsx";
import Redirect from "./pages/Redirect.tsx";
import { VerifLink } from "./pages/VerifLink.tsx";
import { Home } from "./pages/Home.tsx"; // 1. Impor komponen Home yang baru

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
        path: ":id",
        element: <PlayVideo />,
      },
      {
        path: "e/:id",
        element: <PlayVideo />,
      },
      {
        path: "d/:id",
        element: <PlayVideo />,
      },
      {
        path: "v/:id",
        element: <PlayVideo />,
      },
      {
        path: "v/",
        element: <VerifLink />,
      },
      {
        path: "f/:id",
        element: <PlayVideo />,
      },
      {
        path: "play/:id",
        element: <PlayVideo />,
      },
      {
        path: "view/:id",
        element: <PlayVideo />,
      },
      {
        path: "share/:id",
        element: <PlayVideo />,
      },
      {
        path: "download",
        element: <Download />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "s/:id",
        element: <Redirect />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);