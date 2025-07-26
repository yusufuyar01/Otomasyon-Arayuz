#!/bin/bash

# Render.com için build script
echo "🚀 Render.com build script başlatılıyor..."

# Dependencies yükle
echo "📦 Dependencies yükleniyor..."
npm install

# Playwright browser'ları yükle
echo "🌐 Playwright browser'ları yükleniyor..."
npx playwright install --with-deps chromium

# Build tamamlandı
echo "✅ Build tamamlandı!" 