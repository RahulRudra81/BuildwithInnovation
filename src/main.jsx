import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@material-tailwind/react";
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from './pages/Login.jsx';
import ErrorPage from './pages/Error.jsx';
import Home from './pages/Home.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/home",
    element:<Home/>,
    errorElement:<ErrorPage/>
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
  </React.StrictMode>,
)
