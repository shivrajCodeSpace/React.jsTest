import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SplashScreen from './Splash.jsx'
import AuthPage from './AuthPage.jsx'
// import Dashboardlayout from './Dashboardlayout.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SplashScreen/>
    <AuthPage />
  </StrictMode>,
)
