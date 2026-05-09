// Dashboard.jsx
import React from "react";
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

  const pie = { prescription: 60, otc: 25, personalCare: 15 };
  const calendarMonth = new Date(2026, 4, 1); // May 2026
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOffset = calendarMonth.getDay();
  const daysInMonth = 31;
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === 2026 && today.getMonth() === 4;

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
                    <circle cx={point.x} cy={point.y} r="5" className="line-point" />
                    <text x={point.x} y={point.y - 12} className="line-point-label">₹{point.value.toLocaleString()}</text>
                  </g>
                ))}
              </svg>
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
                return (
                  <div
                    key={i}
                    className={`cal-cell ${isBlank ? "blank" : ""} ${isWeekend ? "weekend" : ""} ${isTodayCell ? "today" : ""}`}
                  >
                    {isBlank ? "" : date}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
