import "./About.css";
import BrandHeader from "./components/BrandHeader";

export default function AboutPage({ onNavigate }) {
  return (
    <div className="about-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <BrandHeader showTagline={false} />
        </div>
        <div className="nav-links">
          <span onClick={() => onNavigate("About")}>About</span>
          <span onClick={() => onNavigate("Services")}>Service</span>
          <span onClick={() => onNavigate("ProductInfo")}>Product</span>
          <span onClick={() => onNavigate("Blog")}>Blog</span>
          <button className="contact-btn" onClick={() => onNavigate("Auth")}>Contact us</button>
        </div>
      </div>

      {/* About Content */}
      <div className="about-content">
        <div className="about-header">
          <h1>About DoorMed</h1>
          <p className="subtitle">Transforming Pharmacy Operations Digitally</p>
        </div>

        <section className="about-section">
          <h2>What is DoorMed?</h2>
          <p>
            DoorMed is a comprehensive pharmacy management web application designed for pharmacy stores to manage their daily work digitally. It helps pharmacy staff manage medicines, inventory, orders, patients, payments, and store records from one unified system.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            The main goal of DoorMed is to reduce manual work, save time, avoid stock mistakes, and provide better service to customers. We believe that pharmacies deserve modern solutions that simplify operations and improve efficiency.
          </p>
        </section>

        <section className="about-features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📊 Dashboard Overview</h3>
              <p>Real-time insights into pharmacy operations and key metrics</p>
            </div>
            <div className="feature-card">
              <h3>💊 Product Management</h3>
              <p>Organize and track all medicines and products efficiently</p>
            </div>
            <div className="feature-card">
              <h3>📦 Inventory Tracking</h3>
              <p>Monitor stock levels with automatic alerts and expiry tracking</p>
            </div>
            <div className="feature-card">
              <h3>📋 Order Management</h3>
              <p>Handle supplier orders and internal requisitions seamlessly</p>
            </div>
            <div className="feature-card">
              <h3>👥 Patient Records</h3>
              <p>Maintain detailed customer information and purchase history</p>
            </div>
            <div className="feature-card">
              <h3>💳 Payment History</h3>
              <p>Track transactions and generate billing reports</p>
            </div>
            <div className="feature-card">
              <h3>🛠️ Support System</h3>
              <p>Get technical assistance and resolve issues quickly</p>
            </div>
            <div className="feature-card">
              <h3>👤 Profile Management</h3>
              <p>Manage user accounts and permissions securely</p>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h2>Get Started Today</h2>
          <p>Join pharmacy stores across the region in digitizing their operations.</p>
          <button className="cta-btn" onClick={() => onNavigate("Auth")}>Start Free Trial</button>
        </section>
      </div>
    </div>
  );
}
