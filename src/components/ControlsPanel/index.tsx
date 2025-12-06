import { useState } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  FileType, 
  Image as ImageIcon, 
  FileSignature,
  Droplet
} from 'lucide-react';

export default function ControlsPanel() {
  const [settings, setSettings] = useState({
    resizeEnabled: false,
    width: 1920,
    height: 1080,
    maintainRatio: true,
    
    compressEnabled: false,
    quality: 80,
    
    convertEnabled: false,
    format: 'jpeg',
    
    renameEnabled: false,
    namePattern: 'image_{n}',
    
    watermarkEnabled: false,
    watermarkText: '',
    watermarkOpacity: 50,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Processing Options</h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Resize</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.resizeEnabled}
              onChange={(e) => updateSetting('resizeEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {settings.resizeEnabled && (
          <div className="pl-7 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-gray-600">Width</label>
                <input
                  type="number"
                  value={settings.width}
                  onChange={(e) => updateSetting('width', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Height</label>
                <input
                  type="number"
                  value={settings.height}
                  onChange={(e) => updateSetting('height', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.maintainRatio}
                onChange={(e) => updateSetting('maintainRatio', e.target.checked)}
                className="rounded"
              />
              Maintain aspect ratio
            </label>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Minimize2 className="h-5 w-5 text-green-600" />
            <span className="font-semibold">Compress</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.compressEnabled}
              onChange={(e) => updateSetting('compressEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {settings.compressEnabled && (
          <div className="pl-7 space-y-2">
            <label className="text-sm text-gray-600">
              Quality: {settings.quality}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={settings.quality}
              onChange={(e) => updateSetting('quality', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileType className="h-5 w-5 text-purple-600" />
            <span className="font-semibold">Convert</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.convertEnabled}
              onChange={(e) => updateSetting('convertEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {settings.convertEnabled && (
          <div className="pl-7">
            <select
              value={settings.format}
              onChange={(e) => updateSetting('format', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-orange-600" />
            <span className="font-semibold">Rename</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.renameEnabled}
              onChange={(e) => updateSetting('renameEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {settings.renameEnabled && (
          <div className="pl-7">
            <input
              type="text"
              value={settings.namePattern}
              onChange={(e) => updateSetting('namePattern', e.target.value)}
              placeholder="image_{n}"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">{'{n}'} = number</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-cyan-600" />
            <span className="font-semibold">Watermark</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.watermarkEnabled}
              onChange={(e) => updateSetting('watermarkEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {settings.watermarkEnabled && (
          <div className="pl-7 space-y-2">
            <input
              type="text"
              value={settings.watermarkText}
              onChange={(e) => updateSetting('watermarkText', e.target.value)}
              placeholder="Watermark text"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <div>
              <label className="text-sm text-gray-600">
                Opacity: {settings.watermarkOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.watermarkOpacity}
                onChange={(e) => updateSetting('watermarkOpacity', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
