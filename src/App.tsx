import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";

import { UserContext } from "./features/UserContext";
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
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.log("Kullanıcı Firestore'da bulunamadı.");
            setUser(null);
          }
        } catch (error) {
          console.error("Kullanıcı verisi alınamadı:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div style={{ textAlign: "center", marginTop: "20%" }}>Yükleniyor...</div>;
  }

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/admin" element={user?.Unvan === "Admin" ? <AdminPage /> : <Navigate to="/" />} />
          <Route path="/admin/degerlendirilen-talepler" element={user?.Unvan === "Admin" ? <DegerlendirilenTalepler /> : <Navigate to="/" />} />
          <Route path="/admin/bekleyen-talepler" element={user?.Unvan === "Admin" ? <BekleyenTalepler /> : <Navigate to="/" />} />
          <Route path="/admin/tum-talepler" element={user?.Unvan === "Admin" ? <TumTalepler /> : <Navigate to="/" />} />

          <Route path="/puan-tablosu" element={user ? <PuanTablosu /> : <Navigate to="/" />} />
          <Route path="/munhal-bazli" element={user ? <MunhalBazliPT /> : <Navigate to="/" />} />
          <Route path="/unvana-gore" element={user ? <MunhalTablosu /> : <Navigate to="/" />} />
          <Route path="/new-request" element={user ? <NewRequestPage /> : <Navigate to="/" />} />
          <Route path="/my-requests" element={user ? <MyRequestsPage /> : <Navigate to="/" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;
