// Profile.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Logo from "./logo.png"; // replace with your logo path
import "./profile.css";

export default function ProfilePage({ onlineStatus = true, setOnlineStatus = () => {}, displayName = "Pritam Biswas", setDisplayName = () => {} }) {
  const [profile, setProfile] = useState(() => {
    const [firstName, ...rest] = displayName.split(" ");
    return {
      firstName: firstName || "Pritam",
      lastName: rest.join(" ") || "Biswas",
      email: "pritam@example.com",
      phone: "+91 90000 11111",
      role: "Pharmacy Manager",
      location: "Agartala, India",
      bio: "Managing DoorMeds pharmacy operations and inventory.",
      city: "Agartala",
      state: "Tripura",
      postcode: "799001",
      country: "India",
    };
  });
  const profileFullName = `${profile.firstName} ${profile.lastName}`.trim();
  const profileLocation = [profile.city, profile.state, profile.country].filter(Boolean).join(", ");

  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    orders: true,
    inventory: true,
    promotions: false,
    support: true,
  });
  const [privacy, setPrivacy] = useState({ twoFactor: false, showEmail: true });
  const [documents, setDocuments] = useState([
    { id: "employee", title: "Employee contract", filename: "Employee contract.pdf", verifiedAt: "2026-05-02 14:30" },
    { id: "pharmacy", title: "Pharmacy license", filename: "Pharmacy license.pdf", verifiedAt: "2026-04-18 09:20" },
    { id: "insurance", title: "Insurance policy", filename: "Insurance policy.pdf", verifiedAt: "2026-04-27 11:45" },
  ]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [newDocumentType, setNewDocumentType] = useState("employee");
  const selectedDocument = documents.find((doc) => doc.id === selectedDocumentId) || null;
  const documentTemplates = {
    employee: {
      id: "employee",
      title: "Employee contract",
      filename: "Employee contract.pdf",
      verifiedAt: "2026-05-02 14:30",
    },
    pharmacy: {
      id: "pharmacy",
      title: "Pharmacy license",
      filename: "Pharmacy license.pdf",
      verifiedAt: "2026-04-18 09:20",
    },
    insurance: {
      id: "insurance",
      title: "Insurance policy",
      filename: "Insurance policy.pdf",
      verifiedAt: "2026-04-27 11:45",
    },
  };
  const [activity] = useState([
    { id: 1, text: "Approved prescription #ORD-1004", time: "2026-04-24 10:12" },
    { id: 2, text: "Restocked Paracetamol 650mg (+200)", time: "2026-04-23 15:04" },
    { id: 3, text: "Marked order ORD-1002 as Shipped", time: "2026-04-22 09:30" },
  ]);

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  }

  function refreshProfileData() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfile((p) => {
      const updated = { ...p, [name]: value };
      if (name === "firstName" || name === "lastName") {
        setDisplayName(`${updated.firstName || ""} ${updated.lastName || ""}`.trim());
      }
      return updated;
    });
  }

  function saveProfile() {
    setEditing(false);
    // integrate API save here
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswords((p) => ({ ...p, [name]: value }));
  }

  function updatePassword() {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwords.newPass.length < 6 || passwords.newPass.length > 18) {
      alert("New password must be between 6 and 18 characters.");
      return;
    }

    if (passwords.newPass !== passwords.confirm) {
      alert("New password and confirmation do not match.");
      return;
    }

    // call API to update password
    setPasswords({ current: "", newPass: "", confirm: "" });
    alert("Password updated (demo).");
  }

  function toggleNotification(key) {
    setNotifications((n) => ({ ...n, [key]: !n[key] }));
  }

  function togglePrivacy(key) {
    setPrivacy((p) => ({ ...p, [key]: !p[key] }));
  }

  function handleDocumentChange(id, field, value) {
    setDocuments((docs) => docs.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc)));
  }

  function viewDocument(doc) {
    setSelectedDocumentId(doc.id);
  }

  function clearActiveDocument() {
    setSelectedDocumentId(null);
  }

  function addDocument() {
    const template = documentTemplates[newDocumentType];
    if (!template) return;
    if (documents.some((doc) => doc.id === template.id)) {
      alert(`${template.title} is already added.`);
      return;
    }
    setDocuments((docs) => [...docs, template]);
  }

  function renderTabContent() {
    switch (activeTab) {
      case "company":
        return (
          <div className="profile-form-grid">
            <div className="field">
              <label>Company Name</label>
              <input value="DoorMeds Pharmacy" disabled={!editing} />
            </div>
            <div className="field">
              <label>Branch</label>
              <input value="Agartala Branch" disabled={!editing} />
            </div>
            <div className="field">
              <label>Industry</label>
              <input value="Healthcare" disabled={!editing} />
            </div>
            <div className="field">
              <label>Team Size</label>
              <input value="24" disabled={!editing} />
            </div>
            <div className="field">
              <label>Headquarters</label>
              <input value="Agartala, India" disabled={!editing} />
            </div>
          </div>
        );
      case "documents":
        return (
          <div>
            <div className="doc-add-bar">
              <div className="field">
                <label>Add document</label>
                <select value={newDocumentType} onChange={(e) => setNewDocumentType(e.target.value)}>
                  <option value="employee">Employee contract</option>
                  <option value="pharmacy">Pharmacy license</option>
                  <option value="insurance">Insurance policy</option>
                </select>
              </div>
              <button type="button" className="prof-btn primary" onClick={addDocument}>
                Add
              </button>
            </div>

            <div className="profile-documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="doc-row">
                  <div className="doc-info">
                    <label>{doc.title}</label>
                    <input
                      type="text"
                      value={doc.filename}
                      onChange={(e) => handleDocumentChange(doc.id, "filename", e.target.value)}
                    />
                  </div>
                  <div className="doc-info">
                    <label>Verification time</label>
                    <input
                      type="text"
                      value={doc.verifiedAt}
                      onChange={(e) => handleDocumentChange(doc.id, "verifiedAt", e.target.value)}
                    />
                  </div>
                  <div className="doc-actions">
                    <button type="button" className="prof-btn secondary" onClick={() => viewDocument(doc)}>
                      View
                    </button>
                  </div>
                </div>
              ))}

              {selectedDocument && (
                <div className="doc-detail-panel">
                  <div className="doc-detail-header">
                    <h3>{selectedDocument.title}</h3>
                    <button type="button" className="prof-btn" onClick={clearActiveDocument}>
                      Close
                    </button>
                  </div>
                  <div className="doc-detail-body">
                    <div className="field">
                      <label>File Name</label>
                      <input type="text" value={selectedDocument.filename} readOnly />
                    </div>
                    <div className="field">
                      <label>Verified at</label>
                      <input type="text" value={selectedDocument.verifiedAt} readOnly />
                    </div>
                    <div className="field">
                      <label>Document description</label>
                      <textarea value={`Full details for ${selectedDocument.title}. You can update the filename or verification time above.`} readOnly />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "billing":
        return (
          <div className="profile-billing">
            <div className="field">
              <label>Card holder</label>
              <input value="Pritam Biswas" disabled />
            </div>
            <div className="field">
              <label>Card number</label>
              <input value="**** **** **** 1234" disabled />
            </div>
            <div className="field">
              <label>Expiry</label>
              <input value="12/27" disabled />
            </div>
            <div className="field">
              <label>Billing email</label>
              <input value={profile.email} disabled />
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="profile-notifications-panel">
            <div className="toggle-row">
              <span>Order updates</span>
              <input type="checkbox" checked={notifications.orders} onChange={() => toggleNotification("orders")} />
            </div>
            <div className="toggle-row">
              <span>Inventory alerts</span>
              <input type="checkbox" checked={notifications.inventory} onChange={() => toggleNotification("inventory")} />
            </div>
            <div className="toggle-row">
              <span>Promotional emails</span>
              <input type="checkbox" checked={notifications.promotions} onChange={() => toggleNotification("promotions")} />
            </div>
            <div className="toggle-row">
              <span>Support messages</span>
              <input type="checkbox" checked={notifications.support} onChange={() => toggleNotification("support")} />
            </div>
          </div>
        );
      case "account":
      default:
        return (
          <div className="profile-form-grid">
            <div className="field">
              <label>First Name</label>
              <input name="firstName" value={profile.firstName} onChange={handleProfileChange} disabled={!editing} />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input name="lastName" value={profile.lastName} onChange={handleProfileChange} disabled={!editing} />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input name="phone" value={profile.phone} onChange={handleProfileChange} disabled={!editing} />
            </div>
            <div className="field">
              <label>Email address</label>
              <input name="email" value={profile.email} onChange={handleProfileChange} disabled={!editing} />
            </div>
            <div className="field">
              <label>City</label>
              <input name="city" value={profile.city} onChange={handleProfileChange} disabled={!editing} />
            </div>
            <div className="field">
              <label>State / County</label>
              <input name="state" value={profile.state} onChange={handleProfileChange} disabled={!editing} />
            </div>
            <div className="field">
              <label>Postcode</label>
              <input name="postcode" value={profile.postcode} onChange={handleProfileChange} disabled={!editing} />
            </div>
            <div className="field">
              <label>Country</label>
              <input name="country" value={profile.country} onChange={handleProfileChange} disabled={!editing} />
            </div>
          </div>
        );
    }
  }

  if (isLoading) {
    return (
      <div className="profile-loading-screen">
        <div className="profile-loading-card">
          <div className="refresh-icon spinning">↻</div>
          <h2>Loading profile data...</h2>
          <p>Waiting for server data. If it takes too long, tap refresh.</p>
          <button className="prof-btn primary" onClick={refreshProfileData}>
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <div>
          <h1>Profile</h1>
          <p className="profile-subtitle">Review and update your account details, security settings, and profile information.</p>
        </div>

        <div className="profile-page-actions">
          <button className="prof-btn" onClick={() => setEditing((s) => !s)}>{editing ? "Cancel" : "Edit Profile"}</button>
          <button className="prof-btn secondary refresh-button" onClick={refreshProfileData} disabled={isLoading}>
            <span className="refresh-button-icon">↻</span>
            Refresh
          </button>
          <div className={`profile-status-pill ${onlineStatus ? "online" : "offline"}`}>
            <span className="profile-status-dot" />
            {onlineStatus ? "Online" : "Offline"}
          </div>
          <button className={`prof-btn profile-status-button ${onlineStatus ? "secondary" : "primary"}`} onClick={() => setOnlineStatus((value) => !value)}>
            {onlineStatus ? "Go Offline" : "Go Online"}
          </button>
          <button className="prof-btn primary" onClick={saveProfile}>Save</button>
        </div>
      </div>

      <div className="profile-grid">
        <aside className="profile-summary card">
          <div className="profile-summary-top">
            <div className="avatar-wrap">
              {avatar ? (
                <img src={avatar} alt="avatar" className="avatar-img" />
              ) : (
                <div className="avatar-fallback">{profileFullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
              )}
            </div>
            <div className="profile-meta">
              <div className="profile-name">{profileFullName}</div>
              <div className="profile-role">{profile.role}</div>
              <div className="profile-location">{profileLocation || profile.location}</div>
            </div>
          </div>

          <div className="profile-summary-body">
            <button className="avatar-upload">
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              Upload photo
            </button>
            <div className="profile-stats">
              <div>
                <span>32</span>
                <p>Opportunities applied</p>
              </div>
              <div>
                <span>26</span>
                <p>Opportunities won</p>
              </div>
              <div>
                <span>6</span>
                <p>Current opportunities</p>
              </div>
            </div>
            <div className="profile-summary-footer">
              <button className="link-btn">View Public Profile</button>
              <div className="profile-url">https://door.../pritam</div>
            </div>
          </div>
        </aside>

        <div className="profile-main-panel">
          <section className="profile-panel card">
            <div className="profile-panel-tabs">
              <button className={`tab ${activeTab === "account" ? "active" : ""}`} onClick={() => setActiveTab("account")}>Account Settings</button>
              <button className={`tab ${activeTab === "company" ? "active" : ""}`} onClick={() => setActiveTab("company")}>Company Settings</button>
              <button className={`tab ${activeTab === "documents" ? "active" : ""}`} onClick={() => setActiveTab("documents")}>Documents</button>
              <button className={`tab ${activeTab === "billing" ? "active" : ""}`} onClick={() => setActiveTab("billing")}>Billing</button>
              <button className={`tab ${activeTab === "notifications" ? "active" : ""}`} onClick={() => setActiveTab("notifications")}>Notifications</button>
            </div>

            <div className="profile-tab-panel">
              {renderTabContent()}
            </div>

            {activeTab === "account" && (
              <div className="profile-panel-actions">
                <button className="prof-btn primary" onClick={saveProfile}>Update</button>
              </div>
            )}
          </section>

          <section className="profile-secondary-grid">
            <div className="card mini-card">
              <h4>Security</h4>
              <div className="field password-field">
                <label>Current password</label>
                <div className="password-wrapper">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    placeholder="••••••"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword((current) => !current)}
                    aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="field password-field">
                <label>New password</label>
                <div className="password-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPass"
                    value={passwords.newPass}
                    onChange={handlePasswordChange}
                    placeholder="New password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword((current) => !current)}
                    aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button className="prof-btn secondary" onClick={updatePassword}>Update Password</button>
            </div>

            <div className="card mini-card">
              <h4>Notifications</h4>
              <div className="toggle-row">
                <span>Order updates</span>
                <input type="checkbox" checked={notifications.orders} onChange={() => toggleNotification("orders")} />
              </div>
              <div className="toggle-row">
                <span>Inventory alerts</span>
                <input type="checkbox" checked={notifications.inventory} onChange={() => toggleNotification("inventory")} />
              </div>
              <div className="toggle-row">
                <span>Support messages</span>
                <input type="checkbox" checked={notifications.support} onChange={() => toggleNotification("support")} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
