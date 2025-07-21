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
    : 'http://localhost:3000',
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
    const testPath = path.join(__dirname, '..', 'tests', testFile);
    
    // Test dosyasının varlığını kontrol et
    if (!fs.existsSync(testPath)) {
      return res.status(404).json({ error: 'Test dosyası bulunamadı' });
    }

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
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası', details: error.message });
  }
});

// Tüm testleri çalıştır
app.post('/run-all-tests', async (req, res) => {
  try {
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