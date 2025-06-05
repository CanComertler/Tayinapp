import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Menu from "../components/Menu";

const styles = {
  container: {
    maxWidth: 1250,
    margin: "0 auto",
    paddingTop: 24,
    
    paddingLeft: 24,
    paddingRight: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    boxSizing: "border-box" as const,
  },

  title: {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 24,
    borderBottom: "4px solid #ca8a04",
    paddingBottom: 12,
    color: "#111827",
  },
  tableWrapper: {
    overflowX: "auto" as const,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "#fff",
  },
  thead: {
    backgroundColor: "#800000",
    borderBottom: "2px solid #800000",
    position: "sticky" as const,
    top: 0,
    zIndex: 10,
    color: "#ffffff",
  },
  th: {
    textAlign: "left" as const,
    padding: "16px 24px",
    fontWeight: 400,
    whiteSpace: "nowrap" as const,
  },
  tbody: {},
  tr: {
    borderBottom: "1px solid #e5e7eb",
    transition: "background-color 0.2s ease",
  },
  trHover: {
    backgroundColor: "#fffbeb",
  },
  td: {
    padding: "12px 24px",
    whiteSpace: "nowrap" as const,
    fontWeight: 400,
  },
  tdName: {
    color: "#1f2937",
    fontWeight: 600,
    maxWidth: 150,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tercihlerList: {
    maxWidth: 300,
    maxHeight: 112,
    overflowY: "auto" as const,
    paddingRight: 8,
    margin: 0,
  },
  tercihlerItem: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap" as const,
  },
  statusAccepted: {
    color: "#15803d",
    fontWeight: 600,
  },
  statusRejected: {
    color: "#b91c1c",
    fontWeight: 600,
  },
  statusPending: {
    color: "#ca8a04",
    fontWeight: 600,
  },
  message: {
    padding: 24,
    textAlign: "center" as const,
  },
  messageError: {
    color: "#b91c1c",
    fontWeight: 600,
  },
  messageEmpty: {
    color: "#6b7280",
  },
};

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else {
        setUserId(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return;
      const q = query(
        collection(db, "tayinTalepleri"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, [userId]);

  const renderStatus = (status?: string) => {
    switch (status) {
      case "accepted":
        return <span style={styles.statusAccepted}>TALEP KABUL EDİLDİ</span>;
      case "rejected":
        return <span style={styles.statusRejected}>TALEP KABUL EDİLMEDİ</span>;
      default:
        return <span style={styles.statusPending}>BEKLEMEDE</span>;
    }
  };

  if (loading)
    return <p style={{ ...styles.message, color: "#6b7280" }}>YÜKLENİYOR...</p>;
  if (!userId)
    return (
      <p style={{ ...styles.message, ...styles.messageError }}>
        LÜTFEN GİRİŞ YAPINIZ.
      </p>
    );
  if (requests.length === 0)
    return (
      <p style={{ ...styles.message, ...styles.messageEmpty }}>
        HİÇ TAYİN TALEBİNİZ YOK.
      </p>
    );

  return (
    <>
      <Menu />
      <div style={styles.container}>
        <h2 style={styles.title}>TAYİN TALEPLERİM</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>AD SOYAD</th>
                <th style={styles.th}>GÖREV YERİ</th>
                <th style={styles.th}>ÜNVAN</th>
                <th style={styles.th}>SİCİL NO</th>
                <th style={{ ...styles.th, maxWidth: 300 }}>TERCİHLER</th>
                <th style={styles.th}>BAŞVURU TARİHİ</th>
                <th style={styles.th}>DURUM</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr
                  key={r.id}
                  style={
                    hoveredRow === r.id
                      ? { ...styles.tr, ...styles.trHover }
                      : styles.tr
                  }
                  onMouseEnter={() => setHoveredRow(r.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={{ ...styles.td, ...styles.tdName }}>
                    {r.adSoyad?.toString().toUpperCase()}
                  </td>
                  <td style={styles.td}>
                    {r.gorevYeri?.toString().toUpperCase()}
                  </td>
                  <td style={styles.td}>{r.unvan?.toString().toUpperCase()}</td>
                  <td style={styles.td}>
                    {r.sicilNo?.toString().toUpperCase()}
                  </td>
                  <td style={{ ...styles.td, maxWidth: 300 }}>
                    {r.tercihler?.length ? (
                      <ol style={styles.tercihlerList}>
                        {r.tercihler.slice(0, 5).map((t: string, i: number) => (
                          <li key={i} style={styles.tercihlerItem} title={t}>
                            {t.toString().toUpperCase()}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <span style={{ fontStyle: "italic", color: "#9ca3af" }}>
                        YOK
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {r.timestamp
                      ? r.timestamp
                          .toDate()
                          .toLocaleDateString("tr-TR")
                          .toUpperCase()
                      : "BİLİNMİYOR"}
                  </td>
                  <td style={styles.td}>{renderStatus(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
