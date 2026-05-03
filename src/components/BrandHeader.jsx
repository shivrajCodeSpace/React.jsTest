import Logo from "../assets/logo.png";
import "./BrandHeader.css";

export default function BrandHeader({ tagline = "Secure pharmacy access", showTagline = true, labelClass = "brand" }) {
  return (
    <div className="brand-header">
      <div className="dm-logo">
        <img src={Logo} alt="DoorMeds Logo" />
      </div>
      <div className={labelClass === "brand" ? "brand-heading" : "brand-heading"}>
        <span className={`brand-name ${labelClass}`}>DoorMeds</span>
        {showTagline && <span className="brand-tag">{tagline}</span>}
      </div>
    </div>
  );
}
