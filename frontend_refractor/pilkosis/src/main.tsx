

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from './Pages/User/MainUser.tsx'
import Login from './Pages/Auth/Login/Login.tsx'
import LayoutAdmin from './Pages/Admin/layoutAdmin.tsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <User />
      },
      {
        path: "admin",
        element: <LayoutAdmin />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
