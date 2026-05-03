import "./Splash.css";
import web_login from "./assets/web_login.png";
import BrandHeader from "./components/BrandHeader";
import "./Dashboard.css"
export default function SplashScreen({ onNavigate }) {

  return (
    <div className="splash-container">
      
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <BrandHeader showTagline={false} />
        </div>
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
            <button onClick={() => onNavigate("Auth")} className="login-btn">
              Login
            </button>
            <span className="register" onClick={() => onNavigate("Auth")}>Register Now ?</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-right">
          <img src={web_login} alt="dashboard" />
        </div>

      </div>
    </div>
  );
}