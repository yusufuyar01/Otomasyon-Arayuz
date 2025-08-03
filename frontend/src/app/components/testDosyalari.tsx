import TestDosyasi from './testDosyasi';

interface TestFile {
  name: string;
  file: string;
  path: string;
  category: string;
  lastRun?: string;
  lastResult?: {
    success: boolean;
    duration: number;
  };
}

interface TestDosyalariProps {
  tests: TestFile[];
  loading: boolean;
  runningTest: string | null;
  onRunTest: (testFile: string) => void;
}

export default function TestDosyalari({ tests, loading, runningTest, onRunTest }: TestDosyalariProps) {
  // Testleri kategorilere göre grupla
  const groupedTests = tests.reduce((groups, test) => {
    const category = test.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(test);
    return groups;
  }, {} as Record<string, typeof tests>);

  return (
    <section className="mb-8">
      <div className="bg-[#0d0d0d] rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">📋 Test Dosyaları</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="text-white">Test dosyaları yükleniyor...</div>
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-white">Test dosyası bulunamadı</div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTests).map(([category, categoryTests]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-300 border-b border-gray-600 pb-2">
                  📁 {category}
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {categoryTests.map((test) => (
                    <TestDosyasi
                      key={test.file}
                      name={test.name}
                      file={test.file}
                      onRunTest={onRunTest}
                      isRunning={runningTest === test.file}
                      runningTest={runningTest}
                      lastRun={test.lastRun}
                      lastResult={test.lastResult}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 