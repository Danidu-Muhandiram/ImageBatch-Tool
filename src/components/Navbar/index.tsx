import { Trash2, Image } from 'lucide-react';

interface NavbarProps {
  onClearAll: () => void;
  imageCount: number;
}

export default function Navbar({ onClearAll, imageCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ImageBatch Tool
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClearAll}
            disabled={imageCount === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        </div>
      </div>
    </header>
  );
}
