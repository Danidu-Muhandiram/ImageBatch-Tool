import { useState, useCallback } from 'react';
import { Upload, FileImage } from 'lucide-react';

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export default function Dropzone({ onFilesAdded }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onFilesAdded(files);
    }
  }, [onFilesAdded]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFilesAdded(files);
    }
  }, [onFilesAdded]);

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center transition-all
        ${isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400'
        }
      `}
    >
      <input
        type="file"
        id="file-upload"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center gap-4"
      >
        <div className="p-4 bg-blue-100 rounded-full">
          {isDragging ? (
            <FileImage className="h-12 w-12 text-blue-600" />
          ) : (
            <Upload className="h-12 w-12 text-blue-600" />
          )}
        </div>
        
        <div>
          <p className="text-lg font-semibold text-gray-700">
            {isDragging ? 'Drop images here' : 'Drag & drop images here'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to browse
          </p>
        </div>
        
        <div className="text-xs text-gray-400">
          Supports: JPG, PNG, WebP, HEIC, TIFF
        </div>
      </label>
    </div>
  );
}
