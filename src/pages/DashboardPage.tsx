import { useContext } from "react";
import { UserContext } from "../features/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

import Menu from "../components/Menu";
import Footer from "../components/Footer";
import background from "../assets/header-back.png";


function DashboardPage() {
  const user = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
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
          padding: "20px",
          height: "60vh",
          backgroundColor: "rgba(167, 166, 166, 0.62)",
          
        }}
      >
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",            
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 10px 10px 10px rgba(20, 19, 19, 0.9)",
            maxWidth: "420px",         
            width: "100%",
            boxSizing: "border-box",
            color: "black",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Hoş Geldin <br />
            {user?.Ad} {user?.Soyad}
          </h1>

          <button
            onClick={handleSignOut}
            style={{
              padding: "10px 15px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              border: "2px solid rgb(3, 3, 3)",
              borderRadius: "20px",
              cursor: "pointer",
              minWidth: "120px",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#800000";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "black";
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DashboardPage;
