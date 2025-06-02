import { Link } from "react-router-dom";
import { useUser } from "../features/UserContext";
import { useState } from "react";

type UserType = {
  Ad: string;
  Soyad: string;
  SicilNo: string;
  Unvan: string;
};

function Menu() {
  const user = useUser() as UserType | null;
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const menuItemStyle = {
    position: "relative" as const,
  };

  const dropdownStyle = {
    position: "absolute" as const,
    top: "calc(100% + 10px)",
    left: 0,
    backgroundColor: "#fff",
    minWidth: "180px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "10px 0",
    borderRadius: "4px",
    zIndex: 1000,
  };

  const dropdownItemStyle = {
    padding: "12px 16px",
    textDecoration: "none",
    display: "block",
    color: "#000",
    fontWeight: 500,
    fontSize: "14px",
    transition: "color 0.3s",
  };

  const dividerStyle = {
    borderTop: "1px solid #e0e0e0",
    margin: "8px 15px",
  };

  return (
    <nav style={styles.menu}>
      <div style={styles.leftSection}>
        <div
          style={menuItemStyle}
          onMouseEnter={() => setHoveredMenu("basvuru")}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <span style={styles.link}>Başvuru İşlemleri</span>
          {hoveredMenu === "basvuru" && (
            <div style={dropdownStyle}>
              <Link to="/new-request" style={dropdownItemStyle}>Yeni Başvuru</Link>
              <div style={dividerStyle} />
              <Link to="/my-requests" style={dropdownItemStyle}>Başvurularım</Link>
            </div>
          )}
        </div>

        <div
          style={menuItemStyle}
          onMouseEnter={() => setHoveredMenu("bilgi")}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <span style={styles.link}>Bilgi Bankası</span>
          {hoveredMenu === "bilgi" && (
            <div style={dropdownStyle}>
              <Link to="/puan-tablosu" style={dropdownItemStyle}>Bölge Puan Tablosu</Link>
              <div style={dividerStyle} />
              <Link to="/munhal-bazli" style={dropdownItemStyle}>Mahal Bazlı Bölge ve Puan Tablosu</Link>
              <div style={dividerStyle} />
              <Link to="/unvana-gore" style={dropdownItemStyle}>Ünvanlara Göre Muhtemel Münhal Durumu</Link>
            </div>
          )}
        </div>

        {user?.Unvan?.toLowerCase() === "admin" && (
          <div
            style={menuItemStyle}
            onMouseEnter={() => setHoveredMenu("yonetici")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <span style={styles.link}>Yönetici İşlemleri</span>
            {hoveredMenu === "yonetici" && (
              <div style={dropdownStyle}>
                <Link to="/admin/tum-talepler" style={dropdownItemStyle}>Tüm Başvurular</Link>
                <div style={dividerStyle} />
                <Link to="/admin/degerlendirilen-talepler" style={dropdownItemStyle}>Değerlendirilen Talepler</Link>
                <div style={dividerStyle} />
                <Link to="/admin/bekleyen-talepler" style={dropdownItemStyle}>Değerlendirilmeyen Talepler</Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.user}>
        {user ? (
          <>
            <p style={styles.userName}>
              <strong>{user.Ad} {user.Soyad}</strong>
            </p>
            <p style={styles.userDetails}>
              <strong>{user.SicilNo}</strong> - <strong>{user.Unvan}</strong>
            </p>
          </>
        ) : (
          <p><strong>Misafir</strong></p>
        )}
      </div>
    </nav>
  );
}

const styles = {
  menu: {
    width: "100%",
    backgroundColor: "#800000",
    padding: "15px 250px",
    boxSizing: "border-box" as const,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
  },
  leftSection: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    position: "relative" as const,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    padding: "8px 12px",
    transition: "background-color 0.3s, color 0.3s",
  },
  user: {
    display: "flex",
    flexDirection: "column" as const,
    textAlign: "right" as const,
    color: "#fff",
  },
  userName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
  },
  userDetails: {
    margin: 0,
    fontSize: "14px",
    color: "#fff",
    fontWeight: "bold",
  },
};

export default Menu;
