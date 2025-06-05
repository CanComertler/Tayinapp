import { useEffect, useState } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import Menu from "../components/Menu";

type TayinTalep = {
  id: string;
  sicilNo?: string;
  adSoyad?: string;
  durum?: string;
};

const BekleyenTalepler = () => {
  const [talepler, setTalepler] = useState<TayinTalep[]>([]);
  const [filter, setFilter] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalepler = async () => {
      const q = query(collection(db, "tayinTalepleri"), where("durum", "==", "Değerlendirilmedi"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TayinTalep[];
      setTalepler(data);
    };

    fetchTalepler();
  }, []);

  const handleDeğerlendir = async (id: string, durum: string) => {
    const taleplerRef = doc(db, "tayinTalepleri", id);
    await updateDoc(taleplerRef, { durum });
    setTalepler(prev => prev.filter(t => t.id !== id));
  };

  const filteredTalepler = talepler.filter(
    t =>
      t.sicilNo?.includes(filter) ||
      t.adSoyad?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Menu />
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f9", padding: 20 }}>
        <div style={styles.container}>
          <h2 style={styles.header}>Bekleyen Tayin Talepleri</h2>

          <input
            type="text"
            placeholder="Sicil No veya Ad Soyad ile filtrele..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={styles.input}
          />

          <div style={styles.tableContainer}>
            <div style={styles.tableHeader}>
              <span style={styles.th}>Ad Soyad</span>
              <span style={styles.th}>Sicil No</span>
              <span style={styles.th}>İşlem</span>
            </div>

            {filteredTalepler.map(t => (
              <div
                key={t.id}
                style={{
                  ...styles.tableRow,
                  backgroundColor: hoveredId === t.id ? "#fffbeb" : "#fff",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span style={styles.td}>{t.adSoyad}</span>
                <span style={styles.td}>{t.sicilNo}</span>
                <span style={{ ...styles.td, display: "flex", gap: 10 }}>
                  <button
                    style={{ ...styles.button, backgroundColor: "#28a745" }}
                    onClick={() => handleDeğerlendir(t.id, "Kabul Edildi")}
                  >
                    Kabul Et
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: "#dc3545" }}
                    onClick={() => handleDeğerlendir(t.id, "Reddedildi")}
                  >
                    Reddet
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 30,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    borderRadius: 8,
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
    alignItems: "center",
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
  button: {
    padding: "6px 12px",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    transition: "background-color 0.3s ease",
  },
};

export default BekleyenTalepler;
