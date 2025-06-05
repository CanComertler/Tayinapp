import { useState } from "react";
import { auth, db } from "../../firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Menu from "../components/Menu";
import React from "react";

function NewRequestsPage() {
  const [form, setForm] = useState({
    sicilNo: "",
    adSoyad: "",
    gorevYeri: "",
    unvan: "",
    esAdSoyad: "",
    esTc: "",
    esKurum: "",
    esIlIlce: "",
    esUnvan: "",
    tercihler: ["", "", "", "", ""],
  });

  const [onaylandi, setOnaylandi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === "tercih" && index !== undefined) {
      const updated = [...form.tercihler];
      updated[index] = value;
      setForm({ ...form, tercihler: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onaylandi) {
      alert("Lütfen onay kutusunu işaretleyin.");
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("Kullanıcı bilgisi alınamadı.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "tayinTalepleri"), {
        ...form,
        userId,
        timestamp: Timestamp.now(),
      });
      setSuccessMessage("Başvurunuz başarıyla gönderildi.");
      setForm({
        sicilNo: "",
        adSoyad: "",
        gorevYeri: "",
        unvan: "",
        esAdSoyad: "",
        esTc: "",
        esKurum: "",
        esIlIlce: "",
        esUnvan: "",
        tercihler: ["", "", "", "", ""],
      });
      setOnaylandi(false);
    } catch (err) {
      console.error("Başvuru gönderilemedi:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
      <Menu />
      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px 40px",
          borderRadius: "20px",
          boxShadow: "0 4px 10px rgb(0 0 0 / 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#222",
            fontWeight: "700",
            fontSize: "28px",
          }}
        >
          Tayin Talep Formu
        </h2>

        <form onSubmit={handleSubmit}>
          <section style={{ marginBottom: "25px" }}>
            <h3
              style={{
                borderBottom: "2px solid #800000",
                paddingBottom: "8px",
                color: "#800000",
                fontWeight: "600",
              }}
            >
              TALEP SAHİBİNE AİT BİLGİLER
            </h3>
            <input
              type="text"
              name="sicilNo"
              placeholder="Sicil No"
              value={form.sicilNo}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
            <input
              type="text"
              name="adSoyad"
              placeholder="Adı Soyadı"
              value={form.adSoyad}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
            <input
              type="text"
              name="gorevYeri"
              placeholder="Görev Yeri"
              value={form.gorevYeri}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
            <input
              type="text"
              name="unvan"
              placeholder="Unvanı"
              value={form.unvan}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
          </section>

          <section style={{ marginBottom: "25px" }}>
            <h3
              style={{
                borderBottom: "2px solid #800000",
                paddingBottom: "8px",
                color: "#800000",
                fontWeight: "600",
              }}
            >
              TALEP SAHİBİNİN EŞİNE AİT BİLGİLER
            </h3>
            <input
              type="text"
              name="esAdSoyad"
              placeholder="Eşin Adı Soyadı"
              value={form.esAdSoyad}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
            <input
              type="text"
              name="esTc"
              placeholder="TC Kimlik No"
              value={form.esTc}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
            <input
              type="text"
              name="esKurum"
              placeholder="Görev Yaptığı Kurum"
              value={form.esKurum}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
            <input
              type="text"
              name="esIlIlce"
              placeholder="Görev Yaptığı İl / İlçe"
              value={form.esIlIlce}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
            <input
              type="text"
              name="esUnvan"
              placeholder="Unvanı"
              value={form.esUnvan}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                marginBottom: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                fontWeight: "500",
                boxSizing: "border-box",
                outlineColor: "#800000",
              }}
            />
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h3
              style={{
                borderBottom: "2px solid #800000",
                paddingBottom: "8px",
                color: "#800000",
                fontWeight: "600",
              }}
            >
              ATANMAK İSTENEN YERLER
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {form.tercihler.map((tercih, i) => (
                <React.Fragment key={i}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#555",
                      fontSize: "16px",
                    }}
                  >
                    {i + 1}.
                  </div>
                  <input
                    type="text"
                    name="tercih"
                    placeholder="Atanmak istenen adliye/mahal adı"
                    value={tercih}
                    onChange={(e) => handleChange(e, i)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 15px",
                      marginBottom: "14px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "15px",
                      fontWeight: "500",
                      boxSizing: "border-box",
                      outlineColor: "#800000",
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                fontSize: "14px",
                color: "#444",
              }}
            >
              <input
                type="checkbox"
                checked={onaylandi}
                onChange={() => setOnaylandi(!onaylandi)}
                style={{ width: "18px", height: "18px", marginTop: "4px" }}
              />
              <span>
                Yukarıda vermiş olduğum bilgilerin doğruluğunu, tercihlerimi şahsi
                ve ailevi durumumu göz önünde bulundurarak yaptığımı, atamamın
                yapılması halinde vazgeçme talebimin kabul edilmeyeceğini bildiğimi
                beyan ederim.
              </span>
            </label>
          </section>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#d19999" : "#800000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: loading ? "default" : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
          </button>

          {successMessage && (
            <p
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#800000",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewRequestsPage;
