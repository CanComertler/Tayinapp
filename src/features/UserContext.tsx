import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

export interface UserContextType {
  uid: string;
  email: string | null;
  displayName: string | null;
  Ad: string;
  Soyad: string;
  Unvan: string;
  eposta: string;
  SicilNo: string;
  HizmetYılı: string;
  GörevYaptığıAdliye: string;
  GörevYaptığıMahkeme: string;
}

interface UserContextValue {
  user: UserContextType | null;
  loading: boolean;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              Ad: data?.Ad ?? "",
              Soyad: data?.Soyad ?? "",
              Unvan: data?.Unvan ?? "",
              eposta: data?.eposta ?? "",
              SicilNo: data?.SicilNo ?? "",
              HizmetYılı: data?.HizmetYılı ?? "",
              GörevYaptığıAdliye: data?.GörevYaptığıAdliye ?? "",
              GörevYaptığıMahkeme: data?.GörevYaptığıMahkeme ?? "",
            });
          } else {
            console.error("Kullanıcı Firestore'da bulunamadı.");
            setUser(null);
          }
        } catch (error) {
          console.error("Veri alınamadı:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};


export const useUser = (): UserContextValue => useContext(UserContext);
