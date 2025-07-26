"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
}

// ANSI kodlarını temizleyen fonksiyon
function stripAnsi(str: string) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

export default function Home() {
  const [tests, setTests] = useState<TestFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningTest, setRunningTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [isPhone, setIsPhone] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const backendUrl = process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL || 'https://playwright-backend.onrender.com'
    : process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  useEffect(() => {
    document.title = "Test Otomasyonu";
    setIsPhone(window.innerWidth < 768);
    setCurrentPath(window.location.pathname);
    
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    fetchTests();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchTests = async () => {
    try {
      console.log('Backend URL:', backendUrl);
      const response = await fetch(`${backendUrl}/tests`);
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Test data:', data);
        setTests(data);
      } else {
        console.error('Test dosyaları alınamadı, status:', response.status);
      }
    } catch (error) {
      console.error('Test dosyaları alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const runTest = async (testFile: string) => {
    setRunningTest(testFile);
    setTestResults(null);

    try {
      const response = await fetch(`${backendUrl}/run-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testFile }),
      });

      const result = await response.json();
      setTestResults(result);
    } catch (error) {
      setTestResults({
        success: false,
        output: '',
        message: 'Test çalıştırılırken hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
    } finally {
      setRunningTest(null);
    }
  };

  const runAllTests = async () => {
    setRunningTest('all');
    setTestResults(null);

    try {
      const response = await fetch(`${backendUrl}/run-all-tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setTestResults(result);
    } catch (error) {
      setTestResults({
        success: false,
        output: '',
        message: 'Testler çalıştırılırken hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
    } finally {
      setRunningTest(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Navbar */}
      <nav className="bg-[#0d0d0d] p-4 sticky top-0 z-50">
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
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : 'font-bold border-b-[3px] border-blue-300 pb-1'}`}>Test Otomasyonu</Link>
          </div>
          }
          
         
        </div>
        {isOpen && (
          <div className="flex flex-col md:hidden">
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Test Otomasyonu</Link>
          </div>
        )}
      </nav>

      <div className="p-8 pb-20 gap-16 sm:p-20">
        <main>
          {/* Header */}
          <section className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">🧪 Test Otomasyonu</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Playwright ile yazılmış test senaryolarını çalıştırın ve sonuçları görüntüleyin
            </p>
          </section>

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
        </main>
      </div>
    </div>
  );
}
