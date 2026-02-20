def allowed_file(filename):
    """Check if the file has a valid .csv extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'csv'

def validate_dataframe(df):
    """Ensure the DataFrame is not empty and has valid columns."""
    if df.empty:
        raise ValueError("The uploaded CSV is empty.")
    if len(df.columns) == 0:
        raise ValueError("The CSV has no columns.")
    return True