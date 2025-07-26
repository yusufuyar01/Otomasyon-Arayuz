#!/bin/bash

# Render.com için build script
echo "🚀 Render.com build script başlatılıyor..."

# Dependencies yükle
echo "📦 Dependencies yükleniyor..."
npm install

# Playwright browser'larını yüklemeyi dene ama hata olursa devam et
echo " Playwright browser'ları yüklenmeye çalışılıyor..."
npx playwright install --with-deps chromium || echo "⚠️ Browser yükleme başarısız, devam ediliyor..."

# Build tamamlandı
echo "✅ Build tamamlandı!" 