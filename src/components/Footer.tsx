import logo from "../assets/Bakanlık-logo.png";

function Footer() {
  return (
    <footer style={styles.footer}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <p>© 2025 Adalet Bakanlığı - Tayin Uygulaması</p>
    </footer>
  );
}

import type { CSSProperties } from "react";

const styles: { footer: CSSProperties; logo: CSSProperties } = {
  footer: {
    width: "100%",
    backgroundColor: "#800000",
    color: "#fff",
    textAlign: "center",
    padding: "15px 0",        
  },
  logo: {
    maxHeight: "40px",
    marginBottom: "10px",
  },
};

export default Footer;
