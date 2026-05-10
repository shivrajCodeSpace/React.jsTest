// Dashboard.jsx
import React, { useState } from "react";
import "./dashboard.css";

const stats = [
  { label: "Total Revenue", value: "₹45,000.69", sub: "64 orders" },
  { label: "Total Visitors", value: "45.8K", sub: "unique" },
  { label: "Net Profit", value: "₹33,600.78", sub: "after costs" },
  { label: "Conversion Rate", value: "3.2%", sub: "this month" },
];

const revenueData = [
  { label: "1 MAY", value: 12000 },
  { label: "2 MAY", value: 18000 },
  { label: "3 MAY", value: 9000 },
  { label: "4 MAY", value: 22000 },
  { label: "5 MAY", value: 15000 },
];

const topProducts = [
  { name: "Paracetamol 650mg", stock: 1023, price: "₹3.2", sales: 1823, earnings: "₹5,833.6", growth: "+2.3%" },
  { name: "Amoxicillin 500mg", stock: 1203, price: "₹7.3", sales: 1732, earnings: "₹12,643.6", growth: "+1.8%" },
  { name: "Disposable Gloves (Box)", stock: 1032, price: "₹12.3", sales: 1623, earnings: "₹19,962.9", growth: "+3.2%" },
  { name: "Digital Thermometer", stock: 5232, price: "₹87.9", sales: 1923, earnings: "₹169,181.7", growth: "+4.3%" },
];

const initialEvents = [
  { id: "E1", title: "May Launch Sale", openDate: "2026-05-02", closeDate: "2026-05-05", status: "Open" },
  { id: "E2", title: "Inventory Audit", openDate: "2026-05-12", closeDate: "2026-05-14", status: "Upcoming" },
];

export default function Dashboard() {
  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const minRevenue = Math.min(...revenueData.map(d => d.value));
  const averageRevenue = Math.round(revenueData.reduce((sum, d) => sum + d.value, 0) / revenueData.length);
  const firstRevenue = revenueData[0].value;
  const lastRevenue = revenueData[revenueData.length - 1].value;
  const revenueChange = lastRevenue - firstRevenue;
  const revenueChangePct = Math.round((revenueChange / firstRevenue) * 100);
  const bestDay = revenueData.reduce((best, d) => (d.value > best.value ? d : best), revenueData[0]);
  const worstDay = revenueData.reduce((worst, d) => (d.value < worst.value ? d : worst), revenueData[0]);

  const chartWidth = 460;
  const chartHeight = 140;
  const chartPoints = revenueData.map((d, i) => {
    const x = (chartWidth / (revenueData.length - 1)) * i;
    const y = chartHeight - (d.value / maxRevenue) * chartHeight;
    return { ...d, x, y };
  });

  const linePath = chartPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);
  const hoveredPoint = hoveredPointIndex !== null ? chartPoints[hoveredPointIndex] : null;
  const tooltipTop = hoveredPoint ? Math.max(0, hoveredPoint.y - 44) : 0;
  const tooltipLeft = hoveredPoint ? `${Math.min(100, (hoveredPoint.x / chartWidth) * 100)}%` : "0%";

  const [events, setEvents] = useState(initialEvents);
  const [eventForm, setEventForm] = useState({ id: null, title: "", openDate: "", closeDate: "", status: "Open" });
  const [editingEventId, setEditingEventId] = useState(null);
  const isEditingEvent = Boolean(editingEventId);

  const handleEventChange = (event) => {
    const { name, value } = event.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEvent = (eventData) => {
    setEditingEventId(eventData.id);
    setEventForm(eventData);
  };

  const handleCancelEvent = () => {
    setEditingEventId(null);
    setEventForm({ id: null, title: "", openDate: "", closeDate: "", status: "Open" });
  };

  const handleSaveEvent = (event) => {
    event.preventDefault();
    if (!eventForm.title || !eventForm.openDate || !eventForm.closeDate) {
      return;
    }

    if (isEditingEvent) {
      setEvents((prev) => prev.map((item) => (item.id === editingEventId ? { ...item, ...eventForm } : item)));
    } else {
      setEvents((prev) => [...prev, { ...eventForm, id: `E${Date.now()}` }]);
    }

    handleCancelEvent();
  };

  const pie = { prescription: 60, otc: 25, personalCare: 15 };
  const calendarMonth = new Date(2026, 4, 1); // May 2026
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOffset = calendarMonth.getDay();
  const daysInMonth = 31;
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === 2026 && today.getMonth() === 4;
  const monthKey = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}`;
  const eventMarkers = events.reduce((acc, item) => {
    [{ date: item.openDate, type: "Open" }, { date: item.closeDate, type: "Close" }].forEach((entry) => {
      if (entry.date.startsWith(monthKey)) {
        const day = Number(entry.date.slice(-2));
        if (day >= 1 && day <= daysInMonth) {
          acc[day] = [...(acc[day] || []), { ...entry, title: item.title }];
        }
      }
    });
    return acc;
  }, {});

  return (
    <>
      <section className="dm-stats">
        {stats.map((s, i) => (
          <div key={i} className="dm-card">
            <div className="dm-card-label">{s.label}</div>
            <div className="dm-card-value">{s.value}</div>
            <div className="dm-card-sub">{s.sub}</div>
          </div>
        ))}
      </section>

      <section className="dm-grid">
        <div className="dm-panel dm-revenue">
          <div className="panel-header">
            <h3>Revenue Trend</h3>
            <div className="panel-meta">Last 5 weeks</div>
          </div>
          <div className="revenue-chart">
            <div className="line-chart-wrapper">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="line-chart-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1f85de" />
                    <stop offset="100%" stopColor="#6b46d5" />
                  </linearGradient>
                </defs>
                <path d={linePath} className="line-path" />
                {chartPoints.map((point, i) => (
                  <g key={i}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="12"
                      className="line-point-hit"
                      onMouseEnter={() => setHoveredPointIndex(i)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                    <circle cx={point.x} cy={point.y} r="5" className={`line-point ${hoveredPointIndex === i ? "active" : ""}`} />
                  </g>
                ))}
              </svg>
              {hoveredPoint && (
                <div className="chart-tooltip" style={{ left: tooltipLeft, top: `${tooltipTop}px` }}>
                  <div className="tooltip-label">{hoveredPoint.label}</div>
                  <div className="tooltip-value">₹{hoveredPoint.value.toLocaleString()}</div>
                </div>
              )}
            </div>
            <div className="line-labels">
              {revenueData.map((d, i) => (
                <div key={i} className="line-label">{d.label}</div>
              ))}
            </div>
            <div className="revenue-analysis">
              <div className="analysis-item"><strong>Average:</strong> ₹{averageRevenue.toLocaleString()}</div>
              <div className="analysis-item"><strong>Trend:</strong> {revenueChange >= 0 ? "+" : ""}{revenueChangePct}% from 1 MAY to 5 MAY</div>
              <div className="analysis-item"><strong>Peak:</strong> {bestDay.label} at ₹{bestDay.value.toLocaleString()}</div>
              <div className="analysis-item"><strong>Lowest:</strong> {worstDay.label} at ₹{worstDay.value.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="dm-panel dm-funnel">
          <div className="panel-header">
            <h3>Sales Funnel</h3>
            <div className="panel-meta">Inventory & fulfillment</div>
          </div>
          <ul className="funnel-list">
            <li>
              <div className="funnel-title">Total Inventory</div>
              <div className="funnel-value">412.55K <span className="muted">Expand stock 0.31%</span></div>
            </li>
            <li>
              <div className="funnel-title">Order Fulfill</div>
              <div className="funnel-value">198.20K <span className="muted">Refill delay 2.2%</span></div>
            </li>
            <li>
              <div className="funnel-title">Restock Recs.</div>
              <div className="funnel-value">20.8K <span className="muted">Stock refill 1.3%</span></div>
            </li>
            <li>
              <div className="funnel-title">Deliveries</div>
              <div className="funnel-value">112.9K <span className="muted">Delayed 0.9%</span></div>
            </li>
          </ul>
        </div>

        <div className="dm-panel dm-products">
          <div className="panel-header">
            <h3>Top Selling Product</h3>
            <div className="panel-meta">This month</div>
          </div>
          <table className="products-table">
            <thead>
              <tr>
                <th>PRODUCTS</th>
                <th>STOCK</th>
                <th>PRICE</th>
                <th>SALES</th>
                <th>EARNINGS</th>
                <th>GROWTH</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.stock}</td>
                  <td>{p.price}</td>
                  <td>{p.sales}</td>
                  <td>{p.earnings}</td>
                  <td className="growth">{p.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dm-panel dm-categories">
          <div className="panel-header">
            <h3>Top Categories</h3>
            <div className="panel-meta">Share by sales</div>
          </div>
          <div className="pie-row">
            <div className="pie" style={{ background: `conic-gradient(#4f46e5 0 ${pie.prescription}%, #06b6d4 ${pie.prescription}% ${pie.prescription + pie.otc}%, #f97316 ${pie.prescription + pie.otc}% 100%)` }} />
            <ul className="pie-legend">
              <li><span className="dot" style={{ background: "#4f46e5" }} /> Prescription Drugs</li>
              <li><span className="dot" style={{ background: "#06b6d4" }} /> Over-the-Counter</li>
              <li><span className="dot" style={{ background: "#f97316" }} /> Personal Care</li>
            </ul>
          </div>
        </div>

        <div className="dm-panel dm-calendar">
          <div className="panel-header">
            <h3>Calendar</h3>
            <div className="panel-meta">May 2026</div>
          </div>
          <div className="calendar-placeholder">
            <div className="calendar-header">
              {weekDays.map(day => (
                <div key={day} className="calendar-dayname">{day}</div>
              ))}
            </div>
            <div className="cal-grid">
              {Array.from({ length: 42 }).map((_, i) => {
                const date = i - startOffset + 1;
                const isBlank = date < 1 || date > daysInMonth;
                const isTodayCell = isCurrentMonth && date === today.getDate();
                const isWeekend = i % 7 === 0 || i % 7 === 6;
                const markers = eventMarkers[date] || [];
                return (
                  <div
                    key={i}
                    className={`cal-cell ${isBlank ? "blank" : ""} ${isWeekend ? "weekend" : ""} ${isTodayCell ? "today" : ""}`}
                  >
                    {isBlank ? "" : date}
                    {!isBlank && markers.length > 0 && (
                      <div className="calendar-event-dots">
                        {markers.map((marker, index) => (
                          <span
                            key={index}
                            className={`calendar-event-dot ${marker.type.toLowerCase()}`}
                            title={`${marker.type}: ${marker.title}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="event-schedule">
            <div className="event-schedule-header">
              <div className="event-schedule-title">Event schedule</div>
              <div className="event-schedule-meta">Manage open/close dates</div>
            </div>
            <div className="event-list">
              {events.map((item) => (
                <div key={item.id} className="event-item">
                  <div className="event-meta">
                    <div className="event-title">{item.title}</div>
                    <div className="event-dates">{item.openDate} → {item.closeDate}</div>
                  </div>
                  <div className="event-actions">
                    <span className={`event-status event-status-${item.status.toLowerCase()}`}>{item.status}</span>
                    <button className="event-edit-btn" type="button" onClick={() => handleEditEvent(item)}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
            <form className="event-form" onSubmit={handleSaveEvent}>
              <div className="form-row">
                <label>
                  Event
                  <input name="title" value={eventForm.title} onChange={handleEventChange} placeholder="Event name" />
                </label>
                <label>
                  Open date
                  <input name="openDate" type="date" value={eventForm.openDate} onChange={handleEventChange} />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Close date
                  <input name="closeDate" type="date" value={eventForm.closeDate} onChange={handleEventChange} />
                </label>
                <label>
                  Status
                  <select name="status" value={eventForm.status} onChange={handleEventChange}>
                    <option>Open</option>
                    <option>Upcoming</option>
                    <option>Closed</option>
                  </select>
                </label>
              </div>
              <div className="event-form-actions">
                <button className="primary" type="submit">{isEditingEvent ? "Update" : "Add"} event</button>
                {isEditingEvent && (
                  <button className="secondary" type="button" onClick={handleCancelEvent}>Cancel</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
