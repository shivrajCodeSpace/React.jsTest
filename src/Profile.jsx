// Profile.jsx
import React, { useState } from "react";
// import Logo from "./logo.png"; // replace with your logo path
import "./profile.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Pritam Biswas",
    email: "pritam@example.com",
    phone: "+91 90000 11111",
    role: "Pharmacy Manager",
    location: "Agartala, India",
    bio: "Managing DoorMeds pharmacy operations and inventory.",
  });

  const [avatar, setAvatar] = useState(null);
  const [editing, setEditing] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [notifications, setNotifications] = useState({
    orders: true,
    inventory: true,
    promotions: false,
    support: true,
  });
  const [privacy, setPrivacy] = useState({ twoFactor: false, showEmail: true });
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

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
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

  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <div>
          <h1>Profile</h1>
          <p className="profile-subtitle">Review and update your account details, security settings, and profile information.</p>
        </div>

        <div className="profile-page-actions">
          <button className="prof-btn" onClick={() => setEditing((s) => !s)}>{editing ? "Cancel" : "Edit Profile"}</button>
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
                <div className="avatar-fallback">{profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
              )}
            </div>
            <div className="profile-meta">
              <div className="profile-name">{profile.name}</div>
              <div className="profile-role">{profile.role}</div>
              <div className="profile-location">{profile.location}</div>
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
              <button className="tab active">Account Settings</button>
              <button className="tab">Company Settings</button>
              <button className="tab">Documents</button>
              <button className="tab">Billing</button>
              <button className="tab">Notifications</button>
            </div>

            <div className="profile-form-grid">
              <div className="field">
                <label>First Name</label>
                <input name="name" value={profile.name.split(" ")[0]} onChange={handleProfileChange} disabled={!editing} />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input name="lastName" value={profile.name.split(" ")[1] || ""} onChange={handleProfileChange} disabled={!editing} />
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
                <input name="city" value={profile.city || "Agartala"} onChange={handleProfileChange} disabled={!editing} />
              </div>
              <div className="field">
                <label>State / County</label>
                <input name="state" value={profile.state || "Tripura"} onChange={handleProfileChange} disabled={!editing} />
              </div>
              <div className="field">
                <label>Postcode</label>
                <input name="postcode" value={profile.postcode || "799001"} onChange={handleProfileChange} disabled={!editing} />
              </div>
              <div className="field">
                <label>Country</label>
                <input name="country" value={profile.country || "India"} onChange={handleProfileChange} disabled={!editing} />
              </div>
            </div>

            <div className="profile-panel-actions">
              <button className="prof-btn primary" onClick={saveProfile}>Update</button>
            </div>
          </section>

          <section className="profile-secondary-grid">
            <div className="card mini-card">
              <h4>Security</h4>
              <div className="field">
                <label>Current password</label>
                <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="••••••" />
              </div>
              <div className="field">
                <label>New password</label>
                <input type="password" name="newPass" value={passwords.newPass} onChange={handlePasswordChange} placeholder="New password" />
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
