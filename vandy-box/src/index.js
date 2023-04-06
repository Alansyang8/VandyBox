import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import reportWebVitals from './reportWebVitals';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import { userDataLoader } from './api/userDataLoader';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "profile/:userId",
    element: <ProfilePage />,
    loader: userDataLoader
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router}/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
