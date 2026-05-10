// Support.jsx
import React, { useMemo, useState } from "react";
// import Logo from "./logo.png"; // replace with your logo path
import "./support.css";

const SAMPLE_TICKETS = [
  {
    id: "TCK-1001",
    subject: "Prescription upload failed",
    customer: "Asha Roy",
    date: "2026-04-28",
    priority: "High",
    status: "Open",
    channel: "Email",
    messages: [
      { from: "customer", text: "I uploaded my prescription but it failed.", time: "2026-04-28 09:12" },
      { from: "agent", text: "Sorry about that. Can you resend the file?", time: "2026-04-28 09:20" },
    ],
    tags: ["prescription", "upload"],
  },
  {
    id: "TCK-1002",
    subject: "Order delayed",
    customer: "Ravi Kumar",
    date: "2026-04-27",
    priority: "Medium",
    status: "In Progress",
    channel: "Phone",
    messages: [
      { from: "customer", text: "My order hasn't arrived yet.", time: "2026-04-27 14:05" },
      { from: "agent", text: "We are checking with the courier.", time: "2026-04-27 14:12" },
    ],
    tags: ["delivery"],
  },
  {
    id: "TCK-1003",
    subject: "Billing discrepancy",
    customer: "Sunita Das",
    date: "2026-04-25",
    priority: "Low",
    status: "Resolved",
    channel: "Chat",
    messages: [
      { from: "customer", text: "I was charged twice.", time: "2026-04-25 11:30" },
      { from: "agent", text: "Refund processed.", time: "2026-04-25 12:00" },
    ],
    tags: ["billing"],
  },
  {
    id: "TCK-1004",
    subject: "Product damaged",
    customer: "Maya Sen",
    date: "2026-04-24",
    priority: "High",
    status: "Open",
    channel: "Email",
    messages: [
      { from: "customer", text: "The thermometer arrived broken.", time: "2026-04-24 08:45" },
    ],
    tags: ["returns", "damage"],
  },
];

const PRIORITIES = ["All", "High", "Medium", "Low"];
const STATUSES = ["All", "Open", "In Progress", "Resolved", "Closed"];
const CHANNELS = ["All", "Email", "Phone", "Chat"];

export default function SupportPage() {
  const [tickets, setTickets] = useState(SAMPLE_TICKETS);
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [channel, setChannel] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    customer: "",
    phone: "",
    priority: "High",
    channel: "Email",
    message: "",
  });
  const [replyText, setReplyText] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const filtered = useMemo(() => {
    let list = tickets.slice();
    if (priority !== "All") list = list.filter((t) => t.priority === priority);
    if (status !== "All") list = list.filter((t) => t.status === status);
    if (channel !== "All") list = list.filter((t) => t.channel === channel);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.customer.toLowerCase().includes(q) ||
          (t.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [tickets, query, priority, status, channel]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openTicket(t) {
    setSelected(t);
    setReplyText("");
  }

  function sendReply() {
    if (!selected || !replyText.trim()) return;
    const updated = tickets.map((t) =>
      t.id === selected.id
        ? {
            ...t,
            messages: [...t.messages, { from: "agent", text: replyText.trim(), time: new Date().toISOString().slice(0, 16).replace("T", " ") }],
            status: t.status === "Open" ? "In Progress" : t.status,
          }
        : t
    );
    setTickets(updated);
    setSelected((s) => ({ ...s, messages: [...s.messages, { from: "agent", text: replyText.trim(), time: new Date().toISOString().slice(0, 16).replace("T", " ") }] }));
    setReplyText("");
  }

  function changeStatus(id, next) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: next } : t)));
    if (selected && selected.id === id) setSelected((s) => ({ ...s, status: next }));
  }

  function handleToggleAddForm() {
    setShowAddForm((current) => !current);
  }

  function handleNewTicketChange(event) {
    const { name, value } = event.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTicket(event) {
    event.preventDefault();
    const id = `TCK-${Date.now().toString().slice(-6)}`;
    const nextTicket = {
      id,
      subject: newTicket.subject.trim() || `Issue ${id.slice(-4)}`,
      customer: newTicket.customer.trim() || `Customer ${id.slice(-4)}`,
      phone: newTicket.phone.trim() || "+91 90000 00000",
      date: new Date().toISOString().slice(0, 10),
      priority: newTicket.priority,
      status: "Open",
      channel: newTicket.channel,
      messages: [{ from: "customer", text: newTicket.message.trim() || "Support needed", time: new Date().toISOString().slice(0, 16).replace("T", " ") }],
      tags: [newTicket.channel.toLowerCase(), "new"],
    };
    setTickets((current) => [nextTicket, ...current]);
    setNewTicket({
      subject: "",
      customer: "",
      phone: "",
      priority: "High",
      channel: "Email",
      message: "",
    });
    setShowAddForm(false);
    setPage(1);
  }

  return (
    <div className="sup-root">
      <header className="sup-header">
        <div className="sup-brand">
          {/* <div className="sup-logo">
            <img src={Logo} alt="DoorMeds Logo" />
          </div> */}
          <h2 className="sup-title">Support</h2>
        </div>

        <div className="sup-controls">
          <input
            className="sup-search"
            placeholder="Search tickets, customer, tags"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            aria-label="Search tickets"
          />

          <select className="sup-select" value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Filter by priority">
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select className="sup-select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select className="sup-select" value={channel} onChange={(e) => setChannel(e.target.value)} aria-label="Filter by channel">
            {CHANNELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button className="sup-btn primary" onClick={handleToggleAddForm}>{showAddForm ? "Cancel" : "+ New Ticket"}</button>
        </div>
      </header>

      {showAddForm && (
        <section className="sup-add-form">
          <h2>New Support Ticket</h2>
          <form onSubmit={handleAddTicket}>
            <div className="form-grid">
              <label>
                Subject
                <input name="subject" value={newTicket.subject} onChange={handleNewTicketChange} placeholder="Subject" />
              </label>
              <label>
                Customer
                <input name="customer" value={newTicket.customer} onChange={handleNewTicketChange} placeholder="Customer name" />
              </label>
              <label>
                Phone
                <input name="phone" value={newTicket.phone} onChange={handleNewTicketChange} placeholder="+91 ..." />
              </label>
              <label>
                Priority
                <select name="priority" value={newTicket.priority} onChange={handleNewTicketChange}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>
              <label>
                Channel
                <select name="channel" value={newTicket.channel} onChange={handleNewTicketChange}>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="Chat">Chat</option>
                </select>
              </label>
              <label className="full-width">
                Message
                <textarea name="message" value={newTicket.message} onChange={handleNewTicketChange} placeholder="Describe the issue" />
              </label>
            </div>
            <button type="submit" className="sup-btn primary">Save ticket</button>
          </form>
        </section>
      )}

      <main className="sup-main">
        <section className="sup-list">
          <div className="sup-list-header">
            <div className="sup-summary">
              <strong>{filtered.length}</strong> tickets • <span className="muted">{status}</span>
            </div>
            <div className="sup-actions">
              <button className="sup-btn" onClick={() => { setPriority("All"); setStatus("All"); setChannel("All"); setQuery(""); }}>Reset</button>
            </div>
          </div>

          <div className="sup-table-wrap">
            <table className="sup-table" role="table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Channel</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((t) => (
                  <tr key={t.id} className={`sup-row ${t.priority.toLowerCase().replace(" ", "-")}`} onClick={() => openTicket(t)}>
                    <td className="sup-subject">
                      <div className="t-id">{t.id}</div>
                      <div className="t-sub">{t.subject}</div>
                    </td>
                    <td>{t.customer}</td>
                    <td>{t.date}</td>
                    <td><span className={`priority-badge ${t.priority.toLowerCase()}`}>{t.priority}</span></td>
                    <td>{t.channel}</td>
                    <td><span className={`status-badge ${t.status.toLowerCase().replace(" ", "-")}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && <div className="empty">No tickets found.</div>}
          </div>

          <div className="sup-pagination">
            <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <div className="page-info">Page {page} of {totalPages}</div>
            <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        </section>

        <aside className="sup-side">
          <div className="side-card">
            <h4>Ticket Details</h4>
            {selected ? (
              <>
                <div className="detail-head">
                  <div>
                    <div className="t-id large">{selected.id}</div>
                    <div className="t-sub large">{selected.subject}</div>
                    <div className="muted">{selected.customer} • {selected.date}</div>
                  </div>
                  <div className="detail-controls">
                    <select value={selected.status} onChange={(e) => changeStatus(selected.id, e.target.value)}>
                      {STATUSES.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button className="sup-btn" onClick={() => changeStatus(selected.id, "Resolved")}>Resolve</button>
                  </div>
                </div>

                <div className="messages">
                  {selected.messages.map((m, idx) => (
                    <div key={idx} className={`message ${m.from === "agent" ? "agent" : "customer"}`}>
                      <div className="msg-meta">{m.from === "agent" ? "Support" : selected.customer} • <span className="muted">{m.time}</span></div>
                      <div className="msg-text">{m.text}</div>
                    </div>
                  ))}
                </div>

                <div className="reply-box">
                  <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." />
                  <div className="reply-actions">
                    <button className="sup-btn" onClick={() => { setReplyText(""); }}>Clear</button>
                    <button className="sup-btn primary" onClick={sendReply}>Send Reply</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty">Select a ticket to view details and reply.</div>
            )}
          </div>

          <div className="side-card">
            <h4>Quick Filters</h4>
            <div className="filter-list">
              <button className="chip" onClick={() => { setPriority("High"); setPage(1); }}>High Priority</button>
              <button className="chip" onClick={() => { setStatus("Open"); setPage(1); }}>Open Tickets</button>
              <button className="chip" onClick={() => { setChannel("Email"); setPage(1); }}>Email</button>
              <button className="chip" onClick={() => { setQuery(""); setPriority("All"); setStatus("All"); setChannel("All"); setPage(1); }}>Clear</button>
            </div>
          </div>

          <div className="side-card">
            <h4>Support Stats</h4>
            <div className="stats-grid">
              <div>
                <div className="stat-label">Total Tickets</div>
                <div className="stat-value">{tickets.length}</div>
              </div>
              <div>
                <div className="stat-label">Open</div>
                <div className="stat-value">{tickets.filter(t => t.status === "Open").length}</div>
              </div>
              <div>
                <div className="stat-label">In Progress</div>
                <div className="stat-value">{tickets.filter(t => t.status === "In Progress").length}</div>
              </div>
              <div>
                <div className="stat-label">Resolved</div>
                <div className="stat-value">{tickets.filter(t => t.status === "Resolved").length}</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
