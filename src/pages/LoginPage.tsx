import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import logo from "../assets/Bakanlık-logo.png";
import loginbackground from "../assets/login-back.jpg";

function LoginPage() {
  const [sicilNo, setSicilNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = `${sicilNo}@adalet.gov.tr`.toLowerCase().trim();
    const passwordTrimmed = password.trim();

    try {
      await signInWithEmailAndPassword(auth, email, passwordTrimmed);
      setError("");
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        backgroundImage: `url(${loginbackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",      
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",      
          padding: "20px",
          width: "100%",
          maxWidth: "420px",
          boxSizing: "border-box",
          
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundImage: `url(${loginbackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "30px",
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0 10px 10px 10px rgba(20, 19, 19, 0.9)",
            color: "black",
          }}
        >
          <img
            src={logo}
            alt="Bakanlık Logo"
            style={{
              display: "block",
              margin: "0 auto 20px",
              maxWidth: "150px",
              height: "auto",
            }}
          />
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Personel Girişi
          </h2>

          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Sicil No
          </label>
          <input
            type="text"
            value={sicilNo}
            onChange={(e) => setSicilNo(e.target.value)}
            required
            placeholder="Sicil No (örn: AB123456)"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid black",
              borderRadius: "4px",
              color: "black",
              backgroundColor: "white",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="******"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid black",
              borderRadius: "4px",
              color: "black",
              backgroundColor: "white",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "10px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              border: "2px solid rgb(3, 3, 3)",
              borderRadius: "20px",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
              width: "auto",
              minWidth: "120px",
            }}
            onMouseOver={(e) => {
              (e.currentTarget.style.backgroundColor = "#800000");
              (e.currentTarget.style.color = "white");
            }}
            onMouseOut={(e) => {
              (e.currentTarget.style.backgroundColor = "white");
              (e.currentTarget.style.color = "black");
            }}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
