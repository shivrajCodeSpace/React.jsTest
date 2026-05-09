import "./ProductInfo.css";
import BrandHeader from "./components/BrandHeader";

export default function ProductInfoPage({ onNavigate }) {
  return (
    <div className="product-info-container">
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

      {/* Product Content */}
      <div className="product-info-content">
        <div className="product-header">
          <h1>DoorMed Platform</h1>
          <p className="subtitle">Everything You Need to Run Your Pharmacy Efficiently</p>
        </div>

        <section className="product-section">
          <h2>Core Features</h2>
          <div className="features-list">
            <div className="feature">
              <h3>📊 Smart Dashboard</h3>
              <ul>
                <li>Real-time sales metrics and revenue tracking</li>
                <li>Inventory status overview</li>
                <li>Quick access to key operations</li>
              </ul>
            </div>

            <div className="feature">
              <h3>💊 Medicine Database</h3>
              <ul>
                <li>Comprehensive medicine catalog with dosages and details</li>
                <li>Batch and expiry tracking</li>
                <li>Supplier information management</li>
              </ul>
            </div>

            <div className="feature">
              <h3>📦 Advanced Inventory</h3>
              <ul>
                <li>Real-time stock management</li>
                <li>Low-stock alerts and reorder points</li>
                <li>Expiry date warnings and automation</li>
                <li>Inventory adjustment and loss tracking</li>
              </ul>
            </div>

            <div className="feature">
              <h3>👥 Patient Management</h3>
              <ul>
                <li>Customer profiles with contact details</li>
                <li>Purchase history and patterns</li>
                <li>Loyalty program tracking</li>
              </ul>
            </div>

            <div className="feature">
              <h3>📋 Order Processing</h3>
              <ul>
                <li>Easy order creation and tracking</li>
                <li>Supplier order management</li>
                <li>Status updates and notifications</li>
              </ul>
            </div>

            <div className="feature">
              <h3>💳 Billing & Payments</h3>
              <ul>
                <li>Fast and accurate billing</li>
                <li>Multiple payment method support</li>
                <li>Digital receipts and invoices</li>
                <li>Payment history and reports</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="product-benefits">
          <h2>Why Choose DoorMed?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">⚡</span>
              <h3>Faster Operations</h3>
              <p>Reduce manual work and complete tasks in minutes instead of hours</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💰</span>
              <h3>Cost Savings</h3>
              <p>Minimize inventory losses and optimize stock management to reduce waste</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🎯</span>
              <h3>Better Service</h3>
              <p>Provide faster customer service with instant access to product information</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📈</span>
              <h3>Business Growth</h3>
              <p>Insights and analytics help you identify trends and grow your business</p>
            </div>
          </div>
        </section>

        <section className="pricing-section">
          <h2>Simple Pricing Plans</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Basic</h3>
              <p className="price">₹2,999<span>/month</span></p>
              <ul>
                <li>Up to 2 users</li>
                <li>Basic inventory management</li>
                <li>Sales reporting</li>
                <li>Email support</li>
              </ul>
              <button className="pricing-btn" onClick={() => onNavigate("Auth")}>Get Started</button>
            </div>

            <div className="pricing-card featured">
              <h3>Professional</h3>
              <p className="price">₹6,999<span>/month</span></p>
              <ul>
                <li>Up to 10 users</li>
                <li>Advanced inventory & alerts</li>
                <li>Patient management</li>
                <li>Advanced reports</li>
                <li>Priority support</li>
              </ul>
              <button className="pricing-btn primary" onClick={() => onNavigate("Auth")}>Get Started</button>
            </div>

            <div className="pricing-card">
              <h3>Enterprise</h3>
              <p className="price">Custom</p>
              <ul>
                <li>Unlimited users</li>
                <li>All features included</li>
                <li>API access</li>
                <li>Custom integration</li>
                <li>Dedicated support</li>
              </ul>
              <button className="pricing-btn" onClick={() => onNavigate("Auth")}>Contact Sales</button>
            </div>
          </div>
        </section>

        <section className="product-cta">
          <h2>Start Your Free Trial Today</h2>
          <p>No credit card required. Full access to all features for 14 days.</p>
          <button className="cta-btn" onClick={() => onNavigate("Auth")}>Start Free Trial</button>
        </section>
      </div>
    </div>
  );
}
