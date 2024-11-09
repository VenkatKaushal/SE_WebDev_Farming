from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

def predict_crop_yield(input_data):
    try:
        encoder = joblib.load('encoder.pkl')
        scaler = joblib.load('scaler.pkl')
        model = joblib.load('model.pkl')
        
        feature_names = encoder.get_feature_names_out(['Crop', 'Season', 'State'])
        encoded_df = pd.DataFrame(0, index=range(len(input_data)), columns=feature_names)
        
        for idx, row in input_data.iterrows():
            crop_col = f"Crop_{row['Crop']}"
            season_col = f"Season_{row['Season'].strip()}"
            state_col = f"State_{row['State']}"
            
            if crop_col in encoded_df.columns:
                encoded_df.loc[idx, crop_col] = 1
            if season_col in encoded_df.columns:
                encoded_df.loc[idx, season_col] = 1
            if state_col in encoded_df.columns:
                encoded_df.loc[idx, state_col] = 1
    
        numerical_features = ['Production', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
        processed_data = pd.concat([
            input_data[numerical_features].reset_index(drop=True),
            encoded_df
        ], axis=1)
        
        scaled_features = scaler.transform(processed_data)
        predictions = model.predict(scaled_features)
        
        return predictions
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        raise

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if request.is_json:
            content = request.get_json()
            if isinstance(content, dict):
                input_data = pd.DataFrame([content])
            else:
                input_data = pd.DataFrame(content)
        else:
            return jsonify({'success': False, 'error': 'Request must be JSON'}), 400
        
        prediction = predict_crop_yield(input_data)
        
        return jsonify({
            'success': True,
            'predicted_yield': prediction.tolist(),
            'message': 'Prediction successful'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file uploaded'}), 400
            
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400
            
        if file and file.filename.endswith('.csv'):
            input_data = pd.read_csv(file)
            predictions = predict_crop_yield(input_data)
            input_data['Predicted_Yield'] = predictions
            result_filename = 'predictions_' + file.filename
            input_data.to_csv(result_filename, index=False)
            
            return jsonify({
                'success': True,
                'predicted_yield': predictions.tolist(),
                'result_file': result_filename,
                'message': 'Batch prediction successful'
            })
            
        else:
            return jsonify({'success': False, 'error': 'Invalid file format. Please upload a CSV file.'}), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
