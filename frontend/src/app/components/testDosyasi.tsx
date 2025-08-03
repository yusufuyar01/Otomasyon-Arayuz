interface TestDosyasiProps {
  name: string;
  file: string;
  onRunTest: (testFile: string) => void;
  isRunning: boolean;
  runningTest: string | null;
  lastRun?: string;
  lastResult?: {
    success: boolean;
    duration: number;
  };
}

export default function TestDosyasi({ 
  name, 
  file, 
  onRunTest, 
  isRunning, 
  runningTest,
  lastRun,
  lastResult 
}: TestDosyasiProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR');
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-white">{name}</h3>
          <p className="text-sm text-gray-400 mb-2">{file}</p>
          
          {/* Son çalıştırma bilgileri */}
          {lastRun && (
            <div className="text-xs text-gray-500 space-y-1">
              <div>Son çalıştırma: {formatDate(lastRun)}</div>
              {lastResult && (
                <div className="flex items-center gap-2">
                  <span>Sonuç:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    lastResult.success 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {lastResult.success ? '✅ Başarılı' : '❌ Başarısız'}
                  </span>
                  <span className="text-gray-400">
                    ({formatDuration(lastResult.duration)})
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onRunTest(file)}
            disabled={runningTest !== null}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {runningTest === file ? '🔄 Çalışıyor...' : '▶️ Çalıştır'}
          </button>
        </div>
      </div>
    </div>
  );
} 