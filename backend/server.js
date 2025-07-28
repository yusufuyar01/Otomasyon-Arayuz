const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS ayarları
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://otomasyon-frontend-production-*.up.railway.app', 'https://otomasyon-backend-production-*.up.railway.app']
    : ['http://localhost:3000', 'http://192.168.56.1:3000'],
  credentials: true
}));

app.use(express.json());

// Test dosyalarını listele
app.get('/tests', (req, res) => {
  try {
    // Manuel olarak test dosyalarını tanımla
    const testFiles = [
      {
        name: '507 Gerçek Mükellef Ekleme',
        file: 'merchant/507-gercek-mukellef-ekleme.spec.ts',
        path: 'tests/merchant/507-gercek-mukellef-ekleme.spec.ts',
        category: 'merchant'
      },
      {
        name: '507 Tüzel Mükellef Ekleme',
        file: 'merchant/507-tuzel-mukellef-ekleme.spec.ts',
        path: 'tests/merchant/507-tuzel-mukellef-ekleme.spec.ts',
        category: 'merchant'
      },
      {
        name: '509 Gerçek Mükellef Ekleme',
        file: 'merchant/509-gercek-mukellef-ekleme.spec.ts',
        path: 'tests/merchant/509-gercek-mukellef-ekleme.spec.ts',
        category: 'merchant'
      },
      {
        name: '509 Tüzel Mükellef Ekleme',
        file: 'merchant/509-tuzel-mukellef-ekleme.spec.ts',
        path: 'tests/merchant/509-tuzel-mukellef-ekleme.spec.ts',
        category: 'merchant'
      },
      {
        name: 'Detay Belge Ekleme Güncelleme Görüntüleme Silme',
        file: 'merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts',
        path: 'tests/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts',
        category: 'merchant'
      },
      {
        name: 'Detay E-Belge Ayarları',
        file: 'merchant/detay-e-belge-ayarlari.spec.ts',
        path: 'tests/merchant/detay-e-belge-ayarlari.spec.ts',
        category: 'merchant'
      },
      {
        name: 'Detay Entegratör Ekleme',
        file: 'merchant/detay-entegrator-ekleme.spec.ts',
        path: 'tests/merchant/detay-entegrator-ekleme.spec.ts',
        category: 'merchant'
      },
      {
        name: 'Detay Payment Type Ekleme',
        file: 'merchant/detay-payment-type-ekleme.spec.ts',
        path: 'tests/merchant/detay-payment-type-ekleme.spec.ts',
        category: 'merchant'
      },
      {
        name: 'Tip Vergi Tipi ve Yetkili Bayi Değiştirme',
        file: 'merchant/tip-vergi-tipi-ve-yetkili-bayi-degistirme.spec.ts',
        path: 'tests/merchant/tip-vergi-tipi-ve-yetkili-bayi-degistirme.spec.ts',
        category: 'merchant'
      },
      {
        name: 'deneme',
        file: 'merchant/deneme.spec.ts',
        path: 'tests/merchant/deneme.spec.ts',
        category: 'merchant'
      },
      {
        name: 'Bayi Güncelle',
        file: 'reseller/bayi-guncelle.spec.ts',
        path: 'tests/reseller/bayi-guncelle.spec.ts',
        category: 'reseller'
      },
      {
        name: 'Detay İletişim Bilgileri Ekleme Güncelleme',
        file: 'reseller/detay-iletisim-bilgileri-ekleme-guncelleme.spec.ts',
        path: 'tests/reseller/detay-iletisim-bilgileri-ekleme-guncelleme.spec.ts',
        category: 'reseller'
      },
      {
        name: 'Detay Kullanıcı Ekleme Güncelleme',
        file: 'reseller/detay-kullanici-ekleme-guncelleme.spec.ts',
        path: 'tests/reseller/detay-kullanici-ekleme-guncelleme.spec.ts',
        category: 'reseller'
      },
      {
        name: 'Gerçek Kisi Bayi Ekleme',
        file: 'reseller/gercek-kisi-bayi-ekleme.spec.ts',
        path: 'tests/reseller/gercek-kisi-bayi-ekleme.spec.ts',
        category: 'reseller'
      },
      {
        name: 'Tüzel Kisi Bayi Ekleme',
        file: 'reseller/tuzel-kisi-bayi-ekleme.spec.ts',
        path: 'tests/reseller/tuzel-kisi-bayi-ekleme.spec.ts',
        category: 'reseller'
      },
      {
        name: 'Bayiye Atanmamış ve Uye Isyerine Atanmamış Checkboxlarını test etme',
        file: 'device/bayiye-atanmamis-ve-uye-isyerine-atanmamis.spec.ts',
        path: 'tests/device/bayiye-atanmamis-ve-uye-isyerine-atanmamis.spec.ts',
        category: 'device'
      },
      {
        name: 'Yeni Cihaz Ekle',
        file: 'device/yeni-cihaz-ekle.spec.ts',
        path: 'tests/device/yeni-cihaz-ekle.spec.ts',
        category: 'device'
      },
      {
        name: 'Cihaz Güncelle',
        file: 'device/cihaz-guncelle.spec.ts',
        path: 'tests/device/cihaz-guncelle.spec.ts',
        category: 'device'
      },
      {
        name: 'Cihazları Bayiye Atama 1',
        file: 'device/cihazlari-bayiye-ata-1.spec.ts',
        path: 'tests/device/cihazlari-bayiye-ata-1.spec.ts',
        category: 'device'
      },
      {
        name: 'Cihazları Bayiye Atama 2',
        file: 'device/cihazlari-bayiye-ata-2.spec.ts',
        path: 'tests/device/cihazlari-bayiye-ata-2.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye İşyerine Atalı Cihazları Seçip Bayiye Atama',
        file: 'device/uye-isyeri-olan-cihazlari-bayiye-ata.spec.ts',
        path: 'tests/device/uye-isyeri-olan-cihazlari-bayiye-ata.spec.ts',
        category: 'device'
      },
      {
        name: 'Bayiye Atalı Cihazlar için Bayiden Geri Al',
        file: 'device/bayiye-atali-cihazlari-bayiden-geri-al.spec.ts',
        path: 'tests/device/bayiye-atali-cihazlari-bayiden-geri-al.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye İşyerine Atanmış Cihazları Seçip Bayiden Geri Al',
        file: 'device/uye-isyerine-atali-cihazlari-bayiden-geri-al.spec.ts',
        path: 'tests/device/uye-isyerine-atali-cihazlari-bayiden-geri-al.spec.ts',
        category: 'device'
      },
      {
        name: 'Birden Fazla Cihazı Seçip Operasyonel Bayi Ataması Yap',
        file: 'device/birden-fazla-cihaza-operasyonel-bayi-ata.spec.ts',
        path: 'tests/device/birden-fazla-cihaza-operasyonel-bayi-ata.spec.ts',
        category: 'device'
      },
      {
        name: 'Tek Cihaz Seçip Operasyonel Bayi Ataması Yap',
        file: 'device/tek-cihaz-operasyonel-bayi-atama.spec.ts',
        path: 'tests/device/tek-cihaz-operasyonel-bayi-atama.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye İşyerine Atanmış Cihazları Seçip Üye İşyerine Atama',
        file: 'device/uye-isyerine-atanmis-cihazlari-uye-isyerine-ata.spec.ts',
        path: 'tests/device/uye-isyerine-atanmis-cihazlari-uye-isyerine-ata.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye İşyerine Atanmamış Cihazları Seçip 507 Üye İşyerine Atama',
        file: 'device/cihazlari-507-uye-isyerine-ata.spec.ts',
        path: 'tests/device/cihazlari-507-uye-isyerine-ata.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye İşyerine Atanmamış Cihazları Seçip 509 Üye İşyerine Atama',
        file: 'device/cihazlari-509-uye-isyerine-ata.spec.ts',
        path: 'tests/device/cihazlari-509-uye-isyerine-ata.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye İşyerine Atanmamış Cihazları Seçip E-belge Ayarları Yapılmış 507 Üye İşyerine Atama',
        file: 'device/cihazlari-507-uye-isyerine-ata-e-belge-var.spec.ts',
        path: 'tests/device/cihazlari-507-uye-isyerine-ata-e-belge-var.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye işyerine atanmamış cihazları seçip E-Belge ayarları yapılmamış 507 üye işyerine ata',
        file: 'device/cihazlari-507-uye-isyerine-ata-e-belge-yok.spec.ts',
        path: 'tests/device/cihazlari-507-uye-isyerine-ata-e-belge-yok.spec.ts',
        category: 'device'
      }

      
    ];

    res.json(testFiles);
  } catch (error) {
    res.status(500).json({ error: 'Test dosyaları listelenemedi', details: error.message });
  }
});

// Belirli bir test dosyasını çalıştır
app.post('/run-test', async (req, res) => {
  const { testFile } = req.body;
  
  if (!testFile) {
    return res.status(400).json({ error: 'Test dosyası belirtilmedi' });
  }

  try {
    const testPath = path.join(__dirname, '..', 'tests', testFile);
    
    // Test dosyasının varlığını kontrol et
    if (!fs.existsSync(testPath)) {
      return res.status(404).json({ error: 'Test dosyası bulunamadı' });
    }

    // Playwright testini çalıştır (timeout artırıldı) - Terminal çıktısı için line reporter kullan
    exec(`npx playwright test tests/${testFile} --headed --timeout=120000 --reporter=line`, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
              if (error) {
          console.error('Test çalıştırma hatası:', error);
          return res.status(500).json({ 
            error: 'Test çalıştırılamadı', 
            details: error.message,
            stdout: stdout,
            stderr: stderr,
            command: `npx playwright test tests/${testFile} --headed --timeout=120000`
          });
        }
      
      res.json({ 
        success: true, 
        output: stdout,
        stderr: stderr,
        message: 'Test başarıyla çalıştırıldı'
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası', details: error.message });
  }
});

// Tüm testleri çalıştır
app.post('/run-all-tests', async (req, res) => {
  try {
    exec('npx playwright test --timeout=120000 --reporter=line', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        console.error('Test çalıştırma hatası:', error);
        return res.status(500).json({ 
          error: 'Testler çalıştırılamadı', 
          details: error.message,
          stderr: stderr
        });
      }
      
      res.json({ 
        success: true, 
        output: stdout,
        message: 'Tüm testler başarıyla çalıştırıldı'
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası', details: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 