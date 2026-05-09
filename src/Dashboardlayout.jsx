// DashboardLayout.jsx
import React, { useState } from "react";
import Logo from "./assets/logo.png"; // replace with your logo path
import "./dashboard.css";
export default function DashboardLayout({ children, activeMenu = "Dashboard", onNavigate, onlineStatus = true, displayName = "Pritam Biswas" }) {
  const [dashboardSearch, setDashboardSearch] = useState("");
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="dm-root">
      <aside className="dm-sidebar">
        <div className="dm-brand">
          <div className="dm-logo logo-md">
            <img src={Logo} alt="DoorMeds Logo" />
          </div>
          <div className="dm-title">DoorMeds</div>
        </div>

        <nav className="dm-nav" aria-label="Main navigation">
          {[
            {
              key: "Dashboard",
              label: "Dashboard",
              icon: (
                <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
                  <defs>
                    <linearGradient id="navGradientDashboard" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f85de" />
                      <stop offset="100%" stopColor="#9d26e0" />
                    </linearGradient>
                  </defs>
                  <path d="M4 11.5L12 4l8 7.5v8.5a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="url(#navGradientDashboard)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              key: "Product",
              label: "Product",
              icon: (
                <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
                  <defs>
                    <linearGradient id="navGradientProduct" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f85de" />
                      <stop offset="100%" stopColor="#9d26e0" />
                    </linearGradient>
                  </defs>
                  <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" fill="none" stroke="url(#navGradientProduct)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 8l8 4 8-4" fill="none" stroke="url(#navGradientProduct)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 12v8" fill="none" stroke="url(#navGradientProduct)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              key: "Inventory",
              label: "Inventory",
              icon: (
                <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
                  <defs>
                    <linearGradient id="navGradientInventory" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f85de" />
                      <stop offset="100%" stopColor="#9d26e0" />
                    </linearGradient>
                  </defs>
                  <path d="M4 7h16v10H4z" fill="none" stroke="url(#navGradientInventory)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 7l8 5 8-5" fill="none" stroke="url(#navGradientInventory)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 12v8" fill="none" stroke="url(#navGradientInventory)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              key: "Orders",
              label: "Orders",
              icon: (
                <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
                  <defs>
                    <linearGradient id="navGradientOrders" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f85de" />
                      <stop offset="100%" stopColor="#9d26e0" />
                    </linearGradient>
                  </defs>
                  <path d="M6 3h12v4H6z" fill="none" stroke="url(#navGradientOrders)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 7h12v12H6z" fill="none" stroke="url(#navGradientOrders)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 3v4" fill="none" stroke="url(#navGradientOrders)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              key: "Support",
              label: "Support",
              icon: (
                <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
                  <defs>
                    <linearGradient id="navGradientSupport" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f85de" />
                      <stop offset="100%" stopColor="#9d26e0" />
                    </linearGradient>
                  </defs>
                  <path d="M4 14v-2a8 8 0 0 1 16 0v2" fill="none" stroke="url(#navGradientSupport)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M8 14v3a4 4 0 0 0 8 0v-3" fill="none" stroke="url(#navGradientSupport)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M10 10a2 2 0 1 1 4 0" fill="none" stroke="url(#navGradientSupport)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
            },
            {
                key: "Patients",
                label: "Patients",
                icon: (
                  <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
                    <defs>
                      <linearGradient id="navGradientPatients" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1f85de" />
                        <stop offset="100%" stopColor="#9d26e0" />
                      </linearGradient>
                    </defs>
                    <circle cx="8" cy="8" r="2.5" fill="none" stroke="url(#navGradientPatients)" strokeWidth="1.8" />
                    <circle cx="16" cy="8" r="2.5" fill="none" stroke="url(#navGradientPatients)" strokeWidth="1.8" />
                    <path d="M4 17c0-2.5 2-4.5 4.5-4.5h7c2.5 0 4.5 2 4.5 4.5" fill="none" stroke="url(#navGradientPatients)" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M8 13h8" fill="none" stroke="url(#navGradientPatients)" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M12 16v5" fill="none" stroke="url(#navGradientPatients)" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
              },
           {
              key: "Profile",
              label: "Profile",
              icon: (
                <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
                  <defs>
                    <linearGradient id="navGradientProfile" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f85de" />
                      <stop offset="100%" stopColor="#9d26e0" />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="8" r="3" fill="none" stroke="url(#navGradientProfile)" strokeWidth="1.8" />
                  <path d="M5 20c0-3.5 2.7-6 7-6s7 2.5 7 6" fill="none" stroke="url(#navGradientProfile)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
            },
          ].map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeMenu === item.key ? "active" : ""}`}
              onClick={() => onNavigate && onNavigate(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

    <main className="dm-main">
        <header className="dm-header">
          <div className="dm-greeting">
            <h2>Welcome back, <span className="dm-username">{displayName}</span></h2>
            <p className="dm-banner-text">
              Your monthly healthcare supplies are ready! Review and approve your curated prescription list and upcoming OTC orders. <span className="dm-link">View all items</span>
            </p>
          </div>

          <div className="dm-header-actions">
            <div className="dm-search">
              <span className="dm-search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="url(#searchGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="searchGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f85de" />
                      <stop offset="50%" stopColor="#6b46d5" />
                      <stop offset="100%" stopColor="#9d26e0" />
                    </linearGradient>
                  </defs>
                  <circle cx="10" cy="10" r="6" />
                  <line x1="15" y1="15" x2="20" y2="20" />
                </svg>
              </span>
              <input
                type="search"
                className="dm-search-input"
                value={dashboardSearch}
                onChange={(e) => setDashboardSearch(e.target.value)}
                placeholder="Search dashboard..."
                aria-label="Search dashboard"
              />
            </div>
            <button type="button" className="dm-notification-btn" aria-label="Show notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="dm-badge">3</span>
            </button>
            <button
              type="button"
              className="dm-avatar"
              aria-label={`Open profile (${onlineStatus ? "online" : "offline"})`}
            >
              {initials || "PB"}
              <span className={`dm-avatar-status ${onlineStatus ? "online" : "offline"}`} />
            </button>
          </div>
        </header>

        <div className="dm-content">
          {children}
        </div>
      </main>
    </div>
  );
}
