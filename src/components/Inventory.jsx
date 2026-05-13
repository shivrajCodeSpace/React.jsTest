// Inventory.jsx
import React, { useMemo, useState } from "react";
import Logo from "../assets/logo.png"; // replace with your logo path if needed
import "./inventory.css";

export const SAMPLE_INVENTORY = [
  { id: "i1", name: "Paracetamol 650mg", sku: "PARA-650", category: "Prescription", stock: 1023, reorderPoint: 200, price: 3.2, unit: "tablet" },
  { id: "i2", name: "Amoxicillin 500mg", sku: "AMOX-500", category: "Prescription", stock: 1203, reorderPoint: 150, price: 7.3, unit: "capsule" },
  { id: "i3", name: "Disposable Gloves Box", sku: "GLOV-BOX", category: "Personal Care", stock: 1032, reorderPoint: 100, price: 12.3, unit: "box" },
  { id: "i4", name: "Digital Thermometer", sku: "THERM-01", category: "OTC", stock: 5232, reorderPoint: 50, price: 87.9, unit: "piece" },
  { id: "i5", name: "Cough Syrup 100ml", sku: "COUGH-100", category: "OTC", stock: 48, reorderPoint: 60, price: 45.0, unit: "bottle" },
  { id: "i6", name: "Insulin 10ml", sku: "INS-10", category: "Prescription", stock: 12, reorderPoint: 20, price: 250.0, unit: "vial" },
  // add more items as needed
];

const CATEGORIES = ["All", "Prescription", "OTC", "Personal Care"];

export default function InventoryPage({ inventoryItems, setInventoryItems, onNavigate }) {
  const [localItems, setLocalItems] = useState(SAMPLE_INVENTORY);
  const items = inventoryItems ?? localItems;
  const setItems = setInventoryItems ?? setLocalItems;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    sku: "",
    category: "Prescription",
    stock: "",
    reorderPoint: "",
    price: "",
    unit: "",
  });
  const PAGE_SIZE = 8;

  const lowStockItems = useMemo(
    () => items.filter((item) => item.stock <= item.reorderPoint),
    [items]
  );

  const filtered = useMemo(() => {
    let list = items.slice();
    if (category !== "All") list = list.filter((i) => i.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          (i.category || "").toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "stock-asc":
        list.sort((a, b) => a.stock - b.stock);
        break;
      case "stock-desc":
        list.sort((a, b) => b.stock - a.stock);
        break;
      case "reorder-asc":
        list.sort((a, b) => a.reorderPoint - b.reorderPoint);
        break;
      case "reorder-desc":
        list.sort((a, b) => b.reorderPoint - a.reorderPoint);
        break;
      default:
        break;
    }
    return list;
  }, [items, query, category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSelect(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAllOnPage() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      pageItems.forEach((i) => next.add(i.id));
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function bulkAdjustStock(delta) {
    if (selectedIds.size === 0) return;
    setItems((prev) =>
      prev.map((it) => (selectedIds.has(it.id) ? { ...it, stock: Math.max(0, it.stock + delta) } : it))
    );
    clearSelection();
  }

  function updateStock(id, delta) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, stock: Math.max(0, it.stock + delta) } : it)));
  }

  function markAsReorder(id) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, flagged: true } : it)));
  }

  function handleToggleAddForm() {
    setShowAddForm((current) => !current);
  }

  function handleNewItemChange(event) {
    const { name, value } = event.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddItem(event) {
    event.preventDefault();
    const id = `i${Date.now()}`;
    const newInventoryItem = {
      id,
      name: newItem.name.trim() || `Item ${id.slice(-4)}`,
      sku: newItem.sku.trim() || `SKU-${id.slice(-4)}`,
      category: newItem.category,
      stock: Number(newItem.stock) || 0,
      reorderPoint: Number(newItem.reorderPoint) || 5,
      price: Number(newItem.price) || 0,
      unit: newItem.unit.trim() || "pcs",
    };
    setItems((current) => [newInventoryItem, ...current]);
    setNewItem({
      name: "",
      sku: "",
      category: "Prescription",
      stock: "",
      reorderPoint: "",
      price: "",
      unit: "",
    });
    setShowAddForm(false);
    setPage(1);
  }

  return (
    <div className="inv-root">
      <header className="inv-header">
        <div className="inv-brand">
          {/* <div className="inv-logo">
            <img src={Logo} alt="DoorMeds Logo" />
          </div> */}
          <h1 className="inv-title">Inventory</h1>
        </div>

        <div className="inv-controls">
          <input
            className="inv-search"
            placeholder="Search by name, SKU, category"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            aria-label="Search inventory"
          />

          <select
            className="inv-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            aria-label="Filter category"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select className="inv-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort inventory">
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="stock-desc">Stock High → Low</option>
            <option value="stock-asc">Stock Low → High</option>
            <option value="reorder-desc">Reorder High → Low</option>
            <option value="reorder-asc">Reorder Low → High</option>
          </select>

          <button className="inv-btn primary" onClick={handleToggleAddForm}>
            {showAddForm ? "Cancel" : "+ Add Item"}
          </button>
        </div>
      </header>

      {showAddForm && (
        <section className="inv-add-form">
          <h2>Add Inventory Item</h2>
          <form onSubmit={handleAddItem}>
            <div className="form-grid">
              <label>
                Product name
                <input name="name" value={newItem.name} onChange={handleNewItemChange} placeholder="e.g. Vitamin C" />
              </label>
              <label>
                SKU
                <input name="sku" value={newItem.sku} onChange={handleNewItemChange} placeholder="e.g. VIT-C-500" />
              </label>
              <label>
                Category
                <select name="category" value={newItem.category} onChange={handleNewItemChange}>
                  <option value="Prescription">Prescription</option>
                  <option value="OTC">OTC</option>
                  <option value="Personal Care">Personal Care</option>
                </select>
              </label>
              <label>
                Stock
                <input name="stock" type="number" min="0" value={newItem.stock} onChange={handleNewItemChange} placeholder="0" />
              </label>
              <label>
                Reorder point
                <input name="reorderPoint" type="number" min="0" value={newItem.reorderPoint} onChange={handleNewItemChange} placeholder="5" />
              </label>
              <label>
                Unit
                <input name="unit" value={newItem.unit} onChange={handleNewItemChange} placeholder="tablet" />
              </label>
              <label>
                Price
                <input name="price" type="number" min="0" step="0.01" value={newItem.price} onChange={handleNewItemChange} placeholder="0.00" />
              </label>
            </div>
            <button type="submit" className="inv-btn primary">Save item</button>
          </form>
        </section>
      )}

      <section className="inv-actions">
        <div className="inv-selection-info">
          <button className="inv-btn" onClick={selectAllOnPage}>Select page</button>
          <button className="inv-btn" onClick={clearSelection}>Clear</button>
          <div className="inv-selected-count">{selectedIds.size} selected</div>
        </div>

        <div className="inv-bulk">
          <button className="inv-btn" onClick={() => bulkAdjustStock(10)} disabled={selectedIds.size === 0}>+ Add 10</button>
          <button className="inv-btn" onClick={() => bulkAdjustStock(-10)} disabled={selectedIds.size === 0}>- Remove 10</button>
          <button className="inv-btn ghost" onClick={() => bulkAdjustStock(0)} disabled={selectedIds.size === 0}>Flag (no change)</button>
        </div>
      </section>

      <main className="inv-main">
        <div className="inv-table-wrap">
          <table className="inv-table" role="table">
            <thead>
              <tr>
                <th style={{ width: 36 }}><input type="checkbox" aria-label="select all on page" onChange={(e) => (e.target.checked ? selectAllOnPage() : clearSelection())} /></th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Reorder Point</th>
                <th>Price</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((it) => {
                const lowStock = it.stock <= it.reorderPoint;
                return (
                  <tr key={it.id} className={lowStock ? "low" : ""}>
                    <td>
                      <input type="checkbox" checked={selectedIds.has(it.id)} onChange={() => toggleSelect(it.id)} />
                    </td>
                    <td className="td-product">
                      <div className="prod-thumb small">{it.name.charAt(0)}</div>
                      <div>
                        <div className="prod-name">{it.name}</div>
                        <div className="muted">{it.unit}</div>
                      </div>
                    </td>
                    <td>{it.sku}</td>
                    <td>{it.category}</td>
                    <td>
                      <div className="stock-cell">
                        <span className="stock-value">{it.stock}</span>
                        {lowStock && <span className="reorder-badge">Reorder</span>}
                      </div>
                    </td>
                    <td>{it.reorderPoint}</td>
                    <td>₹{it.price.toFixed(2)}</td>
                    <td>
                      <div className="row-actions">
                        <button className="small" onClick={() => updateStock(it.id, 10)}>+10</button>
                        <button className="small" onClick={() => updateStock(it.id, -10)}>-10</button>
                        <button className="small ghost" onClick={() => markAsReorder(it.id)}>Flag</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && <div className="empty">No items found.</div>}
        </div>

        <aside className="inv-side">
          <div className="side-card">
            <h4>Inventory Summary</h4>
            <div className="summary-grid">
              <div>
                <div className="summary-label">Total SKUs</div>
                <div className="summary-value">{items.length}</div>
              </div>
              <div>
                <div className="summary-label">Low Stock</div>
                <div className="summary-value">{lowStockItems.length}</div>
              </div>
              <div>
                <div className="summary-label">Total Units</div>
                <div className="summary-value">{items.reduce((s, i) => s + i.stock, 0)}</div>
              </div>
              <div>
                <div className="summary-label">Estimated Value</div>
                <div className="summary-value">₹{items.reduce((s, i) => s + i.stock * i.price, 0).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="side-card">
            <h4>Reorder Suggestions</h4>
            <ul className="reorder-list">
              {items
                .filter((i) => i.stock <= i.reorderPoint)
                .slice(0, 6)
                .map((i) => (
                  <li key={i.id}>
                    <div className="r-name">{i.name}</div>
                    <div className="r-meta">{i.stock} in stock • reorder {i.reorderPoint}</div>
                  </li>
                ))}
              {items.filter((i) => i.stock <= i.reorderPoint).length === 0 && <li className="muted">No immediate reorders</li>}
            </ul>
          </div>
        </aside>
      </main>

      <footer className="inv-footer">
        <div className="pagination">
          <button className="inv-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <div className="page-info">Page {page} of {totalPages}</div>
          <button className="inv-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
        </div>
      </footer>
    </div>
  );
}
