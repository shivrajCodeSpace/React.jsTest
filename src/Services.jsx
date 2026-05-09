import "./Services.css";
import BrandHeader from "./components/BrandHeader";

export default function ServicesPage({ onNavigate }) {
  return (
    <div className="services-container">
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

      {/* Services Content */}
      <div className="services-content">
        <div className="services-header">
          <h1>Our Services</h1>
          <p className="subtitle">Comprehensive Solutions for Modern Pharmacies</p>
        </div>

        <section className="services-section">
          <div className="service-item">
            <div className="service-icon">🏥</div>
            <h3>Pharmacy Management System</h3>
            <p>Complete digital solution to manage all aspects of your pharmacy operations including medicines, inventory, and sales in one unified platform.</p>
          </div>

          <div className="service-item">
            <div className="service-icon">📦</div>
            <h3>Inventory Management</h3>
            <p>Automatic low-stock alerts, expiry date tracking, and real-time inventory updates to ensure optimal stock levels and minimize wastage.</p>
          </div>

          <div className="service-item">
            <div className="service-icon">👥</div>
            <h3>Customer Management</h3>
            <p>Maintain detailed patient records, purchase history, and preferences to provide personalized service and improve customer loyalty.</p>
          </div>

          <div className="service-item">
            <div className="service-icon">📊</div>
            <h3>Analytics & Reporting</h3>
            <p>Generate comprehensive reports and analytics on sales, inventory, and performance metrics to make data-driven business decisions.</p>
          </div>

          <div className="service-item">
            <div className="service-icon">💳</div>
            <h3>Payment Processing</h3>
            <p>Seamless payment integration and billing system with support for multiple payment methods and automated receipts.</p>
          </div>

          <div className="service-item">
            <div className="service-icon">🔒</div>
            <h3>Security & Compliance</h3>
            <p>Enterprise-grade security with encrypted data storage, user authentication, and compliance with pharmacy regulations.</p>
          </div>

          <div className="service-item">
            <div className="service-icon">📱</div>
            <h3>Multi-Device Access</h3>
            <p>Access your pharmacy operations from desktop, tablet, or mobile device with our responsive web application.</p>
          </div>

          <div className="service-item">
            <div className="service-icon">💬</div>
            <h3>24/7 Customer Support</h3>
            <p>Dedicated support team available around the clock to assist with technical issues and help optimize your pharmacy operations.</p>
          </div>
        </section>

        <section className="services-cta">
          <h2>Ready to Transform Your Pharmacy?</h2>
          <p>Schedule a demo or start your free trial today.</p>
          <button className="cta-btn" onClick={() => onNavigate("Auth")}>Get Started</button>
        </section>
      </div>
    </div>
  );
}
