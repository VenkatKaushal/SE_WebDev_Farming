from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from flask_cors import CORS
from sklearn.preprocessing import StandardScaler
import logging
from waitress import serve  # Production-ready server
import os

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)

# Setup logging for better monitoring
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load models only once when the app starts
logger.info("Loading models...")
encoder = joblib.load('encoder.pkl')  # One-hot encoder
scaler = joblib.load('scaler.pkl')    # Scaler
model = joblib.load('model.pkl')      # Prediction model
logger.info("Models loaded successfully.")

# Feature Columns
numerical_features = ['Production', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
categorical_features = ['Crop', 'Season', 'State']
expected_columns = encoder.get_feature_names_out(categorical_features)

# Function to Predict Crop Yield
def predict_crop_yield(input_data):
    try:
        # One-Hot Encoding for Categorical Features (Only once per request)
        encoded_df = pd.get_dummies(input_data[categorical_features], columns=categorical_features)

        # Ensure all expected columns are present
        missing_cols = set(expected_columns) - set(encoded_df.columns)
        for col in missing_cols:
            encoded_df[col] = 0
        encoded_df = encoded_df[expected_columns]  # Reorder to match the model's expected order

        # Combine Numerical and Encoded Categorical Features
        processed_data = pd.concat([input_data[numerical_features].reset_index(drop=True),
                                    encoded_df.reset_index(drop=True)], axis=1)

        # Scale Features
        scaled_features = scaler.transform(processed_data.values)

        # Predict Using the Pre-trained Model
        predictions = model.predict(scaled_features)
        return predictions

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        raise

# Route for Single Prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if request.is_json:
            content = request.get_json()

            # Convert JSON Input to DataFrame
            if isinstance(content, dict):
                input_data = pd.DataFrame([content])
            else:
                input_data = pd.DataFrame(content)

            # Predict and Return Results
            prediction = predict_crop_yield(input_data)
            return jsonify({
                'success': True,
                'predicted_yield': prediction.tolist(),
                'message': 'Prediction successful'
            })

        else:
            return jsonify({'success': False, 'error': 'Request must be JSON'}), 400

    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 400

# Optimized Startup with Production Server
if __name__ == '__main__':
    # Running using Waitress in production (consider using a more scalable WSGI server)
    logger.info("Starting server with Waitress...")
    port = os.environ.get("PORT", 5000)
    serve(app, host='0.0.0.0', port=port)
