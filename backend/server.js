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
    ? ['https://playwright-frontend.onrender.com', 'https://otomasyon-arayuz.onrender.com']
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
      },
      {
        name: 'Terminal Güncelle',
        file: 'sales-terminal/terminal-guncelle.spec.ts',
        path: 'tests/sales-terminal/terminal-guncelle.spec.ts',
        category: 'sales-terminal'
      },
      {
        name: 'Detay menüde Mediator ekleme güncelleme silme ve parametre ekleme güncelleme silme',
        file: 'sales-terminal/detay-mediator-islemleri.spec.ts',
        path: 'tests/sales-terminal/detay-mediator-islemleri.spec.ts',
        category: 'sales-terminal'
      },
      {
        name: 'Detay menüde Dokuman on eki ekleme güncelleme silme',
        file: 'sales-terminal/detay-dokuman-on-eki-islemleri.spec.ts',
        path: 'tests/sales-terminal/detay-dokuman-on-eki-islemleri.spec.ts',
        category: 'sales-terminal'
      },
      {
        name: 'Satışlarım Ekranında Filtreleme Yap',
        file: 'sales-terminal/satislarim-filtrele.spec.ts',
        path: 'tests/sales-terminal/satislarim-filtrele.spec.ts',
        category: 'sales-terminal'
      },
      {
        name: 'Grup Ata ve Terminal Güncelle',
        file: 'techpos/grup-ata-ve-terminal-guncelle.spec.ts',
        path: 'tests/techpos/grup-ata-ve-terminal-guncelle.spec.ts',
        category: 'techpos'
      },
      {
        name: 'Techpos İşlemleri Ekranında Filtreleme Yap',
        file: 'techpos/techpos-islemleri-ekrani-filtre.spec.ts',
        path: 'tests/techpos/techpos-islemleri-ekrani-filtre.spec.ts',
        category: 'techpos'
      },
      {
        name: 'Techpos Batch Ekranında Filtreleme Yap',
        file: 'techpos/techpos-batch-ekrani-filtre.spec.ts',
        path: 'tests/techpos/techpos-batch-ekrani-filtre.spec.ts',
        category: 'techpos'
      },
      {
        name: 'Batch Özet ve İşlemler Ekranında Özet tablosu Kontrolü Yap',
        file: 'techpos/batch-ozet-ve-islemler.spec.ts',
        path: 'tests/techpos/batch-ozet-ve-islemler.spec.ts',
        category: 'techpos'
      },
      {
        name: 'Batch Özet ve İşlemler Ekranında Filtreleme Yap',
        file: 'techpos/techpos-grup-ekrani-crud.spec.ts',
        path: 'tests/techpos/techpos-grup-ekrani-crud.spec.ts',
        category: 'techpos'
      },
      {
        name: 'Techpos Terminalde Tanımlı Banka Listesi Ekranında Liste Kontrolü Yap',
        file: 'techpos/techpos-terminalde-tanimli-banka-listesi.spec.ts',
        path: 'tests/techpos/techpos-terminalde-tanimli-banka-listesi.spec.ts',
        category: 'techpos'
      },
      {
        name: 'Techpos Seri No Ekranında Liste Kontrolü Yap',
        file: 'techpos/techpos-seri-no.spec.ts',
        path: 'tests/techpos/techpos-seri-no.spec.ts',
        category: 'techpos'
      },
      {
        name: 'Techpos BKM Banka PF İşlem Listesi Ekranında Liste Kontrolü Yap',
        file: 'techpos/BKM-techpos-banka-pf-islem-listesi.spec.ts',
        path: 'tests/techpos/BKM-techpos-banka-pf-islem-listesi.spec.ts',
        category: 'techpos'
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