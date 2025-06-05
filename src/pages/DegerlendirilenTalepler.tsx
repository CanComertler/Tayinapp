import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import Menu from "../components/Menu";

type TayinTalep = {
  id: string;
  sicilNo?: string;
  adSoyad?: string;
  durum?: string;
};

const DegerlendirilenTalepler = () => {
  const [talepler, setTalepler] = useState<TayinTalep[]>([]);
  const [filter, setFilter] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);  // hover için state

  useEffect(() => {
    const fetchTalepler = async () => {
      const q = query(
        collection(db, "tayinTalepleri"),
        where("durum", "in", ["Kabul Edildi", "Reddedildi"])
      );
      const querySnapshot = await getDocs(q);
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
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f9", padding: 20 }}>
        <div style={styles.container}>
          <h2 style={styles.header}>Değerlendirilen Tayin Talepleri</h2>

          <input
            type="text"
            placeholder="Sicil No veya Ad Soyad ile filtrele"
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

            {filteredTalepler.length > 0 ? (
              filteredTalepler.map((t) => (
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
                  <span style={styles.td}>{t.durum || "Beklemede"}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: 10, textAlign: "center", color: "#777" }}>
                Filtreye uygun talep bulunamadı.
              </div>
            )}
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
};

export default DegerlendirilenTalepler;
