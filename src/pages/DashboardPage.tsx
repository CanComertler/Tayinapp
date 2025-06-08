import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useUser } from "../features/UserContext";

import Menu from "../components/Menu";

function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  };

  return (
    <>
      <Menu />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px 20px",
          minHeight: "65vh",
          background: "linear-gradient(to right, #f0f0f0, #dcdcdc)",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
            maxWidth: "600px",
            width: "100%",
            color: "black",
            backdropFilter: "blur(3px)",
          }}
        >
          {user ? (
            <>
              <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "30px", fontSize: "24px" }}>
                Hoş Geldiniz<br />
                <span style={{ fontSize: "26px" }}>
                  {user.Ad} {user.Soyad}
                </span>
              </h2>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "16px", lineHeight: "1.8" }}>
                <li><strong>📛 Unvan:</strong> {user.Unvan}</li>
                <li><strong>📧 E-posta:</strong> {user.eposta}</li>
                <li><strong>🆔 Sicil No:</strong> {user.SicilNo}</li>
                <li><strong>📅 Hizmet Yılı:</strong> {user.HizmetYılı}</li>
                <li><strong>🏛️ Adliye:</strong> {user.GörevYaptığıAdliye}</li>
                <li><strong>⚖️ Mahkeme:</strong> {user.GörevYaptığıMahkeme}</li>
              </ul>
            </>
          ) : (
            <p style={{ textAlign: "center" }}>Kullanıcı verisi yükleniyor...</p>
          )}

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={handleSignOut}
              style={{
                padding: "12px 24px",
                backgroundColor: "#ff4d4d",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#b30000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ff4d4d";
              }}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
