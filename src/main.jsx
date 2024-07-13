import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CanvasPage from './pages/CanvasPage';
import SignIn from './components/auth/SignIn';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:'/canvas',
    element:<CanvasPage/>
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
