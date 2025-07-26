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
      <h3 className="text-lg font-semibold mb-2 text-white">{name}</h3>
      <p className="text-sm text-gray-400 mb-4">{file}</p>
      <button
        onClick={() => onRunTest(file)}
        disabled={runningTest !== null}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {runningTest === file ? '🔄 Çalışıyor...' : '▶️ Çalıştır'}
      </button>
    </div>
  );
} 