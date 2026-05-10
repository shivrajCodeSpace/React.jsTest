// Patients.jsx
import React, { useMemo, useState } from "react";
// import Logo from "./logo.png"; // replace with your logo path
import "./patients.css";

const SAMPLE_PATIENTS = [
  { id: "PAT-001", name: "Asha Roy", age: 32, gender: "Female", phone: "+91 98765 43210", email: "asha@example.com", prescriptions: 3, lastVisit: "2026-04-28", notes: "Diabetic, regular checkups" },
  { id: "PAT-002", name: "Ravi Kumar", age: 45, gender: "Male", phone: "+91 91234 56789", email: "ravi@example.com", prescriptions: 5, lastVisit: "2026-04-27", notes: "Hypertension, on medication" },
  { id: "PAT-003", name: "Sunita Das", age: 29, gender: "Female", phone: "+91 99876 54321", email: "sunita@example.com", prescriptions: 2, lastVisit: "2026-04-25", notes: "Seasonal allergies" },
  { id: "PAT-004", name: "Pritam Biswas", age: 38, gender: "Male", phone: "+91 90000 11111", email: "pritam@example.com", prescriptions: 4, lastVisit: "2026-04-24", notes: "Asthma, inhaler prescribed" },
  { id: "PAT-005", name: "Maya Sen", age: 50, gender: "Female", phone: "+91 91111 22222", email: "maya@example.com", prescriptions: 1, lastVisit: "2026-04-23", notes: "Minor surgery follow-up" },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState(SAMPLE_PATIENTS);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Female",
    phone: "",
    email: "",
    prescriptions: "0",
    lastVisit: new Date().toISOString().slice(0, 10),
    notes: "",
  });
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const filtered = useMemo(() => {
    let list = patients.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q)
      );
    }
    return list;
  }, [patients, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleToggleAddForm() {
    setShowAddForm((current) => !current);
    setEditingPatient(null);
  }

  function handleNewPatientChange(event) {
    const { name, value } = event.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  }

  function handleEditClick() {
    if (selected) {
      setEditingPatient({ ...selected });
      setShowAddForm(false);
    }
  }

  function handleEditPatientChange(event) {
    const { name, value } = event.target;
    setEditingPatient((prev) => ({ ...prev, [name]: value }));
  }

  function handleSavePatient(event) {
    event.preventDefault();
    if (!editingPatient) return;
    setPatients((current) =>
      current.map((patient) => (patient.id === editingPatient.id ? { ...editingPatient, age: Number(editingPatient.age) || 0, prescriptions: Number(editingPatient.prescriptions) || 0 } : patient))
    );
    setSelected({ ...editingPatient, age: Number(editingPatient.age) || 0, prescriptions: Number(editingPatient.prescriptions) || 0 });
    setEditingPatient(null);
  }

  function handleCancelEdit() {
    setEditingPatient(null);
  }

  function handleAddPatient(event) {
    event.preventDefault();
    const id = `PAT-${Date.now().toString().slice(-3)}`;
    const patient = {
      id,
      name: newPatient.name.trim() || `Patient ${id.slice(-3)}`,
      age: Number(newPatient.age) || 0,
      gender: newPatient.gender,
      phone: newPatient.phone.trim() || "+91 90000 00000",
      email: newPatient.email.trim() || "patient@example.com",
      prescriptions: Number(newPatient.prescriptions) || 0,
      lastVisit: newPatient.lastVisit,
      notes: newPatient.notes.trim() || "New patient record",
    };
    setPatients((current) => [patient, ...current]);
    setNewPatient({
      name: "",
      age: "",
      gender: "Female",
      phone: "",
      email: "",
      prescriptions: "0",
      lastVisit: new Date().toISOString().slice(0, 10),
      notes: "",
    });
    setShowAddForm(false);
    setPage(1);
  }

  return (
    <div className="pat-root">
      <header className="pat-header">
        <div className="pat-brand">
          {/* <div className="pat-logo">
            <img src={Logo} alt="DoorMeds Logo" />
          </div> */}
          <h2 className="pat-title">Patients</h2>
        </div>

        <div className="pat-controls">
          <input
            className="pat-search"
            placeholder="Search patients by name, ID, phone"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            aria-label="Search patients"
          />
          <button className="pat-btn primary" onClick={handleToggleAddForm}>{showAddForm ? "Cancel" : "+ New Patient"}</button>
        </div>
      </header>

      {showAddForm && (
        <section className="pat-add-form">
          <h2>Add Patient</h2>
          <form onSubmit={handleAddPatient}>
            <div className="form-grid">
              <label>
                Name
                <input name="name" value={newPatient.name} onChange={handleNewPatientChange} placeholder="Patient name" />
              </label>
              <label>
                Age
                <input name="age" type="number" min="0" value={newPatient.age} onChange={handleNewPatientChange} />
              </label>
              <label>
                Gender
                <select name="gender" value={newPatient.gender} onChange={handleNewPatientChange}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Phone
                <input name="phone" value={newPatient.phone} onChange={handleNewPatientChange} placeholder="+91 ..." />
              </label>
              <label>
                Email
                <input name="email" type="email" value={newPatient.email} onChange={handleNewPatientChange} placeholder="patient@email.com" />
              </label>
              <label>
                Prescriptions
                <input name="prescriptions" type="number" min="0" value={newPatient.prescriptions} onChange={handleNewPatientChange} />
              </label>
              <label>
                Last visit
                <input name="lastVisit" type="date" value={newPatient.lastVisit} onChange={handleNewPatientChange} />
              </label>
              <label className="full-width">
                Notes
                <textarea name="notes" value={newPatient.notes} onChange={handleNewPatientChange} placeholder="Patient notes" />
              </label>
            </div>
            <button type="submit" className="pat-btn primary">Save patient</button>
          </form>
        </section>
      )}

      <main className="pat-main">
        <section className="pat-list">
          <div className="pat-table-wrap">
            <table className="pat-table" role="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Prescriptions</th>
                  <th>Last Visit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p) => (
                  <tr key={p.id} onClick={() => { setSelected(p); setEditingPatient(null); }}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.phone}</td>
                    <td>{p.email}</td>
                    <td>{p.prescriptions}</td>
                    <td>{p.lastVisit}</td>
                    <td>
                      <button className="small" onClick={(e) => { e.stopPropagation(); setSelected(p); setEditingPatient(null); }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty">No patients found.</div>}
          </div>

          <div className="pat-pagination">
            <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <div className="page-info">Page {page} of {totalPages}</div>
            <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        </section>

        <aside className="pat-side">
          <div className="side-card">
            <h4>Patient Details</h4>
            {selected ? (
              <>
                <div className="detail-row"><strong>ID:</strong> {selected.id}</div>
                <div className="detail-row"><strong>Name:</strong> {selected.name}</div>
                <div className="detail-row"><strong>Age:</strong> {selected.age}</div>
                <div className="detail-row"><strong>Gender:</strong> {selected.gender}</div>
                <div className="detail-row"><strong>Phone:</strong> {selected.phone}</div>
                <div className="detail-row"><strong>Email:</strong> {selected.email}</div>
                <div className="detail-row"><strong>Prescriptions:</strong> {selected.prescriptions}</div>
                <div className="detail-row"><strong>Last Visit:</strong> {selected.lastVisit}</div>
                <div className="detail-row"><strong>Notes:</strong> {selected.notes}</div>
                {editingPatient && editingPatient.id === selected.id ? (
                  <form onSubmit={handleSavePatient} className="edit-patient-form">
                    <div className="form-grid">
                      <label>
                        Name
                        <input name="name" value={editingPatient.name} onChange={handleEditPatientChange} />
                      </label>
                      <label>
                        Age
                        <input name="age" type="number" min="0" value={editingPatient.age} onChange={handleEditPatientChange} />
                      </label>
                      <label>
                        Gender
                        <select name="gender" value={editingPatient.gender} onChange={handleEditPatientChange}>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                      <label>
                        Phone
                        <input name="phone" value={editingPatient.phone} onChange={handleEditPatientChange} />
                      </label>
                      <label>
                        Email
                        <input name="email" type="email" value={editingPatient.email} onChange={handleEditPatientChange} />
                      </label>
                      <label>
                        Prescriptions
                        <input name="prescriptions" type="number" min="0" value={editingPatient.prescriptions} onChange={handleEditPatientChange} />
                      </label>
                      <label>
                        Last visit
                        <input name="lastVisit" type="date" value={editingPatient.lastVisit} onChange={handleEditPatientChange} />
                      </label>
                      <label className="full-width">
                        Notes
                        <textarea name="notes" value={editingPatient.notes} onChange={handleEditPatientChange} />
                      </label>
                    </div>
                    <div className="side-actions">
                      <button type="submit" className="pat-btn primary">Save changes</button>
                      <button type="button" className="pat-btn ghost" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="side-actions">
                    <button className="pat-btn primary" onClick={handleEditClick}>Edit</button>
                    <button className="pat-btn ghost" onClick={() => setSelected(null)}>Close</button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty">Select a patient to view details.</div>
            )}
          </div>

          <div className="side-card">
            <h4>Quick Stats</h4>
            <div className="stats-grid">
              <div>
                <div className="stat-label">Total Patients</div>
                <div className="stat-value">{patients.length}</div>
              </div>
              <div>
                <div className="stat-label">Recent Visits</div>
                <div className="stat-value">{patients.filter(p => new Date(p.lastVisit) >= new Date("2026-04-25")).length}</div>
              </div>
              <div>
                <div className="stat-label">Prescriptions</div>
                <div className="stat-value">{patients.reduce((s, p) => s + p.prescriptions, 0)}</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
