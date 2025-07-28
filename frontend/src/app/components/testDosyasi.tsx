interface TestDosyasiProps {
  name: string;
  file: string;
  onRunTest: (testFile: string) => void;
  onStopTest: (testFile: string) => void;
  isRunning: boolean;
  runningTest: string | null;
}

export default function TestDosyasi({ name, file, onRunTest, onStopTest, isRunning, runningTest }: TestDosyasiProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-white">{name}</h3>
          <p className="text-sm text-gray-400">{file}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onRunTest(file)}
            disabled={runningTest !== null}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {runningTest === file ? '🔄 Çalışıyor...' : '▶️ Çalıştır'}
          </button>
          {runningTest === file && (
            <button
              onClick={() => onStopTest(file)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition whitespace-nowrap"
            >
              ⏹️ Durdur
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 