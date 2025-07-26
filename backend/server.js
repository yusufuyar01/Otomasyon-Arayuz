const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Son test sonucunu saklamak için global değişken
let lastTestResult = null;

// CORS ayarları
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
<<<<<<< HEAD
<<<<<<< HEAD
    ? [process.env.FRONTEND_URL || 'https://otomasyon-arayuz.vercel.app']
    : ['http://localhost:3000', 'http://192.168.56.1:3000'],
=======
    ? ['https://playwright-frontend.onrender.com', 'https://otomasyon-arayuz.onrender.com']
    : 'http://localhost:3000',
>>>>>>> parent of f518868 (Arayüz oluşturuldu)
=======
    ? ['https://playwright-frontend.onrender.com', 'https://otomasyon-arayuz.onrender.com']
    : 'http://localhost:3000',
>>>>>>> parent of f518868 (Arayüz oluşturuldu)
  credentials: true
}));

app.use(express.json());

// Test dosyalarını listele
app.get('/tests', (req, res) => {
  try {
    const testsDir = path.join(__dirname, '..', 'tests');
    const files = fs.readdirSync(testsDir)
      .filter(file => file.endsWith('.spec.ts'))
      .map(file => ({ 
        name: file.replace('.spec.ts', ''), 
        file,
        path: path.join(testsDir, file)
      }));
    res.json(files);
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
<<<<<<< HEAD
    // Test sonucunu hemen döndür (simüle edilmiş)
    const testResult = {
      success: Math.random() > 0.3,
      output: ` Test: ${testFile}\n` +
              `✅ Test başlatıldı\n` +
              `📝 Test adımları çalıştırılıyor...\n` +
              `🌐 Browser açılıyor...\n` +
=======
    // Test simülasyonu - gerçek test yerine simüle ediyoruz
    console.log(`Test çalıştırılıyor: ${testFile}`);
    
    // Simüle edilmiş test sonucu
    const testResult = {
      success: Math.random() > 0.3, // %70 başarı oranı
      output: ` Test: ${testFile}\n` +
              `✅ Test başlatıldı\n` +
              `📝 Test adımları çalıştırılıyor...\n` +
              ` Elementler bulunuyor...\n` +
>>>>>>> parent of d9b52f4 (Update server.js)
              `📝 Form dolduruluyor...\n` +
              `✅ Test tamamlandı\n` +
              `⏱️ Süre: ${Math.floor(Math.random() * 30 + 10)} saniye\n` +
              `📊 Sonuç: ${Math.random() > 0.3 ? 'BAŞARILI' : 'BAŞARISIZ'}`,
      message: `${testFile} testi tamamlandı`,
      testFile: testFile,
      timestamp: new Date().toISOString()
    };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    // Test sonucunu kaydet
    lastTestResult = testResult;

    res.json(testResult);
=======
=======
>>>>>>> parent of f518868 (Arayüz oluşturuldu)
    // Playwright testini çalıştır
    exec(`npx playwright test "${testPath}" --reporter=json`, (error, stdout, stderr) => {
      if (error) {
        console.error('Test çalıştırma hatası:', error);
        return res.status(500).json({ 
          error: 'Test çalıştırılamadı', 
          details: error.message,
          stderr: stderr
        });
      }
      
      res.json({ 
        success: true, 
        output: stdout,
        message: 'Test başarıyla çalıştırıldı'
      });
    });
>>>>>>> parent of f518868 (Arayüz oluşturuldu)
  } catch (error) {
    console.error('Test çalıştırma hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası', details: error.message });
=======
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.json(testResult);
  } catch (error) {
    res.status(500).json({ 
      error: 'Test çalıştırılamadı', 
      details: error.message,
      testFile: testFile
    });
>>>>>>> parent of d9b52f4 (Update server.js)
  }
});

// Tüm testleri çalıştır
app.post('/run-all-tests', async (req, res) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log('Tüm testler çalıştırılıyor...');
    
    // Simüle edilmiş tüm test sonucu
    const allTestsResult = {
      success: Math.random() > 0.2, // %80 başarı oranı
      output: ` Tüm Testler Çalıştırılıyor\n` +
              ` Toplam test sayısı: 30\n` +
              `✅ Başarılı testler: ${Math.floor(Math.random() * 20 + 20)}\n` +
              `❌ Başarısız testler: ${Math.floor(Math.random() * 5 + 1)}\n` +
              `⏱️ Toplam süre: ${Math.floor(Math.random() * 120 + 60)} saniye\n` +
              `📊 Genel sonuç: ${Math.random() > 0.2 ? 'BAŞARILI' : 'BAŞARISIZ'}`,
      message: 'Tüm testler tamamlandı',
      timestamp: new Date().toISOString()
    };

    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 3000));

    res.json(allTestsResult);
=======
=======
>>>>>>> parent of f518868 (Arayüz oluşturuldu)
    exec('npx playwright test --reporter=json', (error, stdout, stderr) => {
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
>>>>>>> parent of f518868 (Arayüz oluşturuldu)
  } catch (error) {
    res.status(500).json({ 
      error: 'Testler çalıştırılamadı', 
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test sonucu al (GitHub Actions veya başka bir yerden)
app.post('/test-result', (req, res) => {
  const { test_file, result, message, output, timestamp, workflow_run_id } = req.body;
  
  // Son test sonucunu güncelle
  lastTestResult = {
    test_file,
    result,
    message,
    output,
    timestamp,
    workflow_run_id
  };
  
  console.log('Test sonucu alındı:', {
    test_file,
    result,
    message,
    output: output ? output.substring(0, 200) + (output.length > 200 ? '...' : '') : '',
    timestamp,
    workflow_run_id
  });
  
  res.json({ success: true, message: 'Test sonucu kaydedildi', test_file, result, timestamp, workflow_run_id });
});

// Son test sonucunu getir
app.get('/last-test-result', (req, res) => {
  if (lastTestResult) {
    res.json(lastTestResult);
  } else {
    res.status(404).json({ error: 'Henüz test sonucu yok' });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 