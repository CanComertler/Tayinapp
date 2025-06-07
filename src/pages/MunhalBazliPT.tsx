import { useState } from "react";
import Menu from "../components/Menu";
import loginbackground from "../assets/login-back.jpg";

const sehirler = [
  "Adana",
  "Ankara",
  "Antalya",
  "Bursa",
  "Diyarbakır",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "İstanbul",
  "İzmir",
  "Kayseri",
  "Konya",
  "Malatya",
  "Mersin",
  "Samsun",
  "Sivas",
  "Tekirdağ",
  "Trabzon",
  "Van",
  "Zonguldak",
  "Kahramanmaraş",
  "Manisa",
  "Ordu",
  "Şanlıurfa",
  "Çanakkale",
];

const puanlar: Record<number, number> = {
  1: 10,
  2: 12,
  3: 14,
  4: 16,
  5: 18,
};

function MunhalBazliPT() {
  const [search, setSearch] = useState("");

  const veri = sehirler.map((sehir) => {
    const bolge = Math.floor(Math.random() * 5) + 1;
    return {
      sehir,
      bolge,
      puan: puanlar[bolge],
    };
  });

  const filtreliVeri = veri.filter((item) =>
    item.sehir.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    container: {
      padding: 40,
      margin: "0 auto",
      textAlign: "center" as const,
      backgroundImage: `url(${loginbackground})`,
      backgroundSize: "cover" as const,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      paddingBottom: 200,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: "bold" as const,
    },
    searchInput: {
      padding: 10,
      width: "100%",
      maxWidth: 300,
      marginBottom: 20,
      borderRadius: 5,
      border: "1px solid black",
      boxSizing: "border-box" as const,
    },
    dataTable: {
      maxWidth: 900,
      width: "100%",
      borderCollapse: "collapse" as const,
      marginTop: 20,
      textAlign: "center" as const,
      margin: "0 auto",
    },
    thTd: {
      border: "1px solid #000",
      padding: 10,
      textAlign: "center" as const,
    },
    th: {
      backgroundColor: "#ddd",
    },
    td: {
      backgroundColor: "#f4f4f4",
    },
  };

  return (
    <>
      <Menu />
      <div style={styles.container}>
        <h2 style={styles.title}>Hizmet Bölgesi ve Puan Tablosu</h2>
        <input
          type="text"
          placeholder="Şehir ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <table style={styles.dataTable}>
          <thead>
            <tr>
              <th style={{ ...styles.thTd, ...styles.th }}>Şehir</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Hizmet Bölgesi</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Hizmet Puanı</th>
            </tr>
          </thead>
          <tbody>
            {filtreliVeri.slice(0, 25).map((item, index) => (
              <tr key={index}>
                <td style={{ ...styles.thTd, ...styles.td }}>{item.sehir}</td>
                <td style={{ ...styles.thTd, ...styles.td }}>
                  {item.bolge}. Bölge
                </td>
                <td style={{ ...styles.thTd, ...styles.td }}>{item.puan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MunhalBazliPT;
