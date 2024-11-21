import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Test from './Pages/Test';
import FacultyDashboard from './Pages/FacultyDashboard';
import NotFoundPage from './Pages/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './context/ProtectedRoute '
import Login from './Pages/Login';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/faculty-dashboard",
    element: (
        <FacultyDashboard />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
        <Home />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
    {/* <AuthProvider>
    </AuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
