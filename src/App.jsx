// App.jsx
import React, { useState } from "react";
import SplashScreen from "./Splash";
import AuthPage from "./AuthPage";
import DashboardLayout from "./DashboardLayout";
import Dashboard from "./Dashboard";
import ProductPage from "./Product";
import InventoryPage from "./Inventory";
import OrdersPage from "./Order";
import SupportPage from "./Support";
import ProfilePage from "./Profile";
import PatientsPage from "./Patients";
import AboutPage from "./About";
import ServicesPage from "./Services";
import ProductInfoPage from "./ProductInfo";
import BlogPage from "./Blog";

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
