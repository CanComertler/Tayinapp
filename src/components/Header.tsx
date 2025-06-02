import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router";
import logo from "../assets/Bakanlık-logo.png";
import background from "../assets/header-back.png";

const Header = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const navigate = useNavigate();

  const getIconStyle = (iconName: string) => ({
    cursor: "pointer",
    border: hoveredIcon === iconName ? "2px solid white" : "2px solid grey",
    padding: "5px",
    borderRadius: "12px",
    backgroundColor: hoveredIcon === iconName ? "#800000" : "transparent",
    color: hoveredIcon === iconName ? "white" : "black",
    transition: "all 0.3s ease",
  });

  return (
    <>
      <header
        style={{
          width: "100%",
          padding: "10px 250px",
          boxSizing: "border-box",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          backgroundImage: `url(${background})`,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          height: "auto",
          minHeight: "120px",
        }}
      >
        <img
          src={logo}
          alt="Bakanlık Logo"
          style={{ height: "auto", maxHeight: "120px", cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        />

        <div style={{ color: "black", fontSize: "48px" }}> Personel Genel Müdürlüğü</div>

        <div style={{ display: "flex", gap: "15px", fontSize: "28px", color: "grey" }}>
          <FaFacebookF
            style={getIconStyle("facebook")}
            onMouseEnter={() => setHoveredIcon("facebook")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
          <FaTwitter
            style={getIconStyle("twitter")}
            onMouseEnter={() => setHoveredIcon("twitter")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
          <FaInstagram
            style={getIconStyle("instagram")}
            onMouseEnter={() => setHoveredIcon("instagram")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
        </div>
      </header>

      <div style={{ height: "120px" }} />
    </>
  );
};

export default Header;