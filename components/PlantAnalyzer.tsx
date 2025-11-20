import React, { useState, useRef } from 'react';
import { analyzePlantImage } from '../services/geminiService';
import { UploadIcon, CameraIcon, LoaderIcon, XIcon } from './Icons';
import MarkdownRenderer from './MarkdownRenderer';

const PlantAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Extract base64 data (remove data:image/jpeg;base64, prefix)
      // This splits the Data URL scheme to get just the raw base64 string
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      
      const analysisText = await analyzePlantImage(base64Data, mimeType);
      setResult(analysisText);
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">Plant Identifier</h2>
        <p className="text-emerald-600">Upload a photo to identify your plant and get expert care advice.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
        {!selectedImage ? (
          <div 
            className="p-12 flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 m-4 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <CameraIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-lg font-medium text-emerald-900">Take a photo or upload image</p>
            <p className="text-sm text-emerald-600 mt-1">Supports JPG, PNG</p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <div className="p-6">
            <div className="relative rounded-xl overflow-hidden max-h-[400px] bg-slate-100 mb-6 group">
              <img 
                src={selectedImage} 
                alt="Selected plant" 
                className="w-full h-full object-contain mx-auto"
              />
              <button 
                onClick={handleClear}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Remove image"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {!result && (
              <div className="flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-full text-white font-medium text-lg transition-all ${
                    isAnalyzing 
                      ? 'bg-emerald-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5" />
                      <span>Identify Plant</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="border-t border-emerald-100 bg-emerald-50/30 p-6 md:p-8 animate-slide-up">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
              <span className="w-8 h-1 bg-emerald-500 rounded mr-3"></span>
              Analysis Result
            </h3>
            <MarkdownRenderer content={result} />
            <div className="mt-8 flex justify-center">
              <button 
                onClick={handleClear}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm underline decoration-2 underline-offset-2"
              >
                Analyze another plant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantAnalyzer;