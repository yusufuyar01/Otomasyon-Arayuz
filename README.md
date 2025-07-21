# 🧪 Test Otomasyonu Projesi

Bu proje, Playwright ile yazılmış test senaryolarını web arayüzü üzerinden çalıştırmak için geliştirilmiş bir otomasyon sistemidir.

## 📁 Proje Yapısı

```
project-root/
├── backend/                 # Node.js + Express API
│   ├── server.js           # Ana server dosyası
│   ├── package.json        # Backend dependencies
│   └── playwright.config.ts # Playwright konfigürasyonu
├── frontend/               # Next.js React uygulaması
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── tests/                  # Playwright test dosyaları
│   ├── device/
│   ├── merchant/
│   └── reseller/
└── helpers/               # Yardımcı fonksiyonlar
```

## 🚀 Render.com Üzerinden Deployment

### 1. Backend (Node.js) Servisi Kurulumu

1. [Render Dashboard](https://dashboard.render.com) adresine git
2. "New + > Web Service" seç
3. GitHub hesabını bağla ve reponu seç
4. Ayarları şu şekilde yapılandır:

| Ayar | Değer |
|------|-------|
| Name | `playwright-backend` |
| Root Directory | `backend` |
| Build Command | `npm install && npx playwright install` |
| Start Command | `node server.js` |
| Environment | `Node` |
| Branch | `master/main` |

**Environment Variables:**
- `NODE_ENV`: `production`

### 2. Frontend (React) Servisi Kurulumu

1. "New + > Static Site" seç
2. Aynı repo'yu seç
3. Ayarları şu şekilde yapılandır:

| Ayar | Değer |
|------|-------|
| Name | `playwright-frontend` |
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `.next` |
| Branch | `master/main` |

## 🔧 Yerel Geliştirme

### Backend'i Çalıştırma

```bash
cd backend
npm install
npm run dev
```

### Frontend'i Çalıştırma

```bash
cd frontend
npm install
npm run dev
```

## 📋 API Endpoints

### Backend API (Port: 3001)

- `GET /health` - Sağlık kontrolü
- `GET /tests` - Test dosyalarını listele
- `POST /run-test` - Belirli bir test dosyasını çalıştır
- `POST /run-all-tests` - Tüm testleri çalıştır

### Örnek Kullanım

```javascript
// Test dosyalarını listele
fetch('http://localhost:3001/tests')
  .then(response => response.json())
  .then(data => console.log(data));

// Belirli bir testi çalıştır
fetch('http://localhost:3001/run-test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ testFile: 'yeni-cihaz-ekle.spec.ts' })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🧪 Test Dosyaları

Proje şu kategorilerde test dosyaları içerir:

- **Device Tests** (`tests/device/`): Cihaz yönetimi testleri
- **Merchant Tests** (`tests/merchant/`): Müşteri yönetimi testleri  
- **Reseller Tests** (`tests/reseller/`): Bayi yönetimi testleri

## 🌐 Canlı Demo

- **Frontend**: https://playwright-frontend.onrender.com
- **Backend**: https://playwright-backend.onrender.com

## 🔧 Teknolojiler

- **Backend**: Node.js, Express, Playwright
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Deployment**: Render.com

## 📝 Lisans

Bu proje ISC lisansı altında lisanslanmıştır. 