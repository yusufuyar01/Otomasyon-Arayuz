const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Test sonuçlarını saklamak için dosya yolu
const TEST_RESULTS_FILE = path.join(__dirname, 'test-results.json');

// CORS ayarları
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://playwright-frontend.onrender.com', 'https://otomasyon-arayuz.onrender.com']
    : ['http://localhost:3000', 'http://192.168.56.1:3000'],
  credentials: true
}));

app.use(express.json());

// Test sonuçlarını yükle
function loadTestResults() {
  try {
    if (fs.existsSync(TEST_RESULTS_FILE)) {
      const data = fs.readFileSync(TEST_RESULTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Test sonuçları yüklenirken hata:', error);
  }
  return {};
}

// Test sonuçlarını kaydet
function saveTestResults(results) {
  try {
    fs.writeFileSync(TEST_RESULTS_FILE, JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Test sonuçları kaydedilirken hata:', error);
  }
}

// Test sonuçlarını getir
app.get('/test-results', (req, res) => {
  try {
    const results = loadTestResults();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Test sonuçları alınamadı', details: error.message });
  }
});

// Test dosyalarını listele
app.get('/tests', (req, res) => {
  try {
    // Manuel olarak test dosyalarını tanımla
    const testFiles = [
      {
        name: '507 Gerçek Mükellef Ekleme',
        file: 'admin-login/merchant/507-gercek-mukellef-ekleme.spec.ts',
        path: 'tests/admin-login/merchant/507-gercek-mukellef-ekleme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: '507 Tüzel Mükellef Ekleme',
        file: 'admin-login/merchant/507-tuzel-mukellef-ekleme.spec.ts',
        path: 'tests/admin-login/merchant/507-tuzel-mukellef-ekleme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: '509 Gerçek Mükellef Ekleme',
        file: 'admin-login/merchant/509-gercek-mukellef-ekleme.spec.ts',
        path: 'tests/admin-login/merchant/509-gercek-mukellef-ekleme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: '509 Tüzel Mükellef Ekleme',
        file: 'admin-login/merchant/509-tuzel-mukellef-ekleme.spec.ts',
        path: 'tests/admin-login/merchant/509-tuzel-mukellef-ekleme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: 'Detay Belge Ekleme Güncelleme Görüntüleme Silme',
        file: 'admin-login/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts',
        path: 'tests/admin-login/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: 'Detay E-Belge Ayarları',
        file: 'admin-login/merchant/detay-e-belge-ayarlari.spec.ts',
        path: 'tests/admin-login/merchant/detay-e-belge-ayarlari.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: 'Detay Entegratör Ekleme',
        file: 'admin-login/merchant/detay-entegrator-ekleme.spec.ts',
        path: 'tests/admin-login/merchant/detay-entegrator-ekleme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: 'Detay Payment Type Ekleme',
        file: 'admin-login/merchant/detay-payment-type-ekleme.spec.ts',
        path: 'tests/admin-login/merchant/detay-payment-type-ekleme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: 'Tip Vergi Tipi ve Yetkili Bayi Değiştirme',
        file: 'admin-login/merchant/tip-vergi-tipi-ve-yetkili-bayi-degistirme.spec.ts',
        path: 'tests/admin-login/merchant/tip-vergi-tipi-ve-yetkili-bayi-degistirme.spec.ts',
        category: 'admin-login/merchant'
      },
      {
        name: 'Bayi Güncelle',
        file: 'admin-login/reseller/bayi-guncelle.spec.ts',
        path: 'tests/admin-login/reseller/bayi-guncelle.spec.ts',
        category: 'admin-login/reseller'
      },
      {
        name: 'Detay İletişim Bilgileri Ekleme Güncelleme',
        file: 'admin-login/reseller/detay-iletisim-bilgileri-ekleme-guncelleme.spec.ts',
        path: 'tests/admin-login/reseller/detay-iletisim-bilgileri-ekleme-guncelleme.spec.ts',  
        category: 'admin-login/reseller'
      },
      {
        name: 'Detay Kullanıcı Ekleme Güncelleme',
        file: 'admin-login/reseller/detay-kullanici-ekleme-guncelleme.spec.ts',
        path: 'tests/admin-login/reseller/detay-kullanici-ekleme-guncelleme.spec.ts',
        category: 'admin-login/reseller'
      },
      {
        name: 'Gerçek Kisi Bayi Ekleme',
        file: 'admin-login/reseller/gercek-kisi-bayi-ekleme.spec.ts',
        path: 'tests/admin-login/reseller/gercek-kisi-bayi-ekleme.spec.ts',
        category: '<admin-login/>reseller'
      },
      {
        name: 'Tüzel Kisi Bayi Ekleme',
        file: 'admin-login/reseller/tuzel-kisi-bayi-ekleme.spec.ts',
        path: 'tests/admin-login/reseller/tuzel-kisi-bayi-ekleme.spec.ts',
        category: 'admin-login/reseller'
      },
      {
        name: 'Bayiye Atanmamış ve Uye Isyerine Atanmamış Checkboxlarını test etme',
        file: 'admin-login/device/bayiye-atanmamis-ve-uye-isyerine-atanmamis.spec.ts',
        path: 'tests/admin-login/device/bayiye-atanmamis-ve-uye-isyerine-atanmamis.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Yeni Cihaz Ekle',
        file: 'admin-login/device/yeni-cihaz-ekle.spec.ts',
        path: 'tests/admin-login/device/yeni-cihaz-ekle.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Cihaz Güncelle',
        file: 'admin-login/device/cihaz-guncelle.spec.ts',
        path: 'tests/admin-login/device/cihaz-guncelle.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Cihazları Bayiye Atama 1',
        file: 'admin-login/device/cihazlari-bayiye-ata-1.spec.ts',
        path: 'tests/admin-login/device/cihazlari-bayiye-ata-1.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Cihazları Bayiye Atama 2',
        file: 'admin-login/device/cihazlari-bayiye-ata-2.spec.ts',
        path: 'tests/admin-login/device/cihazlari-bayiye-ata-2.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Üye İşyerine Atalı Cihazları Seçip Bayiye Atama',
        file: 'admin-login/device/uye-isyeri-olan-cihazlari-bayiye-ata.spec.ts',
        path: 'tests/admin-login/device/uye-isyeri-olan-cihazlari-bayiye-ata.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Bayiye Atalı Cihazlar için Bayiden Geri Al',
        file: 'admin-login/device/bayiye-atali-cihazlari-bayiden-geri-al.spec.ts',
        path: 'tests/admin-login/device/bayiye-atali-cihazlari-bayiden-geri-al.spec.ts',
        category: 'device'
      },
      {
        name: 'Üye İşyerine Atanmış Cihazları Seçip Bayiden Geri Al',
        file: 'admin-login/device/uye-isyerine-atali-cihazlari-bayiden-geri-al.spec.ts',
        path: 'tests/admin-login/device/uye-isyerine-atali-cihazlari-bayiden-geri-al.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Birden Fazla Cihazı Seçip Operasyonel Bayi Ataması Yap',
        file: 'admin-login/device/birden-fazla-cihaza-operasyonel-bayi-ata.spec.ts',
        path: 'tests/admin-login/device/birden-fazla-cihaza-operasyonel-bayi-ata.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Tek Cihaz Seçip Operasyonel Bayi Ataması Yap',
        file: 'admin-login/device/tek-cihaz-operasyonel-bayi-atama.spec.ts',
        path: 'tests/admin-login/device/tek-cihaz-operasyonel-bayi-atama.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Üye İşyerine Atanmış Cihazları Seçip Üye İşyerine Atama',
        file: 'admin-login/device/uye-isyerine-atanmis-cihazlari-uye-isyerine-ata.spec.ts',
        path: 'tests/admin-login/device/uye-isyerine-atanmis-cihazlari-uye-isyerine-ata.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Üye İşyerine Atanmamış Cihazları Seçip 507 Üye İşyerine Atama',
        file: 'admin-login/device/cihazlari-507-uye-isyerine-ata.spec.ts',
        path: 'tests/admin-login/device/cihazlari-507-uye-isyerine-ata.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Üye İşyerine Atanmamış Cihazları Seçip 509 Üye İşyerine Atama',
        file: 'admin-login/device/cihazlari-509-uye-isyerine-ata.spec.ts',
        path: 'tests/admin-login/device/cihazlari-509-uye-isyerine-ata.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Üye İşyerine Atanmamış Cihazları Seçip E-belge Ayarları Yapılmış 507 Üye İşyerine Atama',
        file: 'admin-login/device/cihazlari-507-uye-isyerine-ata-e-belge-var.spec.ts',
        path: 'tests/admin-login/device/cihazlari-507-uye-isyerine-ata-e-belge-var.spec.ts',
        category: 'admin-login/device'
      },
      {
        name: 'Üye işyerine atanmamış cihazları seçip E-Belge ayarları yapılmamış 507 üye işyerine ata',
        file: 'admin-login/device/cihazlari-507-uye-isyerine-ata-e-belge-yok.spec.ts',
        path: 'tests/admin-login/device/cihazlari-507-uye-isyerine-ata-e-belge-yok.spec.ts',
        category: 'device'
      },
      {
        name: 'Terminal Güncelle',
        file: 'admin-login/sales-terminal/terminal-guncelle.spec.ts',
        path: 'tests/admin-login/sales-terminal/terminal-guncelle.spec.ts',
        category: 'admin-login/sales-terminal'
      },
      {
        name: 'Detay menüde Mediator ekleme güncelleme silme ve parametre ekleme güncelleme silme',
        file: 'admin-login/sales-terminal/detay-mediator-islemleri.spec.ts',
        path: 'tests/admin-login/sales-terminal/detay-mediator-islemleri.spec.ts',
        category: 'admin-login/sales-terminal'
      },
      {
        name: 'Detay menüde Dokuman on eki ekleme güncelleme silme',
        file: 'admin-login/sales-terminal/detay-dokuman-on-eki-islemleri.spec.ts',
        path: 'tests/admin-login/sales-terminal/detay-dokuman-on-eki-islemleri.spec.ts',
        category: 'admin-login/sales-terminal'
      },
      {
        name: 'Satışlarım Ekranında Filtreleme Yap',
        file: 'admin-login/sales-terminal/satislarim-filtrele.spec.ts',
        path: 'tests/admin-login/sales-terminal/satislarim-filtrele.spec.ts',
        category: 'admin-login/sales-terminal'
      },
      {
        name: 'Grup Ata ve Terminal Güncelle',
        file: 'admin-login/techpos/grup-ata-ve-terminal-guncelle.spec.ts',
        path: 'tests/admin-login/techpos/grup-ata-ve-terminal-guncelle.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: 'Techpos İşlemleri Ekranında Filtreleme Yap',
        file: 'admin-login/techpos/techpos-islemleri-ekrani-filtre.spec.ts',
        path: 'tests/admin-login/techpos/techpos-islemleri-ekrani-filtre.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: 'Techpos Batch Ekranında Filtreleme Yap',
        file: 'admin-login/techpos/techpos-batch-ekrani-filtre.spec.ts',
        path: 'tests/admin-login/techpos/techpos-batch-ekrani-filtre.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: 'Batch Özet ve İşlemler Ekranında Özet tablosu Kontrolü Yap',
        file: 'admin-login/techpos/batch-ozet-ve-islemler.spec.ts',
        path: 'tests/admin-login/techpos/batch-ozet-ve-islemler.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: 'Batch Özet ve İşlemler Ekranında Filtreleme Yap',
        file: 'admin-login/techpos/techpos-grup-ekrani-crud.spec.ts',
        path: 'tests/admin-login/techpos/techpos-grup-ekrani-crud.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: 'Techpos Terminalde Tanımlı Banka Listesi Ekranında Liste Kontrolü Yap',
        file: 'admin-login/techpos/techpos-terminalde-tanimli-banka-listesi.spec.ts',
        path: 'tests/admin-login/techpos/techpos-terminalde-tanimli-banka-listesi.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: 'Techpos Seri No Ekranında Liste Kontrolü Yap',
        file: 'admin-login/techpos/techpos-seri-no.spec.ts',
        path: 'tests/admin-login/techpos/techpos-seri-no.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: 'Techpos BKM Banka PF İşlem Listesi Ekranında Liste Kontrolü Yap',
        file: 'admin-login/techpos/BKM-techpos-banka-pf-islem-listesi.spec.ts',
        path: 'tests/admin-login/techpos/BKM-techpos-banka-pf-islem-listesi.spec.ts',
        category: 'admin-login/techpos'
      },
      {
        name: '507 Gerçek Mükellef Ekleme Reseller Login',
        file: 'reseller-login/merchant/507-gercek-mukellef-ekleme.spec.ts',
        path: 'tests/reseller-login/merchant/507-gercek-mukellef-ekleme.spec.ts',
        category: 'reseller-login/merchant'
      },
      {
        name: '507 Tüzel Mükellef Ekleme Reseller Login',
        file: 'reseller-login/merchant/507-tuzel-mukellef-ekleme.spec.ts',
        path: 'tests/reseller-login/merchant/507-tuzel-mukellef-ekleme.spec.ts',
        category: 'reseller-login/merchant'
      },
      {
        name: '509 Gerçek Mükellef Ekleme Reseller Login',
        file: 'reseller-login/merchant/509-gercek-mukellef-ekleme.spec.ts',
        path: 'tests/reseller-login/merchant/509-gercek-mukellef-ekleme.spec.ts',
        category: 'reseller-login/merchant'
      },
      {
        name: '509 Tüzel Mükellef Ekleme Reseller Login',
        file: 'reseller-login/merchant/509-tuzel-mukellef-ekleme.spec.ts',
        path: 'tests/reseller-login/merchant/509-tuzel-mukellef-ekleme.spec.ts',
        category: 'reseller-login/merchant'
      },
      {
        name: 'Detay Belge Ekleme Güncelleme Görüntüleme Silme (reseller login)',
        file: 'reseller-login/merchant/detay-iletisim-bilgisi-ekle-guncelle.spec.ts',
        path: 'tests/reseller-login/merchant/detay-iletisim-bilgisi-ekle-guncelle.spec.ts',
        category: 'reseller-login/merchant'
      },
      {
        name: 'Detay Kullanıcı Ekle ve Güncelle Mail At (reseller login)',
        file: 'reseller-login/merchant/detay-kullanici-ekle-guncelle-mail-at.spec.ts',
        path: 'tests/reseller-login/merchant/detay-kullanici-ekle-guncelle-mail-at.spec.ts',
        category: 'reseller-login/merchant'
      },
      {
        name: 'Detay kullanıcıları gruba ekle ve çıkar (reseller login)',
        file: 'reseller-login/merchant/detay-group-user.spec.ts',
        path: 'tests/reseller-login/merchant/detay-group-user.spec.ts',
        category: 'reseller-login/merchant'
      },
      {
        name: 'Detay Belge Ekleme, Güncelleme, Görüntüleme ve Silme (reseller login)',
        file: 'reseller-login/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts',
        path: 'tests/reseller-login/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts',
        category: 'reseller-login/merchant'
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
    
    if (!fs.existsSync(testPath)) {
      return res.status(404).json({ error: 'Test dosyası bulunamadı' });
    }

    const startTime = new Date();
    
    exec(`npx playwright test tests/${testFile} --headed --timeout=120000 --reporter=line`, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
      
      const testResult = {
        success: !error,
        output: stdout || '',
        stderr: stderr || '',
        error: error ? error.message : null,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: duration,
        lastRun: endTime.toISOString()
      };

      // Test sonuçlarını kaydet
      const results = loadTestResults();
      results[testFile] = testResult;
      saveTestResults(results);

      if (error) {
        console.error('Test çalıştırma hatası:', error);
        return res.status(500).json({ 
          error: 'Test çalıştırılamadı', 
          details: error.message,
          stdout: stdout,
          stderr: stderr,
          command: `npx playwright test tests/${testFile} --headed --timeout=120000`,
          ...testResult
        });
      }
      
      res.json({ 
        success: true, 
        output: stdout,
        stderr: stderr,
        message: 'Test başarıyla çalıştırıldı',
        ...testResult
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