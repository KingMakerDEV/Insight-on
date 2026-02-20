import pandas as pd

def detect_schema(df):
    """Detects the data type of each column for downstream mapping."""
    schema = {}
    for col in df.columns:
        dtype = str(df[col].dtype)
        
        if pd.api.types.is_numeric_dtype(df[col]):
            # Differentiate between integer IDs and continuous metrics
            if pd.api.types.is_integer_dtype(df[col]) and df[col].nunique() == len(df):
                col_type = "id"
            else:
                col_type = "numeric"
        elif pd.api.types.is_datetime64_any_dtype(df[col]):
            col_type = "date"
        elif pd.api.types.is_string_dtype(df[col]) or pd.api.types.is_object_dtype(df[col]):
            # Check if it could be a date hiding as a string
            try:
                pd.to_datetime(df[col].dropna().head(), format='mixed')
                col_type = "date"
            except (ValueError, TypeError):
                col_type = "categorical"
        else:
            col_type = "unknown"
            
        schema[col] = {
            "type": col_type,
            "pandas_dtype": dtype,
            "null_count": int(df[col].isnull().sum())
        }
    return schema