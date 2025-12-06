import { X, FileImage } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface PreviewGridProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
}

export default function PreviewGrid({ images, onRemove }: PreviewGridProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <FileImage className="h-16 w-16 mb-4 opacity-50" />
        <p className="text-lg">No images uploaded yet</p>
        <p className="text-sm">Add images to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
          >
            <img
              src={image.preview}
              alt={image.file.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => onRemove(image.id)}
                className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-xs truncate">{image.file.name}</p>
              <p className="text-white/70 text-xs">
                {(image.file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
