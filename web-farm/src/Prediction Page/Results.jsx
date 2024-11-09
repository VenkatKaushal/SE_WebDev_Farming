// ResultsPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const { prediction, input_data } = location.state || {};

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Prediction Result</h1>
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-indigo-600">Predicted Yield</h2>
                        <p className="text-3xl font-bold">{prediction ? prediction.toFixed(2) : "N/A"}</p>
                        <p className="text-sm text-gray-500">units per area</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Input Parameters:</h3>
                        {input_data && (
                            <>
                                <p><strong>Crop:</strong> {input_data.crop}</p>
                                <p><strong>Season:</strong> {input_data.season}</p>
                                <p><strong>State:</strong> {input_data.state}</p>
                                <p><strong>Production:</strong> {input_data.production}</p>
                                <p><strong>Annual Rainfall:</strong> {input_data.rainfall} mm</p>
                                <p><strong>Fertilizer:</strong> {input_data.fertilizer} kg</p>
                                <p><strong>Pesticide:</strong> {input_data.pesticide} kg</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <Link
                        to="/"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Make Another Prediction
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
