import pandas as pd

def compute_basic_stats(df):
    """Calculates mean, median, standard deviation, min, and max for numeric columns."""
    numeric_df = df.select_dtypes(include='number')
    if numeric_df.empty:
        return {}
    
    # Using Pandas describe and converting to dictionary
    stats = numeric_df.describe().to_dict()
    
    # Add median (50% is included in describe, but explicitly mapping it for API clarity)
    for col in numeric_df.columns:
        stats[col]['median'] = float(numeric_df[col].median())
        stats[col]['variance'] = float(numeric_df[col].var())
        
    return stats

def compute_correlations(df):
    """Calculates Pearson correlation matrix for numeric columns."""
    numeric_df = df.select_dtypes(include='number')
    if numeric_df.empty or len(numeric_df.columns) < 2:
        return {}
    
    # Calculate Pearson correlation
    corr_matrix = numeric_df.corr(method='pearson')
    return corr_matrix.to_dict()