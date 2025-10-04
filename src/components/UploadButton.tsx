'use client';

import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useState } from 'react';

interface UploadButtonProps {
  onUpload: (file: File) => void;
}

export default function UploadButton({ onUpload }: UploadButtonProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          flex items-center justify-center w-32 h-32 rounded-full cursor-pointer
          glass-card transition-all duration-300
          ${isDragging ? 'neon-border-cyan scale-105' : 'border-2 border-blue-500/30'}
          hover:neon-border-blue group
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload 
            className={`w-12 h-12 transition-colors duration-300 ${
              isDragging ? 'text-cyan-400' : 'text-blue-400 group-hover:text-blue-300'
            }`} 
          />
          <span className="text-xs text-blue-300/80">Upload</span>
        </div>
      </label>
    </motion.div>
  );
}
