import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import Menu from "../components/Menu";

type TayinTalep = {
  id: string;
  sicilNo?: string;
  adSoyad?: string;
  durum?: string;
  unvan?: string;
  gorevYeri?: string;
  esAdSoyad?: string;
  esTc?: string;
  esKurum?: string;
  esUnvan?: string;
  esIlIlce?: string;
  tercihler?: string[];
};

const TumTalepler = () => {
  const [talepler, setTalepler] = useState<TayinTalep[]>([]);
  const [filter, setFilter] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTalep, setSelectedTalep] = useState<TayinTalep | null>(null);

  useEffect(() => {
    const fetchTalepler = async () => {
      const querySnapshot = await getDocs(collection(db, "tayinTalepleri"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TayinTalep[];
      setTalepler(data);
    };

    fetchTalepler();
  }, []);

  const filteredTalepler = talepler.filter(
    (t) =>
      t.sicilNo?.includes(filter) ||
      t.adSoyad?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Menu />
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f9", padding: "20px" }}>
        <div style={styles.container}>
          <h2 style={styles.header}>Tüm Tayin Talepleri</h2>

          <input
            type="text"
            placeholder="Sicil No veya Ad Soyad ile filtrele..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.input}
          />

          <div style={styles.tableContainer}>
            <div style={styles.tableHeader}>
              <span style={styles.th}>Ad Soyad</span>
              <span style={styles.th}>Sicil No</span>
              <span style={styles.th}>Durum</span>
            </div>

            {filteredTalepler.map((t) => (
              <div
                key={t.id}
                style={{
                  ...styles.tableRow,
                  backgroundColor: hoveredId === t.id ? "#fffbeb" : "#fff",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedTalep(t)}
              >
                <span style={styles.td}>{t.adSoyad}</span>
                <span style={styles.td}>{t.sicilNo}</span>
                <span style={styles.td}>{t.durum || "Beklemede"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {selectedTalep && (
  <div style={styles.popupOverlay} onClick={() => setSelectedTalep(null)}>
    <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
      <h3 style={{ marginBottom: 20, color: "#800000" }}>Tayin Talebi Detayı</h3>
      
      <div style={styles.detailRow}><strong>Ad Soyad:</strong><span>{selectedTalep.adSoyad}</span></div>
      <div style={styles.detailRow}><strong>Sicil No:</strong><span>{selectedTalep.sicilNo}</span></div>
      <div style={styles.detailRow}><strong>Unvan:</strong><span>{selectedTalep.unvan}</span></div>
      <div style={styles.detailRow}><strong>Görev Yeri:</strong><span>{selectedTalep.gorevYeri}</span></div>
      <div style={styles.detailRow}><strong>Durum:</strong><span>{selectedTalep.durum}</span></div>

      <div style={{ ...styles.sectionHeader, marginTop: 20 }}>Eş Bilgileri</div>

      <div style={styles.detailRow}><strong>Eş Ad Soyad:</strong><span>{selectedTalep.esAdSoyad}</span></div>
      <div style={styles.detailRow}><strong>Eş TC:</strong><span>{selectedTalep.esTc}</span></div>
      <div style={styles.detailRow}><strong>Eş Kurum:</strong><span>{selectedTalep.esKurum}</span></div>
      <div style={styles.detailRow}><strong>Eş Unvan:</strong><span>{selectedTalep.esUnvan}</span></div>
      <div style={styles.detailRow}><strong>Eş İl/İlçe:</strong><span>{selectedTalep.esIlIlce}</span></div>

      <div style={{ ...styles.sectionHeader, marginTop: 20 }}>Tercihler</div>
      <ul style={styles.preferenceList}>
        {selectedTalep.tercihler?.map((tercih, index) => (
          <li key={index} style={styles.preferenceItem}>• {tercih}</li>
        ))}
      </ul>

      <button onClick={() => setSelectedTalep(null)} style={styles.closeButton}>Kapat</button>
    </div>
  </div>
)}

    </>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    textAlign: "center" as const,
  },
  input: {
    display: "block",
    padding: "10px 15px",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    boxSizing: "border-box" as const,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
  },
  tableContainer: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#800000",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "6px 6px 0 0",
    fontWeight: "bold" as const,
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "10px 15px",
    borderBottom: "1px solid #ccc",
    transition: "background-color 0.3s ease",
  },
  th: {
    flex: 1,
    textAlign: "left" as const,
  },
  td: {
    flex: 1,
    textAlign: "left" as const,
    color: "#333",
  },
  popupOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto" as const,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#800000",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold" as const,
    transition: "background-color 0.3s ease",
    display: "block" as const,
    width: "100%",
    textAlign: "center" as const,
  },
  detailRow: {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #800000",
  fontSize: "16px",
  color: "#333",
},

sectionHeader: {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#800000",
  borderBottom: "2px solid #800000",
  paddingBottom: 5,
  marginBottom: 10,
},

preferenceList: {
  listStyleType: "none",
  paddingLeft: 0,
},

preferenceItem: {
  padding: "5px 0",
  borderBottom: "1px dashed #800000",
  color: "#333",
},
};

export default TumTalepler;
