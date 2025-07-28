interface TestDosyasiProps {
  name: string;
  file: string;
  onRunTest: (testFile: string) => void;
  isRunning: boolean;
  runningTest: string | null;
}

export default function TestDosyasi({ name, file, onRunTest, isRunning, runningTest }: TestDosyasiProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-white">{name}</h3>
          <p className="text-sm text-gray-400">{file}</p>
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