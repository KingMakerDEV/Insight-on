import numpy as np
from sklearn.linear_model import LinearRegression

def run_linear_regression(df, target_col, feature_cols):
    """Runs a standard linear regression model and returns coefficients."""
    # Drop rows with NaNs in the required columns
    df_clean = df.dropna(subset=[target_col] + feature_cols)
    
    if df_clean.empty:
        raise ValueError("Insufficient data after removing null values.")
        
    X = df_clean[feature_cols].values
    y = df_clean[target_col].values
    
    model = LinearRegression()
    model.fit(X, y)
    
    # Calculate R-squared score
    r_squared = model.score(X, y)
    
    return {
        "coefficients": dict(zip(feature_cols, model.coef_.tolist())),
        "intercept": float(model.intercept_),
        "r_squared": float(r_squared)
    }