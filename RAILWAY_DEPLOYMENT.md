# 🚀 Railway.app Deployment Rehberi

Fly.io ödeme bilgisi gerektirdiği için Railway.app'e geçiş yapıyoruz. Railway, ücretsiz planı daha cömert ve kurulumu daha kolay.

## 📋 Ön Gereksinimler

1. **Railway hesabı**: [railway.app](https://railway.app) adresinden GitHub ile giriş yap
2. **GitHub hesabı**: Projenin GitHub'da olması gerekli
3. **Railway CLI** (opsiyonel): `npm install -g @railway/cli`

## 🔧 Adım 1: Railway Dashboard'da Proje Oluştur

### 1.1 Railway'e Git
- [Railway Dashboard](https://railway.app/dashboard) adresine git
- GitHub hesabınla giriş yap

### 1.2 Yeni Proje Oluştur
1. "New Project" butonuna tıkla
2. "Deploy from GitHub repo" seç
3. GitHub repo'nu seç

## 🌐 Adım 2: Backend Servisi Kurulumu

### 2.1 Backend Service Ekle
1. Proje içinde "New Service" butonuna tıkla
2. "GitHub Repo" seç
3. Aynı repo'yu seç
4. **Root Directory**: `backend` olarak ayarla

### 2.2 Environment Variables Ekle
Railway Dashboard'da backend servisine git ve şu environment variables'ları ekle:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `8080` |

### 2.3 Build Settings
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## 🌐 Adım 3: Frontend Servisi Kurulumu

### 3.1 Frontend Service Ekle
1. Proje içinde "New Service" butonuna tıkla
2. "GitHub Repo" seç
3. Aynı repo'yu seç
4. **Root Directory**: `frontend` olarak ayarla

### 3.2 Environment Variables Ekle
Railway Dashboard'da frontend servisine git ve şu environment variables'ları ekle:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_PRODUCTION_BACKEND_URL` | `https://otomasyon-backend-production-xxxx.up.railway.app` |

**Not**: Backend URL'ini backend deploy edildikten sonra alacaksın.

## ✅ Adım 4: Test Et

### 4.1 Backend Test:
```bash
# Health check
curl https://otomasyon-backend-production-xxxx.up.railway.app/health

# Test dosyalarını listele
curl https://otomasyon-backend-production-xxxx.up.railway.app/tests
```

### 4.2 Frontend Test:
- Frontend URL'ine git: `https://otomasyon-frontend-production-xxxx.up.railway.app`
- "Test Otomasyonu" sayfasına git
- Test dosyalarının listelendiğini kontrol et
- Bir test çalıştırmayı dene

## 🔄 Adım 5: Güncelleme

### 5.1 Otomatik Deployment:
- GitHub'a push ettiğinde Railway otomatik olarak yeni deployment başlatır

### 5.2 Manuel Deployment:
- Railway Dashboard'da servise git
- "Deploy" butonuna tıkla

## 🐛 Sorun Giderme

### Backend Sorunları:

1. **Build Hatası**:
   - Railway Dashboard'da "Deployments" sekmesine git
   - Build loglarını kontrol et

2. **CORS Hatası**:
   - Frontend URL'ini backend CORS ayarlarına ekle
   - Environment variables'ı kontrol et

3. **Test Çalıştırma Hatası**:
   - Playwright browser'larının yüklendiğinden emin ol
   - Test dosyalarının doğru konumda olduğunu kontrol et

### Frontend Sorunları:

1. **Build Hatası**:
   - Railway Dashboard'da "Deployments" sekmesine git
   - Build loglarını kontrol et

2. **API Bağlantı Hatası**:
   - Backend URL'ini kontrol et
   - Environment variables'ı kontrol et

## 📊 Monitoring

### Railway Dashboard'da İzleme:
- **Deployments**: Her deployment'ın durumunu kontrol et
- **Logs**: Canlı logları görüntüle
- **Metrics**: CPU, Memory kullanımını izle

### Özel Monitoring:
```bash
# Backend health check
curl -f https://otomasyon-backend-production-xxxx.up.railway.app/health

# Test dosyalarını kontrol et
curl https://otomasyon-backend-production-xxxx.up.railway.app/tests
```

## 💰 Maliyet

### Railway.app Ücretsiz Plan:
- **$5 credit**: Aylık (yaklaşık 500 saat shared-cpu-1x)
- **512MB RAM**: Her servis için
- **1GB storage**: Her servis için
- **100GB bandwidth**: Aylık

### Öneriler:
- Auto-sleep özelliğini kullan
- Gereksiz log'ları temizle
- Test servisini sadece gerektiğinde çalıştır

## 🎯 Sonuç

Başarılı deployment sonrası:
- ✅ Backend API çalışıyor: `https://otomasyon-backend-production-xxxx.up.railway.app`
- ✅ Frontend arayüzü erişilebilir: `https://otomasyon-frontend-production-xxxx.up.railway.app`
- ✅ Test dosyaları listeleniyor
- ✅ Testler çalıştırılabiliyor
- ✅ Sonuçlar görüntülenebiliyor

## 📞 Destek

Sorun yaşarsan:
1. Railway Dashboard loglarını kontrol et
2. Railway dokümantasyonunu incele: https://docs.railway.app/
3. Railway Discord topluluğuna katıl
4. GitHub Issues'da sorun aç 