// App.jsx
import React, { useState } from "react";
import SplashScreen from "./components/Splash";
import AuthPage from "./components/AuthPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import ProductPage from "./components/Product";
import InventoryPage, { SAMPLE_INVENTORY } from "./components/Inventory";
import OrdersPage from "./components/Order";
import SupportPage from "./components/Support";
import ProfilePage from "./components/Profile";
import PatientsPage from "./components/Patients";
import AboutPage from "./components/About";
import ServicesPage from "./components/Services";
import ProductInfoPage from "./components/ProductInfo";
import BlogPage from "./components/Blog";

export default function App() {
  const [page, setPage] = useState("Splash");
  const [authMode, setAuthMode] = useState("login");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [displayName, setDisplayName] = useState("Pritam Biswas");
  const [inventoryItems, setInventoryItems] = useState(SAMPLE_INVENTORY);
  const [notifications, setNotifications] = useState([]);
  const lowStockItems = inventoryItems.filter((item) => item.stock <= item.reorderPoint);
  const lowStockCount = lowStockItems.length;

  const handleNavigate = (pageName, options = {}) => {
    if (pageName === "Auth") {
      if (options.mode === "signup" || options.signup) {
        setAuthMode("signup");
      } else {
        setAuthMode("login");
      }
    }
    setPage(pageName);
  };

  const handleSignOut = () => {
    setOnlineStatus(false);
    setAuthMode("login");
    setPage("Auth");
  };

  const handleNewOrderNotifications = (newNotifications) => {
    setNotifications((current) => [...newNotifications, ...current]);
  };

  const handleNotificationClick = (notification) => {
    setNotifications((current) => current.filter((item) => item.id !== notification.id));
    setPage("Orders");
  };

  if (page === "Splash") {
    return <SplashScreen onNavigate={handleNavigate} />;
  }

  if (page === "Auth") {
    return <AuthPage initialMode={authMode} onNavigate={handleNavigate} />;
  }

  if (page === "About") {
    return <AboutPage onNavigate={handleNavigate} />;
  }

  if (page === "Services") {
    return <ServicesPage onNavigate={handleNavigate} />;
  }

  if (page === "ProductInfo") {
    return <ProductInfoPage onNavigate={handleNavigate} />;
  }

  if (page === "Blog") {
    return <BlogPage onNavigate={handleNavigate} />;
  }
  // const [page, setPage] = useState("Dashboard");
  return (
    <DashboardLayout
      activeMenu={page}
      onNavigate={setPage}
      onlineStatus={onlineStatus}
      displayName={displayName}
      lowStockCount={lowStockCount}
      notifications={notifications}
      notificationBadgeCount={notifications.length + lowStockCount}
      onNotificationClick={handleNotificationClick}
      onAlertClick={() => setPage("Inventory")}
      onSignOut={handleSignOut}
    >
      {page === "Dashboard" && (
        <Dashboard lowStockCount={lowStockCount} onAlertClick={() => setPage("Inventory")} />
      )}
      {page === "Product" && <ProductPage />}
      {page === "Inventory" && (
        <InventoryPage
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
          onNavigate={setPage}
        />
      )}
      {page === "Orders" && <OrdersPage onNewOrderReceived={handleNewOrderNotifications} />}
      {page === "Support" && <SupportPage />}
      {page === "Patients" && <PatientsPage />}
      {page === "Profile" && <ProfilePage onlineStatus={onlineStatus} setOnlineStatus={setOnlineStatus} displayName={displayName} setDisplayName={setDisplayName} />}
      {page === "Auth" && <AuthPage initialMode={authMode} onNavigate={handleNavigate} />}
    </DashboardLayout>
  );
}
