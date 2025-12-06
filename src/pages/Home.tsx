import { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Dropzone from '../components/Dropzone';
import PreviewGrid from '../components/PreviewGrid';
import ControlsPanel from '../components/ControlsPanel';
import ProgressBar from '../components/ProgressBar';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function Home() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusLogs, setStatusLogs] = useState<string[]>([]);
  const [processedImages, setProcessedImages] = useState<File[]>([]);

  const handleFilesAdded = useCallback((files: File[]) => {
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages(prev => [...prev, ...newImages]);
    addLog(`Added ${files.length} image(s)`);
  }, []);

  const handleRemoveImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
    addLog('Removed 1 image');
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setProcessedImages([]);
    setProgress(0);
    setStatusLogs([]);
    addLog('Cleared all images');
  }, [images]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setStatusLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleProcess = useCallback(async () => {
    setIsProcessing(true);
    setProgress(0);
    addLog('Starting image processing...');

    // TODO: implement actual image processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    setProcessedImages(images.map(img => img.file));
    addLog(`Successfully processed ${images.length} image(s)`);
    setIsProcessing(false);
  }, [images]);

  const handleDownload = useCallback(() => {
    addLog('Preparing download...');
    // TODO: zip and download processed images
    addLog('Download ready!');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onClearAll={handleClearAll} imageCount={images.length} />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-32">
        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          <div className="space-y-6">
            <Dropzone onFilesAdded={handleFilesAdded} />
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">
                Images ({images.length})
              </h2>
              <PreviewGrid images={images} onRemove={handleRemoveImage} />
            </div>
          </div>

          <div className="lg:sticky lg:top-20 h-fit">
            <ControlsPanel />
          </div>
        </div>
      </main>

      <ProgressBar
        progress={progress}
        isProcessing={isProcessing}
        onProcess={handleProcess}
        onDownload={handleDownload}
        statusLogs={statusLogs}
        canProcess={images.length > 0}
        canDownload={processedImages.length > 0}
      />
    </div>
  );
}
