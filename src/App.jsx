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
