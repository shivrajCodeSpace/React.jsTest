// App.jsx
import React, { useState } from "react";
import SplashScreen from "./components/Splash";
import AuthPage from "./components/AuthPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import ProductPage from "./components/Product";
import InventoryPage from "./components/Inventory";
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
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [displayName, setDisplayName] = useState("Pritam Biswas");

  if (page === "Splash") {
    return <SplashScreen onNavigate={setPage} />;
  }

  if (page === "Auth") {
    return <AuthPage onNavigate={setPage} />;
  }

  if (page === "About") {
    return <AboutPage onNavigate={setPage} />;
  }

  if (page === "Services") {
    return <ServicesPage onNavigate={setPage} />;
  }

  if (page === "ProductInfo") {
    return <ProductInfoPage onNavigate={setPage} />;
  }

  if (page === "Blog") {
    return <BlogPage onNavigate={setPage} />;
  }
  // const [page, setPage] = useState("Dashboard");
  return (
    <DashboardLayout activeMenu={page} onNavigate={setPage} onlineStatus={onlineStatus} displayName={displayName}>
      {page === "Dashboard" && <Dashboard />}
      {page === "Product" && <ProductPage />}
      {page === "Inventory" && <InventoryPage />}
      {page === "Orders" && <OrdersPage />}
      {page === "Support" && <SupportPage />}
      {page === "Patients" && <PatientsPage />}
      {page === "Profile" && <ProfilePage onlineStatus={onlineStatus} setOnlineStatus={setOnlineStatus} displayName={displayName} setDisplayName={setDisplayName} />}
    </DashboardLayout>
  );
}
