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
    <div className="prof-root">
      <header className="prof-header">
        <div className="prof-brand">
          {/* <div className="prof-logo">
            <img src={Logo} alt="DoorMeds Logo" />
          </div> */}
          <h2 className="prof-title">Profile</h2>
        </div>

        <div className="prof-actions">
          <button className="prof-btn" onClick={() => setEditing((s) => !s)}>{editing ? "Cancel" : "Edit Profile"}</button>
          <button className="prof-btn primary" onClick={saveProfile}>Save</button>
        </div>
      </header>

      <main className="prof-main">
        <div className="card profile-card unified-card">
          <div className="profile-top">
            <div className="avatar-wrap">
              {avatar ? (
                <img src={avatar} alt="avatar" className="avatar-img" />
              ) : (
                <div className="avatar-fallback">{profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
              )}
              <label className="avatar-upload">
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                Upload
              </label>
            </div>

            <div className="profile-meta">
              <div className="profile-name">{profile.name}</div>
              <div className="profile-role">{profile.role}</div>
              <div className="profile-location muted">{profile.location}</div>
            </div>
          </div>

          <div className="profile-body">
            <div className="field">
              <label>Name</label>
              <input name="name" value={profile.name} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="field">
              <label>Email</label>
              <input name="email" value={profile.email} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="field">
              <label>Phone</label>
              <input name="phone" value={profile.phone} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="field">
              <label>Bio</label>
              <textarea name="bio" value={profile.bio} onChange={handleProfileChange} disabled={!editing} />
            </div>
          </div>

          <div className="profile-section">
            <h4>Security</h4>
            <div className="field">
              <label>Current password</label>
              <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="••••••" />
            </div>
            <div className="field">
              <label>New password</label>
              <input type="password" name="newPass" value={passwords.newPass} onChange={handlePasswordChange} placeholder="New password" />
            </div>
            <div className="field">
              <label>Confirm new password</label>
              <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} placeholder="Confirm new password" />
            </div>
            <div className="security-actions">
              <button className="prof-btn" onClick={() => setPasswords({ current: "", newPass: "", confirm: "" })}>Clear</button>
              <button className="prof-btn primary" onClick={updatePassword}>Update Password</button>
            </div>
          </div>

          <div className="profile-section">
            <h4>Notifications</h4>
            <div className="toggle-row">
              <label>Order updates</label>
              <input type="checkbox" checked={notifications.orders} onChange={() => toggleNotification("orders")} />
            </div>
            <div className="toggle-row">
              <label>Inventory alerts</label>
              <input type="checkbox" checked={notifications.inventory} onChange={() => toggleNotification("inventory")} />
            </div>
            <div className="toggle-row">
              <label>Promotions</label>
              <input type="checkbox" checked={notifications.promotions} onChange={() => toggleNotification("promotions")} />
            </div>
            <div className="toggle-row">
              <label>Support messages</label>
              <input type="checkbox" checked={notifications.support} onChange={() => toggleNotification("support")} />
            </div>
          </div>

          <div className="profile-section">
            <h4>Privacy & Preferences</h4>
            <div className="toggle-row">
              <label>Two factor authentication</label>
              <input type="checkbox" checked={privacy.twoFactor} onChange={() => togglePrivacy("twoFactor")} />
            </div>
            <div className="toggle-row">
              <label>Show email on profile</label>
              <input type="checkbox" checked={privacy.showEmail} onChange={() => togglePrivacy("showEmail")} />
            </div>
            <div className="field">
              <label>Language</label>
              <select defaultValue="en">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
          </div>

          <div className="profile-section">
            <h4>Recent Activity</h4>
            <ul className="activity-list">
              {activity.map((a) => (
                <li key={a.id}>
                  <div className="act-text">{a.text}</div>
                  <div className="act-time muted">{a.time}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-section danger-section">
            <h4>Danger Zone</h4>
            <div className="danger-actions">
              <button className="prof-btn ghost">Deactivate account</button>
              <button className="prof-btn danger" onClick={() => alert("Account deletion demo")}>Delete account</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
