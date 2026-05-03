import { useNavigate } from "react-router-dom";
import "./stylingPages/Splash.css";
import Loginimg from "../assets/Loginimg.jpeg";
// import dashboardImg from "./assets/dashboard.png";
import image from "../assets/logo.png";
export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <img src={image.jpeg} alt="Logo" />
        </div>
        <h2 className="brand">DoorMeds</h2>
        <div className="nav-links">
          <span>About</span>
          <span>Service</span>
          <span>Product</span>
          <span>Blog</span>
          <button className="contact-btn">Contact us</button>
        </div>
      </div>

      {/* Main Section */}
      <div className="hero">
        
        {/* Left Content */}
        <div className="hero-left">
          <h1>
            Manage smarter <br />
            not <span>harder</span>.
          </h1>

          <p>
            Automatic low-stock alerts and expiry date tracking to ensure you
            never lose a sale or waste a product.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/authpage")} className="login-btn">
              Login
            </button>
            <span className="register">Register Now ?</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-right">
          <img src={Logo} alt="dashboard" />
        </div>

      </div>
    </div>
  );
}