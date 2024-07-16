import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CanvasPage from './pages/CanvasPage';
import SignIn from './components/auth/LogInForm.jsx';
import SignInPage from './pages/LogInPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UserPage from './pages/ProfilePage.jsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/contexts/AuthContext';
import LoginRedirect from './components/LoginRedirect.jsx';


const router = createBrowserRouter([
  
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element:
      <LoginRedirect>
          <SignInPage />
      </LoginRedirect>,
  },
  {
    path: '/profile',
    element: <ProfilePage/>,
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
