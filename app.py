import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import joblib

def predict_crop_yield(input_data):
    try:
        
        encoder = joblib.load('encoder.pkl')
        scaler = joblib.load('scaler.pkl')
        model = joblib.load('model.pkl')
        
        
        required_columns = ['Crop', 'Season', 'State', 'Production', 
                          'Annual_Rainfall', 'Fertilizer', 'Pesticide']
        missing_cols = set(required_columns) - set(input_data.columns)
        if missing_cols:
            raise ValueError(f"Missing required columns: {missing_cols}")

        
        if 'Crop_Year' in input_data.columns:
            input_data = input_data.drop('Crop_Year', axis=1)
        if 'Area' in input_data.columns:
            input_data = input_data.drop('Area', axis=1)
        
        
        if input_data.isnull().any().any():
            print("Warning: Input data contains missing values. Dropping rows with missing values.")
            input_data = input_data.dropna()
            
        
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

def main():
    try:
        test_data = pd.DataFrame({
            'Crop': ['Wheat', 'Rice'],
            'Season': ['Rabi', 'Kharif'],
            'State': ['Karnataka', 'Assam'],
            'Production': [110054, 398311],
            'Annual_Rainfall': [1266.7, 2051.4],
            'Fertilizer': [8060708.66, 57802260.86],
            'Pesticide': [26256.38, 188280.98]
        })
    
        predictions = predict_crop_yield(test_data)
    
        test_data['Predicted_Yield'] = predictions
    
        print("\nPrediction Results:")
        print(test_data[['Crop', 'State', 'Season', 'Predicted_Yield']])
    
        test_data.to_csv('predictions_output.csv', index=False)
        
    except Exception as e:
        print(f"Error in main execution: {str(e)}")

if __name__ == "__main__":
    main()