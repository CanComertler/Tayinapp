import React, { useState } from "react";
import { auth, db } from "../../firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Menu from "../components/Menu";

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

  const ADLIYELER = [
    "Antalya Adliyesi",
    "Kemer Adliyesi",
    "Korkuteli Adliyesi",
    "Tarsus Adliyesi",
    "Mersin Adliyesi",
    "Silifke Adliyesi",
    "Isparta Adliyesi",
    "Burdur Adliyesi",
    "Bucak Adliyesi",
    "İzmir Adliyesi",
    "İstanbul Adliyesi",
    "Trabzon Adliyesi",
    "Ankara Adliyesi",
    "Çankaya Adliyesi",
    "Adana Adliyesi",
  ];

  const [onaylandi, setOnaylandi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "esTc") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 11) return;
    }

    if (name === "tercih" && index !== undefined) {
      const updatedTercihler = [...form.tercihler];
      updatedTercihler[index] = value;
      setForm({ ...form, tercihler: updatedTercihler });
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
        durum: "Değerlendirilmedi",
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

  // Placeholder'lar burada tanımlı
  const placeholders: Record<string, string> = {
    sicilNo: "Sicil No Giriniz",
    adSoyad: "Ad Soyad Giriniz",
    gorevYeri: "Görev Yerini Giriniz",
    unvan: "Ünvan Giriniz",
    esAdSoyad: "Adı Soyadı",
    esTc: "T.C. Kimlik No",
    esKurum: "Görev Yaptığı Kurum",
    esIlIlce: "Görev Yaptığı İl / İlçe",
    esUnvan: "Unvanı",
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

        {successMessage && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px 15px",
              marginBottom: "20px",
              borderRadius: "8px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <section style={{ marginBottom: "25px" }}>
            <h3 style={sectionTitleStyle}>TALEP SAHİBİNE AİT BİLGİLER</h3>

            {["sicilNo", "adSoyad", "gorevYeri", "unvan"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={placeholders[field] || ""}
                value={form[field as keyof typeof form] as string}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            ))}
          </section>

          <section style={{ marginBottom: "25px" }}>
            <h3 style={sectionTitleStyle}>
              TALEP SAHİBİNİN EŞİNE AİT BİLGİLER
            </h3>
            {[
              "esAdSoyad",
              "esTc",
              "esKurum",
              "esIlIlce",
              "esUnvan",
            ].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={placeholders[field] || ""}
                value={form[field as keyof typeof form] as string}
                onChange={handleChange}
                style={inputStyle}
              />
            ))}
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>ATANMAK İSTENEN ADLİYELER</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {form.tercihler.map((tercih, index) => (
                <React.Fragment key={index}>
                  <span
                    style={{
                      color: "#800000",
                      fontWeight: "600",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </span>
                  <select
                    name="tercih"
                    value={tercih}
                    onChange={(e) => handleChange(e, index)}
                    style={{
                      ...inputStyle,
                      paddingRight: "30px",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      cursor: "pointer",
                    }}
                    required={index === 0}
                  >
                    <option value="">Lütfen seçiniz</option>
                    {ADLIYELER.map((adliye) => (
                      <option key={adliye} value={adliye}>
                        {adliye}
                      </option>
                    ))}
                  </select>
                </React.Fragment>
              ))}
            </div>
          </section>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={onaylandi}
                onChange={(e) => setOnaylandi(e.target.checked)}
              />
              Bilgilerimi doğru şekilde doldurdum ve onaylıyorum.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#800000",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Gönderiliyor..." : "Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: 14,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 15,
  fontWeight: 500,
  boxSizing: "border-box",
  outlineColor: "#800000",
};

const sectionTitleStyle = {
  borderBottom: "2px solid #800000",
  paddingBottom: "8px",
  color: "#800000",
  fontWeight: "600",
  marginBottom: "14px",
};

export default NewRequestsPage;
