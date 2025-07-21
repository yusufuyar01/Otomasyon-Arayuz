# 🚀 Render.com Deployment Rehberi

Bu rehber, Playwright + React projenizi Render.com üzerinden deploy etmek için adım adım talimatları içerir.

## 📋 Ön Gereksinimler

1. GitHub hesabı
2. Render.com hesabı
3. Projenin GitHub'a push edilmiş olması

## 🔧 Adım 1: Projeyi GitHub'a Push Et

```bash
# Eğer henüz git repo değilse
git init
git add .
git commit -m "Initial commit: Playwright automation project"

# GitHub repo'ya bağla
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADIN.git
git push -u origin main
```

## 🌐 Adım 2: Backend Servisi Kurulumu

### 2.1 Render Dashboard'a Git
- [Render Dashboard](https://dashboard.render.com) adresine git
- GitHub hesabını bağla

### 2.2 Yeni Web Service Oluştur
1. "New +" butonuna tıkla
2. "Web Service" seç
3. GitHub repo'nu seç

### 2.3 Backend Ayarları

| Ayar | Değer |
|------|-------|
| **Name** | `playwright-backend` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Branch** | `main` |

### 2.4 Environment Variables Ekle

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |

### 2.5 Advanced Settings
- **Auto-Deploy**: ✅ Enabled
- **Health Check Path**: `/health`

## 🌐 Adım 3: Frontend Servisi Kurulumu

### 3.1 Yeni Static Site Oluştur
1. "New +" butonuna tıkla
2. "Static Site" seç
3. Aynı GitHub repo'nu seç

### 3.2 Frontend Ayarları

| Ayar | Değer |
|------|-------|
| **Name** | `playwright-frontend` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `.next` |
| **Branch** | `main` |

### 3.3 Environment Variables Ekle

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_PRODUCTION_BACKEND_URL` | `https://playwright-backend.onrender.com` |

## 🔄 Adım 4: CORS Ayarlarını Güncelle

Backend deploy edildikten sonra, `backend/server.js` dosyasındaki CORS ayarlarını güncelle:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://playwright-frontend.onrender.com', 'https://otomasyon-arayuz.onrender.com']
    : 'http://localhost:3000',
  credentials: true
}));
```

## ✅ Adım 5: Test Et

### 5.1 Backend Test
```bash
# Health check
curl https://playwright-backend.onrender.com/health

# Test dosyalarını listele
curl https://playwright-backend.onrender.com/tests
```

### 5.2 Frontend Test
- Frontend URL'ine git: `https://playwright-frontend.onrender.com`
- "Test Otomasyonu" sayfasına git
- Test dosyalarının listelendiğini kontrol et
- Bir test çalıştırmayı dene

## 🐛 Sorun Giderme

### Backend Sorunları

1. **Build Hatası**
   - Logları kontrol et
   - `npm install` ve `npx playwright install` komutlarının çalıştığından emin ol

2. **CORS Hatası**
   - Frontend URL'ini backend CORS ayarlarına ekle
   - Environment variables'ı kontrol et

3. **Test Çalıştırma Hatası**
   - Playwright browser'larının yüklendiğinden emin ol
   - Test dosyalarının doğru konumda olduğunu kontrol et

### Frontend Sorunları

1. **Build Hatası**
   - Node.js versiyonunu kontrol et (18+ gerekli)
   - Dependencies'lerin doğru yüklendiğinden emin ol

2. **API Bağlantı Hatası**
   - Backend URL'ini kontrol et
   - Environment variables'ı kontrol et

## 📊 Monitoring

### Render Dashboard'da İzleme
- **Logs**: Her iki servisin de loglarını kontrol et
- **Metrics**: CPU, Memory kullanımını izle
- **Health Checks**: Servislerin sağlık durumunu kontrol et

### Özel Monitoring
```bash
# Backend health check
curl -f https://playwright-backend.onrender.com/health

# Test dosyalarını kontrol et
curl https://playwright-backend.onrender.com/tests
```

## 🔄 Güncelleme

### Kod Güncellemesi
```bash
# Yerel değişiklikleri yap
git add .
git commit -m "Update: description"
git push origin main
```

Render.com otomatik olarak yeni deployment başlatacak.

### Manuel Deployment
- Render Dashboard'da servise git
- "Manual Deploy" butonuna tıkla
- "Deploy latest commit" seç

## 💰 Maliyet

### Render.com Ücretsiz Plan
- **Web Services**: 750 saat/ay (yaklaşık 31 gün)
- **Static Sites**: Sınırsız
- **Bandwidth**: 100GB/ay

### Öneriler
- Test servisini sadece gerektiğinde çalıştır
- Auto-sleep özelliğini kullan
- Gereksiz log'ları temizle

## 🎯 Sonuç

Başarılı deployment sonrası:
- ✅ Backend API çalışıyor
- ✅ Frontend arayüzü erişilebilir
- ✅ Test dosyaları listeleniyor
- ✅ Testler çalıştırılabiliyor
- ✅ Sonuçlar görüntülenebiliyor

## 📞 Destek

Sorun yaşarsan:
1. Render.com loglarını kontrol et
2. GitHub Issues'da sorun aç
3. Render.com support'a başvur 