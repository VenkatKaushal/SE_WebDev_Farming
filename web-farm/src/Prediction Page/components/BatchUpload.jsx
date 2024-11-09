// src/pages/PredictionPage/components/BatchUpload.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Text, Title } from '@tremor/react';
import { Upload, File, X, Check, Loader2 } from 'lucide-react';
import { Button } from '../../../@/components/ui/button';
import { Alert, AlertDescription } from '../../../@/components/ui/alert';
import { batchPredictCropYield } from '../utils/api';

const BatchUpload = ({ onPredictionResult, setIsLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file?.type === "text/csv") {
      setSelectedFile(file);
      setError(null);
    } else {
      setError("Please upload a CSV file");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file?.type === "text/csv") {
      setSelectedFile(file);
      setError(null);
    } else {
      setError("Please upload a CSV file");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    try {
      const result = await batchPredictCropYield(selectedFile);
      onPredictionResult(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      onPredictionResult(null);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Title>Batch Prediction</Title>
      <Text>Upload a CSV file with multiple predictions</Text>

      <div
        className={`
          border-2 border-dashed rounded-lg p-8
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${selectedFile ? 'bg-green-50' : ''}
          transition-colors duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          {selectedFile ? (
            <>
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <Text>{selectedFile.name}</Text>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
                className="text-red-500"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400" />
              <Text className="text-center text-gray-600">
                Drag and drop your CSV file here, or click to select
              </Text>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Select File
                </Button>
              </label>
            </>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="w-full"
      >
        Upload and Predict
      </Button>
    </motion.div>
  );
};

export default BatchUpload;