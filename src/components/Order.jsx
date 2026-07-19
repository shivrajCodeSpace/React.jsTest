// Order.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getOrders } from "../api/api";
// import Logo from "./logo.png"; // replace with your logo path
import "./order.css";

const SAMPLE_ORDERS = [
  {
    id: "ORD-1001",
    customer: "Asha Roy",
    phone: "+91 98765 43210",
    address: "12 MG Road, Agartala",
    date: "2026-04-28",
    status: "Pending",
    items: [
      { name: "Paracetamol 650mg", qty: 2, price: 3.2 },
      { name: "Disposable Gloves Box", qty: 1, price: 12.3 },
    ],
    total: 18.7,
    payment: "COD",
  },
  {
    id: "ORD-1002",
    customer: "Ravi Kumar",
    phone: "+91 91234 56789",
    address: "45 Park Street, Agartala",
    date: "2026-04-27",
    status: "Processing",
    items: [
      { name: "Amoxicillin 500mg", qty: 1, price: 7.3 },
      { name: "Digital Thermometer", qty: 1, price: 87.9 },
    ],
    total: 95.2,
    payment: "Prepaid",
  },
  {
    id: "ORD-1003",
    customer: "Sunita Das",
    phone: "+91 99876 54321",
    address: "8 Lake View, Agartala",
    date: "2026-04-25",
    status: "Shipped",
    items: [
      { name: "Cough Syrup 100ml", qty: 1, price: 45.0 },
    ],
    total: 45.0,
    payment: "Prepaid",
  },
  {
    id: "ORD-1004",
    customer: "Pritam Biswas",
    phone: "+91 90000 11111",
    address: "22 Hospital Road, Agartala",
    date: "2026-04-24",
    status: "Delivered",
    items: [
      { name: "Insulin 10ml", qty: 1, price: 250.0 },
    ],
    total: 250.0,
    payment: "Prepaid",
  },
  {
    id: "ORD-1005",
    customer: "Maya Sen",
    phone: "+91 91111 22222",
    address: "7 Market Lane, Agartala",
    date: "2026-04-23",
    status: "Cancelled",
    items: [
      { name: "Disposable Gloves Box", qty: 2, price: 12.3 },
    ],
    total: 24.6,
    payment: "COD",
  },
];

const STATUSES = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage({ onNewOrderReceived }) {
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    phone: "",
    address: "",
    date: new Date().toISOString().slice(0, 10),
    payment: "COD",
    status: "Pending",
    itemName: "",
    itemQty: "1",
    itemPrice: "0",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const ordersRef = useRef(orders);

  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  useEffect(() => {
    let mounted = true;
    const fetchOrdersFromApi = async () => {
      try {
        const result = await getOrders();
        const apiOrders = Array.isArray(result)
          ? result
          : result.orders || result.data || result.result || [];

        if (!Array.isArray(apiOrders) || apiOrders.length === 0) {
          return;
        }

        if (!mounted) {
          return;
        }

        if (!apiLoaded) {
          setOrders(apiOrders);
          setApiLoaded(true);
          return;
        }

        const existingIds = new Set(ordersRef.current.map((o) => o.id));
        const newOrders = apiOrders.filter((order) => !existingIds.has(order.id));

        if (newOrders.length > 0) {
          setOrders((current) => [...newOrders, ...current]);
          setPage(1);

          const orderNotifications = newOrders.map((order) => ({
            id: `new-order-${order.id}-${Date.now()}`,
            title: "New order received",
            subtitle: `${order.customer || "Customer"} placed ${order.items?.length || 1} item(s).`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            order,
          }));

          if (onNewOrderReceived) {
            onNewOrderReceived(orderNotifications);
          }

          setToastMessage(`${newOrders.length} new order${newOrders.length > 1 ? "s" : ""} received`);
          setShowToast(true);
          window.setTimeout(() => {
            if (mounted) {
              setShowToast(false);
            }
          }, 4500);
        }
      } catch (error) {
        console.error("Order polling error:", error);
      }
    };

    fetchOrdersFromApi();
    const intervalId = window.setInterval(fetchOrdersFromApi, 15000);
    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, [apiLoaded, onNewOrderReceived]);

  const filtered = useMemo(() => {
    let list = orders.slice();
    if (statusFilter !== "All") list = list.filter((o) => o.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.phone.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "date-asc":
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "total-asc":
        list.sort((a, b) => a.total - b.total);
        break;
      case "total-desc":
        list.sort((a, b) => b.total - a.total);
        break;
      default:
        break;
    }
    return list;
  }, [orders, query, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeStatus(id, nextStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o)));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((s) => ({ ...s, status: nextStatus }));
    }
  }

  function cancelOrder(id) {
    changeStatus(id, "Cancelled");
  }

  function markShipped(id) {
    changeStatus(id, "Shipped");
  }

  function markDelivered(id) {
    changeStatus(id, "Delivered");
  }

  function viewOrder(order) {
    setSelectedOrder(order);
  }

  function handleToggleAddForm() {
    setShowAddForm((current) => !current);
  }

  function handleNewOrderChange(event) {
    const { name, value } = event.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddOrder(event) {
    event.preventDefault();
    const id = `ORD-${Date.now().toString().slice(-6)}`;
    const qty = Number(newOrder.itemQty) || 1;
    const price = Number(newOrder.itemPrice) || 0;
    const nextOrder = {
      id,
      customer: newOrder.customer.trim() || `Customer ${id.slice(-4)}`,
      phone: newOrder.phone.trim() || "+91 90000 00000",
      address: newOrder.address.trim() || "Address not available",
      date: newOrder.date,
      status: newOrder.status,
      items: [{ name: newOrder.itemName.trim() || "Item", qty, price }],
      total: qty * price,
      payment: newOrder.payment,
    };
    setOrders((current) => [nextOrder, ...current]);
    setNewOrder({
      customer: "",
      phone: "",
      address: "",
      date: new Date().toISOString().slice(0, 10),
      payment: "COD",
      status: "Pending",
      itemName: "",
      itemQty: "1",
      itemPrice: "0",
    });
    setShowAddForm(false);
    setPage(1);
  }

  return (
    <div className="ord-root">
      <header className="ord-header">
        <div className="ord-brand">
          {/* <div className="ord-logo">
            <img src={Logo} alt="DoorMeds Logo" />
          </div> */}
          <h2 className="ord-title">Orders</h2>
        </div>

        <div className="ord-controls">
          <input
            className="ord-search"
            placeholder="Search by order ID, customer, phone"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            aria-label="Search orders"
          />

          <select
            className="ord-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by status"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select className="ord-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort orders">
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="total-desc">Total High → Low</option>
            <option value="total-asc">Total Low → High</option>
          </select>

          <button className="ord-btn primary" onClick={handleToggleAddForm}>{showAddForm ? "Cancel" : "+ New Order"}</button>
        </div>
      </header>

      {showAddForm && (
        <section className="ord-add-form">
          <h2>Add New Order</h2>
          <form onSubmit={handleAddOrder}>
            <div className="form-grid">
              <label>
                Customer
                <input name="customer" value={newOrder.customer} onChange={handleNewOrderChange} placeholder="Customer name" />
              </label>
              <label>
                Phone
                <input name="phone" value={newOrder.phone} onChange={handleNewOrderChange} placeholder="+91 ..." />
              </label>
              <label>
                Address
                <input name="address" value={newOrder.address} onChange={handleNewOrderChange} placeholder="Shipping address" />
              </label>
              <label>
                Date
                <input name="date" type="date" value={newOrder.date} onChange={handleNewOrderChange} />
              </label>
              <label>
                Payment
                <select name="payment" value={newOrder.payment} onChange={handleNewOrderChange}>
                  <option value="COD">COD</option>
                  <option value="Prepaid">Prepaid</option>
                </select>
              </label>
              <label>
                Order item
                <input name="itemName" value={newOrder.itemName} onChange={handleNewOrderChange} placeholder="Product name" />
              </label>
              <label>
                Qty
                <input name="itemQty" type="number" min="1" value={newOrder.itemQty} onChange={handleNewOrderChange} />
              </label>
              <label>
                Price
                <input name="itemPrice" type="number" min="0" step="0.01" value={newOrder.itemPrice} onChange={handleNewOrderChange} />
              </label>
              <label>
                Status
                <select name="status" value={newOrder.status} onChange={handleNewOrderChange}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </label>
            </div>
            <button type="submit" className="ord-btn primary">Save order</button>
          </form>
        </section>
      )}

      {showToast && (
        <div className="ord-toast" role="status" aria-live="polite">
          <div className="ord-toast-inner">
            <strong>New order received</strong>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <main className="ord-main">
        <section className="ord-list">
          <div className="ord-list-header">
            <div className="ord-summary">
              <strong>{filtered.length}</strong> orders • <span className="muted">{statusFilter}</span>
            </div>
            <div className="ord-actions">
              <button className="ord-btn" onClick={() => { setStatusFilter("All"); setQuery(""); }}>Reset</button>
            </div>
          </div>

          <div className="ord-table-wrap">
            <table className="ord-table" role="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th style={{ width: 180 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((o) => (
                  <tr key={o.id} className={`ord-row ${o.status.toLowerCase()}`}>
                    <td className="ord-id" onClick={() => viewOrder(o)}>{o.id}</td>
                    <td>
                      <div className="cust-name">{o.customer}</div>
                      <div className="muted">{o.phone}</div>
                    </td>
                    <td>{o.date}</td>
                    <td>{o.items.length}</td>
                    <td>₹{o.total.toFixed(2)}</td>
                    <td>{o.payment}</td>
                    <td><span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                    <td>
                      <div className="row-actions">
                        {o.status !== "Cancelled" && o.status !== "Delivered" && (
                          <>
                            {o.status === "Pending" && <button className="small" onClick={() => changeStatus(o.id, "Processing")}>Start</button>}
                            {o.status === "Processing" && <button className="small" onClick={() => markShipped(o.id)}>Ship</button>}
                            {o.status === "Shipped" && <button className="small" onClick={() => markDelivered(o.id)}>Deliver</button>}
                            <button className="small ghost" onClick={() => cancelOrder(o.id)}>Cancel</button>
                          </>
                        )}
                        <button className="small" onClick={() => viewOrder(o)}>View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && <div className="empty">No orders found.</div>}
          </div>

          <div className="ord-pagination">
            <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <div className="page-info">Page {page} of {totalPages}</div>
            <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        </section>

        <aside className="ord-side">
          <div className="side-card">
            <h4>Order Details</h4>
            {selectedOrder ? (
              <>
                <div className="detail-row">
                  <div className="detail-label">Order</div>
                  <div className="detail-value">{selectedOrder.id}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Customer</div>
                  <div className="detail-value">{selectedOrder.customer}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Phone</div>
                  <div className="detail-value">{selectedOrder.phone}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Address</div>
                  <div className="detail-value">{selectedOrder.address}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{selectedOrder.date}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Payment</div>
                  <div className="detail-value">{selectedOrder.payment}</div>
                </div>

                <div className="items-list">
                  <h5>Items</h5>
                  <ul>
                    {selectedOrder.items.map((it, idx) => (
                      <li key={idx}>
                        <div className="it-name">{it.name}</div>
                        <div className="it-meta">{it.qty} × ₹{it.price.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="detail-row total">
                  <div className="detail-label">Total</div>
                  <div className="detail-value">₹{selectedOrder.total.toFixed(2)}</div>
                </div>

                <div className="side-actions">
                  {selectedOrder.status !== "Cancelled" && selectedOrder.status !== "Delivered" && (
                    <>
                      {selectedOrder.status === "Pending" && <button className="primary-btn" onClick={() => changeStatus(selectedOrder.id, "Processing")}>Start Processing</button>}
                      {selectedOrder.status === "Processing" && <button className="primary-btn" onClick={() => markShipped(selectedOrder.id)}>Mark Shipped</button>}
                      {selectedOrder.status === "Shipped" && <button className="primary-btn" onClick={() => markDelivered(selectedOrder.id)}>Mark Delivered</button>}
                      <button className="ghost" onClick={() => cancelOrder(selectedOrder.id)}>Cancel Order</button>
                    </>
                  )}
                  <button className="ghost" onClick={() => setSelectedOrder(null)}>Close</button>
                </div>
              </>
            ) : (
              <div className="empty">Select an order to view details.</div>
            )}
          </div>

          <div className="side-card">
            <h4>Quick Stats</h4>
            <div className="stats-grid">
              <div>
                <div className="stat-label">Total Orders</div>
                <div className="stat-value">{orders.length}</div>
              </div>
              <div>
                <div className="stat-label">Pending</div>
                <div className="stat-value">{orders.filter((o) => o.status === "Pending").length}</div>
              </div>
              <div>
                <div className="stat-label">Processing</div>
                <div className="stat-value">{orders.filter((o) => o.status === "Processing").length}</div>
              </div>
              <div>
                <div className="stat-label">Shipped</div>
                <div className="stat-value">{orders.filter((o) => o.status === "Shipped").length}</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
