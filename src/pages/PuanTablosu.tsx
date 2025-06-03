import Menu from "../components/Menu";
import Background from "../assets/login-back.jpg";

function PuanTablosu() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",     
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Menu />
      <h2
        style={{          
          margin: "0 auto",
          marginBottom: "20px",
          paddingTop: "200px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
        }}
      >
        BÖLGE PUAN TABLOSU
      </h2>
      <table
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#ddd",
                fontWeight: "bold",
              }}
            >
              BÖLGE
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#ddd",
                fontWeight: "bold",
              }}
            >
              1. BÖLGE
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#ddd",
                fontWeight: "bold",
              }}
            >
              2. BÖLGE
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#ddd",
                fontWeight: "bold",
              }}
            >
              3. BÖLGE
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#ddd",
                fontWeight: "bold",
              }}
            >
              4. BÖLGE
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#ddd",
                fontWeight: "bold",
              }}
            >
              5. BÖLGE
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
                fontWeight: "bold",
              }}
            >
              PUAN
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
              }}
            >
              10
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
              }}
            >
              12
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
              }}
            >
              14
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
              }}
            >
              16
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
              }}
            >
              18
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PuanTablosu;
