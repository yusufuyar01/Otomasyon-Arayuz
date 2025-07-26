"use client";
import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import TestDosyalari from "./components/testDosyalari";

interface TestFile {
  name: string;
  file: string;
  path: string;
  category: string;
}

interface TestResult {
  success: boolean;
  output: string;
  message: string;
  error?: string;
  details?: string;
  stderr?: string;
  timestamp?: string;
}

// ANSI kodlarını temizleyen fonksiyon
function stripAnsi(str: string) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
=======
import { useState, useEffect } from "react";
>>>>>>> parent of f518868 (Arayüz oluşturuldu)

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    document.title = "Ana Sayfa";
    setIsPhone(window.innerWidth < 768);
    setCurrentPath(window.location.pathname);
    
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#010080]">
      {/* Navbar */}
      <nav className="bg-[#010060] p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {isPhone ? 
          <button 
            className="text-white md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✖' : '☰'}
          </button>
          :
          <div className="flex space-x-6"> 
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : 'font-bold border-b-[3px] border-blue-300 pb-1'}`}>Ana Sayfa</Link>
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Becerilerim</Link>
            <Link href="/testler" className={`text-white hover:text-blue-300 transition ${currentPath === '/testler' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Test Otomasyonu</Link>
          </div>
          }
          
          <a 
            href="/Yusuf Uyar - CV.pdf" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            download
          >
            CV&apos;mi İndir
          </a>
        </div>
        {isOpen && (
          <div className="flex flex-col md:hidden">
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Ana Sayfa</Link>
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Becerilerim</Link>
            <Link href="/testler" className={`text-white hover:text-blue-300 transition ${currentPath === '/testler' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Test Otomasyonu</Link>
          </div>
        )}
      </nav>

      <div className="p-8 pb-20 gap-16 sm:p-20">
        <main>
          {/* Hero Section */}
          <section id="hero" className="mb-16 text-center">
            <div className="rounded-full w-48 h-48 mx-auto mb-8 overflow-hidden">
              <Image 
                src="/profil.jpeg" 
                alt="Profil Fotoğrafı"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-4xl font-bold mb-4">YUSUF UYAR</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Kırklareli Üniversitesinde Yazılım Mühendisliği 3. sınıf
              öğrencisi olarak eğitim görmekteyim. Analitik düşünme
              yeteneğim ve problem çözme becerim ile projelerde
              etkili sonuçlar elde etmeyi amaçlıyorum. Öğrenirken
              zevk aldığım ve daha çok şey öğrenebileceğim bu
              yolculukta aileme, dostlarıma, yakınlarıma, vatanıma ve
              milletime hayırlı bir insan olmak istiyorum.
            </p>
          </section>
<<<<<<< HEAD

          {/* Test Controls */}
          <section className="mb-8">
            <div className="bg-[#0d0d0d] rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Test Kontrolleri</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={runAllTests}
                  disabled={runningTest !== null}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {runningTest === 'all' ? '🔄 Çalışıyor...' : '🚀 Tüm Testleri Çalıştır'}
                </button>
                <button
                  onClick={fetchTests}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? '🔄 Yükleniyor...' : '🔄 Testleri Yenile'}
                </button>
              </div>
            </div>
            <div className="bg-yellow-900 border border-yellow-600 rounded p-3 mb-4">
              <p className="text-yellow-200">
                <strong>📝 Not:</strong> Testler şu anda simüle ediliyor. 
                Gerçek testleri çalıştırmak için local'de şu komutu kullanın:
              </p>
              <code className="block bg-black p-2 rounded mt-2 text-green-400">
                npx playwright test tests/merchant/507-gercek-mukellef-ekleme.spec.ts
              </code>
            </div>
          </section>

          {/* Test List */}
          <TestDosyalari
            tests={tests}
            loading={loading}
            runningTest={runningTest}
            onRunTest={runTest}
          />

          {/* Test Results */}
          {testResults && (
            <section className="mb-8">
              <div className="bg-[#0d0d0d] rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  📊 Test Sonuçları
                  <span className={`ml-2 text-sm px-2 py-1 rounded ${
                    testResults.success 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {testResults.success ? '✅ Başarılı' : '❌ Başarısız'}
                  </span>
                </h2>
                
                {testResults.message && (
                  <div className="mb-4 p-3 bg-[#1a1a1a] rounded border border-gray-600">
                    <p className="text-white">{testResults.message}</p>
                  </div>
                )}

                {testResults.error && (
                  <div className="mb-4 p-3 bg-red-900 rounded border border-red-600">
                    <p className="text-red-200 font-semibold">Hata:</p>
                    <p className="text-red-300">{testResults.error}</p>
                    {testResults.details && (
                      <p className="text-red-400 text-sm mt-2">{testResults.details}</p>
                    )}
                    {testResults.stderr && (
                      <pre className="text-red-400 text-sm mt-2 whitespace-pre-wrap">{testResults.stderr}</pre>
                    )}
                  </div>
                )}

                {testResults.output && (
                  <div className="p-3 bg-[#1a1a1a] rounded border border-gray-600">
                    <p className="text-white font-semibold mb-2">Terminal Çıktısı:</p>
                    <div className="bg-black rounded p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto border border-gray-700">
                      {stripAnsi(testResults.output)}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
=======
>>>>>>> parent of f518868 (Arayüz oluşturuldu)
        </main>
      </div>
    </div>
  );
}
