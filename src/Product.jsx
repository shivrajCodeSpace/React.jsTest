// Product.jsx
import React, { useMemo, useState } from "react";
import Logo from "./assets/logo.png"; // replace with your logo path
import "./product.css";

const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "Paracetamol 650mg",
    sku: "PARA-650",
    category: "Prescription",
    stock: 1023,
    price: 3.2,
    unit: "tablet",
    image: null,
    description: "Fast acting pain relief.",
    growth: 2.3,
  },
  {
    id: "p2",
    name: "Amoxicillin 500mg",
    sku: "AMOX-500",
    category: "Prescription",
    stock: 1203,
    price: 7.3,
    unit: "capsule",
    image: null,
    description: "Broad spectrum antibiotic.",
    growth: 1.8,
  },
  {
    id: "p3",
    name: "Disposable Gloves Box",
    sku: "GLOV-BOX",
    category: "Personal Care",
    stock: 1032,
    price: 12.3,
    unit: "box",
    image: null,
    description: "Latex free disposable gloves.",
    growth: 3.2,
  },
  {
    id: "p4",
    name: "Digital Thermometer",
    sku: "THERM-01",
    category: "OTC",
    stock: 5232,
    price: 87.9,
    unit: "piece",
    image: null,
    description: "Quick read digital thermometer.",
    growth: 4.3,
  },
  // add more sample items if needed
];

const CATEGORIES = ["All", "Prescription", "OTC", "Personal Care"];

export default function ProductPage() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
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
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return list;
  }, [products, query, category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSelectProduct(p) {
    setSelected(p);
  }

  function handleToggleView(mode) {
    setViewMode(mode);
  }

  function handleUpdateStock(id, delta) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  }

  function handleAddSample() {
    const id = `p${Date.now()}`;
    const newItem = {
      id,
      name: `New Product ${id.slice(-4)}`,
      sku: `NEW-${id.slice(-4)}`,
      category: "OTC",
      stock: 100,
      price: 9.99,
      unit: "unit",
      image: null,
      description: "Newly added product.",
      growth: 0,
    };
    setProducts((p) => [newItem, ...p]);
    setPage(1);
  }

  return (
    <div className="prod-root">
      <header className="prod-header">
        <div className="prod-brand">
         
          <div className="prod-title">Products</div>
        </div>

        <div className="prod-actions">
          <div className="search-wrap">
            <input
              className="search-input"
              placeholder="Search products, SKU, description"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              aria-label="Search products"
            />
          </div>

          <select
            className="select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="stock-desc">Stock High → Low</option>
            <option value="stock-asc">Stock Low → High</option>
            <option value="price-asc">Price Low → High</option>
            <option value="price-desc">Price High → Low</option>
          </select>

          <div className="view-toggle" role="tablist" aria-label="View mode">
            <button
              className={`icon-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => handleToggleView("grid")}
              aria-pressed={viewMode === "grid"}
            >
              Grid
            </button>
            <button
              className={`icon-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => handleToggleView("table")}
              aria-pressed={viewMode === "table"}
            >
              Table
            </button>
          </div>

          <button className="primary-btn" onClick={handleAddSample}>
            + Add Product
          </button>
        </div>
      </header>

      <main className="prod-main">
        <section className="prod-list-area">
          {viewMode === "grid" ? (
            <div className="prod-grid">
              {pageItems.map((p) => (
                <article key={p.id} className="prod-card" onClick={() => handleSelectProduct(p)}>
                  <div className="prod-thumb">
                    {p.image ? <img src={p.image} alt={p.name} /> : <div className="thumb-fallback">{p.name.charAt(0)}</div>}
                  </div>
                  <div className="prod-info">
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-meta">
                      <span className="sku">{p.sku}</span>
                      <span className="cat">{p.category}</span>
                    </div>
                    <div className="prod-bottom">
                      <div className="price">₹{p.price.toFixed(2)}</div>
                      <div className={`stock ${p.stock < 50 ? "low" : ""}`}>{p.stock} in stock</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="prod-table-wrap">
              <table className="prod-table" role="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Growth</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((p) => (
                    <tr key={p.id}>
                      <td className="td-name">
                        <div className="td-thumb">
                          {p.image ? <img src={p.image} alt={p.name} /> : <div className="thumb-fallback small">{p.name.charAt(0)}</div>}
                        </div>
                        <div>
                          <div className="prod-name">{p.name}</div>
                          <div className="muted">{p.description}</div>
                        </div>
                      </td>
                      <td>{p.sku}</td>
                      <td>{p.category}</td>
                      <td>{p.stock}</td>
                      <td>₹{p.price.toFixed(2)}</td>
                      <td className="growth">{p.growth}%</td>
                      <td>
                        <div className="row-actions">
                          <button className="small" onClick={() => handleUpdateStock(p.id, 10)}>+10</button>
                          <button className="small" onClick={() => handleUpdateStock(p.id, -10)}>-10</button>
                          <button className="small ghost" onClick={() => handleSelectProduct(p)}>View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination">
            <button className="page-btn" onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1}>
              Prev
            </button>
            <div className="page-info">
              Page {page} of {totalPages}
            </div>
            <button className="page-btn" onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </section>

        <aside className="prod-side">
          <div className="side-card">
            <h4>Selected Product</h4>
            {selected ? (
              <>
                <div className="side-thumb">
                  {selected.image ? <img src={selected.image} alt={selected.name} /> : <div className="thumb-fallback large">{selected.name.charAt(0)}</div>}
                </div>
                <div className="side-info">
                  <div className="prod-name">{selected.name}</div>
                  <div className="muted">{selected.sku} • {selected.category}</div>
                  <p className="desc">{selected.description}</p>
                  <div className="side-stats">
                    <div><strong>Stock</strong><div>{selected.stock}</div></div>
                    <div><strong>Price</strong><div>₹{selected.price.toFixed(2)}</div></div>
                    <div><strong>Growth</strong><div className="growth">{selected.growth}%</div></div>
                  </div>
                  <div className="side-actions">
                    <button className="primary-btn" onClick={() => handleUpdateStock(selected.id, 50)}>Restock +50</button>
                    <button className="ghost" onClick={() => setSelected(null)}>Deselect</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty">No product selected. Click a product to view details.</div>
            )}
          </div>

          <div className="side-card">
            <h4>Quick Filters</h4>
            <div className="filter-list">
              <button className="chip" onClick={() => { setCategory("All"); setPage(1); }}>All</button>
              <button className="chip" onClick={() => { setCategory("Prescription"); setPage(1); }}>Prescription</button>
              <button className="chip" onClick={() => { setCategory("OTC"); setPage(1); }}>OTC</button>
              <button className="chip" onClick={() => { setCategory("Personal Care"); setPage(1); }}>Personal Care</button>
              <button className="chip" onClick={() => { setQuery(""); setPage(1); }}>Clear Search</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
