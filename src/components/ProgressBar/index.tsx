import { Download, Play, Loader2 } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  isProcessing: boolean;
  onProcess: () => void;
  onDownload: () => void;
  statusLogs: string[];
  canProcess: boolean;
  canDownload: boolean;
}

export default function ProgressBar({
  progress,
  isProcessing,
  onProcess,
  onDownload,
  statusLogs,
  canProcess,
  canDownload
}: ProgressBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {isProcessing ? 'Processing...' : 'Ready'}
            </span>
            <span className="text-sm text-gray-500">
              {progress}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onProcess}
            disabled={!canProcess || isProcessing}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Process Images</span>
              </>
            )}
          </button>

          <button
            onClick={onDownload}
            disabled={!canDownload || isProcessing}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Download className="h-5 w-5" />
            <span>Download ZIP</span>
          </button>
        </div>

        {statusLogs.length > 0 && (
          <div className="mt-3 p-3 bg-gray-100 rounded-lg max-h-24 overflow-y-auto scrollbar-hide">
            {statusLogs.slice(-3).map((log, index) => (
              <p key={index} className="text-xs text-gray-600 font-mono">
                {log}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
