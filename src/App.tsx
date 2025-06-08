import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser, UserProvider } from "./features/UserContext";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import AdminPage from "./pages/TumTalepler";
import PuanTablosu from "./pages/PuanTablosu";
import MunhalBazliPT from "./pages/MunhalBazliPT";
import MunhalTablosu from "./pages/MunhalTablosu";
import NewRequestPage from "./pages/NewRequestPage";
import MyRequestsPage from "./pages/MyRequestsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DegerlendirilenTalepler from "./pages/DegerlendirilenTalepler";
import BekleyenTalepler from "./pages/BekleyenTalepler";
import TumTalepler from "./pages/TumTalepler";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

function AppContent() {
  const { user, loading } = useUser();

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20%" }}>Yükleniyor...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        {/* Ana Sayfa - Giriş durumu kontrolü */}
        <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />

        {/* Dashboard sayfası, sadece giriş yapmış kullanıcı */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />

        {/* Admin sayfaları sadece admin yetkisi varsa */}
        <Route path="/admin" element={user?.Unvan === "Admin" ? <AdminPage /> : <Navigate to="/" />} />
        <Route path="/admin/degerlendirilen-talepler" element={user?.Unvan === "Admin" ? <DegerlendirilenTalepler /> : <Navigate to="/" />} />
        <Route path="/admin/bekleyen-talepler" element={user?.Unvan === "Admin" ? <BekleyenTalepler /> : <Navigate to="/" />} />
        <Route path="/admin/tum-talepler" element={user?.Unvan === "Admin" ? <TumTalepler /> : <Navigate to="/" />} />

        {/* Diğer sayfalar */}
        <Route path="/puan-tablosu" element={<PuanTablosu />} />
        <Route path="/munhal-bazli" element={<MunhalBazliPT />} />
        <Route path="/unvana-gore" element={<MunhalTablosu />} />
        <Route path="/new-request" element={<NewRequestPage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />

        {/* Yönlendirme olmayan path'ler için ana sayfaya dön */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
