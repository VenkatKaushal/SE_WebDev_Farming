// src/pages/PredictionPage/components/ResultsDisplay.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, Title, BarChart, LineChart, Text } from '@tremor/react';
import { Download } from 'lucide-react';
import { Button } from '../../../@/components/ui/button';
import { Alert, AlertDescription } from '../../../@/components/ui/alert';

const ResultsDisplay = ({ result }) => {
  if (!result) return null;

  if (!result.success) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {result.error || 'An error occurred during prediction'}
        </AlertDescription>
      </Alert>
    );
  }

  const downloadResults = () => {
    if (result.result_file) {
      // Create download link for batch results
      const link = document.createElement('a');
      link.href = `/download/${result.result_file}`; // Adjust path as needed
      link.download = result.result_file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <Title>Prediction Results</Title>
        
        {/* Single Prediction Result */}
        {typeof result.predicted_yield?.[0] === 'number' && (
          <div className="mt-4">
            <Text>Predicted Yield</Text>
            <div className="text-3xl font-bold text-green-600">
              {result.predicted_yield[0].toFixed(2)} units/hectare
            </div>
          </div>
        )}

        {/* Batch Prediction Results */}
        {Array.isArray(result.predicted_yield) && result.predicted_yield.length > 1 && (
          <>
            <div className="mt-4">
              <Text>Batch Prediction Summary</Text>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="bg-white p-4 rounded-lg">
                  <Text>Average Yield</Text>
                  <div className="text-xl font-bold text-green-600">
                    {(result.predicted_yield.reduce((a, b) => a + b, 0) / result.predicted_yield.length).toFixed(2)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <Text>Highest Yield</Text>
                  <div className="text-xl font-bold text-green-600">
                    {Math.max(...result.predicted_yield).toFixed(2)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <Text>Lowest Yield</Text>
                  <div className="text-xl font-bold text-green-600">
                    {Math.min(...result.predicted_yield).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="mt-6">
              <Text>Yield Distribution</Text>
              <BarChart
                data={result.predicted_yield.map((crop_yield, index) => ({
                  id: index + 1,
                  yield: crop_yield
                }))}
                index="id"
                categories={["yield"]}
                colors={["green"]}
                className="mt-4 h-48"
              />
            </div>

            {/* Download Button */}
            {result.result_file && (
              <Button
                onClick={downloadResults}
                className="mt-4"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Full Results
              </Button>
            )}
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default ResultsDisplay;