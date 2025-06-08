# Tayinapp

## 📌 Proje Hakkında

Tayinapp, kamu personelinin tayin (görev yeri değişikliği) taleplerini oluşturabileceği, yönetebileceği ve yöneticilerin bu talepleri değerlendirebileceği bir web uygulamasıdır. Kullanıcı arayüzü sade ve kullanıcı dostudur. Talepler Firestore veritabanı üzerinde saklanır.

---

## 🚀 Kurulum Aşamaları (Türkçe)

1. Reponun bir kopyasını yerel makinenize klonlayın:
   ```bash
   git clone https://github.com/CanComertler/Tayinapp.git
   cd Tayinapp
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Proje kök dizinine bir `.env` dosyası oluşturun ve Firebase yapılandırma bilgilerinizi girin:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

---

## 📷 Ekran Görüntüleri

Aşağıda uygulamaya ait ekran görüntüleri yer alacaktır:

![Giriş Sayfası](screenshots/girissayfasi.png)
![Admin Menü](screenshots/AdminMenü.png)
![Başvurularım](screenshots/başvurularım.png)
![Bekleyen Talepler](screenshots/BekleyenTalepler.png)
![Bölge Puan Tablosu](screenshots/BölgePuanTablosu.png)
![Dashboard Sayfası](screenshots/dashboard.png)
![Değerlendirilen Talepler](screenshots/DeğerlendirilenTalepler.png)
![Hizmet Bölgesi Puan Tablosu](screenshots/HizmetBölgesiPuantablosu.png)
![Münhal Bazlı Personel Tablosu](screenshots/MünhalBazlıPersonelTablosu.png)
![Sosyal İconların Görünümü](screenshots/sosyalicongörünümü.png)
![Tayin Popusp](screenshots/TayinPopup.png)
![Tüm Tayin Talepleri](screenshots/TümTayinTalepleri.png)
![Yeni Başvuru](screenshots/yenibasvuru.png)



## 🛠️ Kullanılan Teknolojiler ve Kütüphaneler

- React.js  
- Firebase Authentication  
- Firebase Firestore  
- Tailwind CSS  
- React Router DOM  
- React Icons  
- Vite  

---

## 📌 About the Project (English)

Tayinapp is a web application that allows public employees to submit and track transfer requests, while administrators can review and manage them through an admin interface. All data is stored in Firebase Firestore.

---

## 🚀 Installation Steps (English)

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/CanComertler/Tayinapp.git
   cd Tayinapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---


## 🛠️ Technologies and Libraries Used

- React.js  
- Firebase Authentication  
- Firebase Firestore  
- Tailwind CSS  
- React Router DOM  
- React Icons  
- Vite  

---

## ✍️ Lisans / License

Bu proje açık kaynaklıdır. Detaylar için `LICENSE` dosyasına bakabilirsiniz.  
This project is open-source. See the `LICENSE` file for more details.
