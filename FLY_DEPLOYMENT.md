# 🚀 Fly.io Deployment Rehberi

Bu rehber, Playwright + React projenizi Render.com'dan Fly.io'ya geçirmek için adım adım talimatları içerir.

## 📋 Ön Gereksinimler

1. **Fly.io hesabı**: [fly.io](https://fly.io) adresinden ücretsiz hesap aç
2. **Fly CLI**: `winget install flyctl` (Windows) veya `curl -L https://fly.io/install.sh | sh` (Linux/Mac)
3. **Docker Desktop**: Fly.io Docker container'ları kullanır
4. **GitHub hesabı**: Projenin GitHub'da olması gerekli

## 🔧 Adım 1: Fly.io CLI Kurulumu ve Giriş

### Windows için:
```bash
winget install flyctl
```

### Linux/Mac için:
```bash
curl -L https://fly.io/install.sh | sh
```

### Giriş yap:
```bash
flyctl auth login
```

## 🌐 Adım 2: Backend Servisi Deploy Et

### 2.1 Backend dizinine git:
```bash
cd backend
```

### 2.2 Fly.io uygulaması oluştur:
```bash
flyctl launch --name otomasyon-backend --region fra --no-deploy
```

### 2.3 Environment variables ayarla:
```bash
flyctl secrets set NODE_ENV=production
flyctl secrets set PORT=8080
```

### 2.4 Volume oluştur (test sonuçları için):
```bash
flyctl volumes create otomasyon_data --size 1 --region fra
```

### 2.5 Deploy et:
```bash
flyctl deploy
```

## 🌐 Adım 3: Frontend Servisi Deploy Et

### 3.1 Frontend dizinine git:
```bash
cd ../frontend
```

### 3.2 Fly.io uygulaması oluştur:
```bash
flyctl launch --name otomasyon-frontend --region fra --no-deploy
```

### 3.3 Environment variables ayarla:
```bash
flyctl secrets set NODE_ENV=production
flyctl secrets set NEXT_PUBLIC_PRODUCTION_BACKEND_URL=https://otomasyon-backend.fly.dev
```

### 3.4 Deploy et:
```bash
flyctl deploy
```

## ✅ Adım 4: Test Et

### 4.1 Backend Test:
```bash
# Health check
curl https://otomasyon-backend.fly.dev/health

# Test dosyalarını listele
curl https://otomasyon-backend.fly.dev/tests
```

### 4.2 Frontend Test:
- Frontend URL'ine git: `https://otomasyon-frontend.fly.dev`
- "Test Otomasyonu" sayfasına git
- Test dosyalarının listelendiğini kontrol et
- Bir test çalıştırmayı dene

## 🔄 Adım 5: Güncelleme

### 5.1 Kod güncellemesi:
```bash
# Yerel değişiklikleri yap
git add .
git commit -m "Update: description"
git push origin main

# Backend güncelle
cd backend
flyctl deploy

# Frontend güncelle
cd ../frontend
flyctl deploy
```

### 5.2 Manuel deployment:
```bash
# Backend için
cd backend
flyctl deploy

# Frontend için
cd frontend
flyctl deploy
```

## 🐛 Sorun Giderme

### Backend Sorunları:

1. **Build Hatası**:
   ```bash
   # Logları kontrol et
   flyctl logs -a otomasyon-backend
   
   # Machine'ı yeniden başlat
   flyctl machine restart -a otomasyon-backend
   ```

2. **CORS Hatası**:
   - Frontend URL'ini backend CORS ayarlarına ekle
   - Environment variables'ı kontrol et: `flyctl secrets list -a otomasyon-backend`

3. **Test Çalıştırma Hatası**:
   - Playwright browser'larının yüklendiğinden emin ol
   - Test dosyalarının doğru konumda olduğunu kontrol et

### Frontend Sorunları:

1. **Build Hatası**:
   ```bash
   # Logları kontrol et
   flyctl logs -a otomasyon-frontend
   
   # Machine'ı yeniden başlat
   flyctl machine restart -a otomasyon-frontend
   ```

2. **API Bağlantı Hatası**:
   - Backend URL'ini kontrol et
   - Environment variables'ı kontrol et: `flyctl secrets list -a otomasyon-frontend`

## 📊 Monitoring

### Fly.io Dashboard'da İzleme:
- **Logs**: `flyctl logs -a APP_NAME`
- **Status**: `flyctl status -a APP_NAME`
- **Machine List**: `flyctl machine list -a APP_NAME`

### Özel Monitoring:
```bash
# Backend health check
curl -f https://otomasyon-backend.fly.dev/health

# Test dosyalarını kontrol et
curl https://otomasyon-backend.fly.dev/tests
```

## 💰 Maliyet

### Fly.io Ücretsiz Plan:
- **3 shared-cpu-1x 256mb VMs**: Sınırsız
- **3GB persistent volume storage**: Sınırsız
- **160GB outbound data transfer**: Aylık
- **Up to 30 days of log retention**: Sınırsız

### Öneriler:
- Auto-stop özelliğini kullan (min_machines_running = 0)
- Gereksiz log'ları temizle
- Test servisini sadece gerektiğinde çalıştır

## 🔧 Yaygın Komutlar

```bash
# Uygulama durumu
flyctl status -a APP_NAME

# Logları görüntüle
flyctl logs -a APP_NAME

# Machine'ları listele
flyctl machine list -a APP_NAME

# Machine'ı yeniden başlat
flyctl machine restart -a APP_NAME MACHINE_ID

# Environment variables listele
flyctl secrets list -a APP_NAME

# Environment variable ekle
flyctl secrets set KEY=VALUE -a APP_NAME

# Environment variable sil
flyctl secrets unset KEY -a APP_NAME

# Uygulamayı sil
flyctl apps destroy APP_NAME
```

## 🎯 Sonuç

Başarılı deployment sonrası:
- ✅ Backend API çalışıyor: `https://otomasyon-backend.fly.dev`
- ✅ Frontend arayüzü erişilebilir: `https://otomasyon-frontend.fly.dev`
- ✅ Test dosyaları listeleniyor
- ✅ Testler çalıştırılabiliyor
- ✅ Sonuçlar görüntülenebiliyor

## 📞 Destek

Sorun yaşarsan:
1. Fly.io loglarını kontrol et: `flyctl logs -a APP_NAME`
2. Fly.io dokümantasyonunu incele: https://fly.io/docs/
3. Fly.io Discord topluluğuna katıl
4. GitHub Issues'da sorun aç 