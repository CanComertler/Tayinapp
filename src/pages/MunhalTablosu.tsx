import { useState } from "react";
import Menu from "../components/Menu";
import loginbackground from "../assets/login-back.jpg";

const dummyData = [
  { sehir: "İstanbul", yazı: 5, idari: 3, zabit: 10, mubasir: 6 },
  { sehir: "Ankara", yazı: 2, idari: 1, zabit: 5, mubasir: 3 },
  { sehir: "İzmir", yazı: 3, idari: 2, zabit: 7, mubasir: 4 },
  { sehir: "Antalya", yazı: 1, idari: 0, zabit: 3, mubasir: 2 },
  { sehir: "Bursa", yazı: 4, idari: 1, zabit: 6, mubasir: 3 },
  { sehir: "Konya", yazı: 2, idari: 2, zabit: 5, mubasir: 4 },
  { sehir: "Adana", yazı: 1, idari: 1, zabit: 4, mubasir: 2 },
  { sehir: "Trabzon", yazı: 2, idari: 0, zabit: 3, mubasir: 2 },
  { sehir: "Gaziantep", yazı: 3, idari: 1, zabit: 5, mubasir: 3 },
  { sehir: "Samsun", yazı: 1, idari: 1, zabit: 2, mubasir: 2 },
  { sehir: "Eskişehir", yazı: 2, idari: 1, zabit: 4, mubasir: 2 },
  { sehir: "Erzurum", yazı: 1, idari: 0, zabit: 2, mubasir: 1 },
  { sehir: "Malatya", yazı: 1, idari: 1, zabit: 3, mubasir: 2 },
  { sehir: "Van", yazı: 2, idari: 1, zabit: 4, mubasir: 3 },
  { sehir: "Kayseri", yazı: 3, idari: 1, zabit: 5, mubasir: 2 },
  { sehir: "Mersin", yazı: 1, idari: 0, zabit: 3, mubasir: 1 },
  { sehir: "Balıkesir", yazı: 2, idari: 1, zabit: 4, mubasir: 2 },
  { sehir: "Denizli", yazı: 1, idari: 1, zabit: 3, mubasir: 1 },
  { sehir: "Kahramanmaraş", yazı: 2, idari: 1, zabit: 3, mubasir: 2 },
  { sehir: "Manisa", yazı: 2, idari: 1, zabit: 3, mubasir: 2 },
  { sehir: "Tekirdağ", yazı: 1, idari: 1, zabit: 2, mubasir: 2 },
  { sehir: "Şanlıurfa", yazı: 2, idari: 1, zabit: 3, mubasir: 3 },
  { sehir: "Aydın", yazı: 2, idari: 1, zabit: 3, mubasir: 2 },
  { sehir: "Çorum", yazı: 1, idari: 1, zabit: 2, mubasir: 1 },
  { sehir: "Kütahya", yazı: 1, idari: 1, zabit: 2, mubasir: 1 },
];

function MunhalTablosu() {
  const [search, setSearch] = useState("");

  const filteredData = dummyData.filter((item) =>
    item.sehir.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Menu />
      <div style={styles.container}>
        <h2 style={styles.title}>Münhal Bazlı Personel Tablosu</h2>
        <input
          type="text"
          placeholder="Şehir ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Şehir</th>
              <th style={styles.headerCell}>Yazı İşleri Müdürü</th>
              <th style={styles.headerCell}>İdari İşler Müdürü</th>
              <th style={styles.headerCell}>Zabıt Katibi</th>
              <th style={styles.headerCell}>Mübaşır</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 25).map((item, index) => (
              <tr key={index}>
                <td style={styles.cell}>{item.sehir}</td>
                <td style={styles.cell}>{item.yazı}</td>
                <td style={styles.cell}>{item.idari}</td>
                <td style={styles.cell}>{item.zabit}</td>
                <td style={styles.cell}>{item.mubasir}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "40px",
    textAlign: "center",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    backgroundImage: `url(${loginbackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    zIndex: 1,
    paddingBottom: "220px" 
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  input: {
    padding: "10px",
    width: "300px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  table: {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    borderCollapse: "collapse",
  },
  headerRow: {
    backgroundColor: "#ddd",
  },
  headerCell: {
    padding: "12px",
    border: "1px solid black",
    textAlign: "center",
    fontWeight: "bold",
  },
  cell: {
    padding: "10px",
    border: "1px solid black",
    textAlign: "center",
  },
};

export default MunhalTablosu;
