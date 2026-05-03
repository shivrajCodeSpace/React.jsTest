// App.jsx
import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Dashboard from "./Dashboard";
import ProductPage from "./Product"; // your Product.jsx
import InventoryPage from "./Inventory";
import OrdersPage from "./Order";
import SupportPage from "./Support";
import ProfilePage from "./Profile";
import PatientsPage from "./Patients";
export default function App() {
  const [page, setPage] = useState("Dashboard");
  return (
    <DashboardLayout activeMenu={page} onNavigate={setPage}>
      {page === "Dashboard" && <Dashboard />}
      {page === "Product" && <ProductPage />}
      {page === "Inventory" && <InventoryPage />}
      {page === "Orders" && <OrdersPage />}
      {page === "Support" && <SupportPage/>}
      {page === "Patients" && <PatientsPage/>}
      {page === "Profile" && <ProfilePage/>}
    </DashboardLayout>
  );
}
