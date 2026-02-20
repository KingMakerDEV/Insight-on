import numpy as np

def clean_json_payload(data_dict):
    """Recursively replaces NaN/Infinity with None for valid JSON serialization."""
    if isinstance(data_dict, dict):
        return {k: clean_json_payload(v) for k, v in data_dict.items()}
    elif isinstance(data_dict, list):
        return [clean_json_payload(v) for v in data_dict]
    elif isinstance(data_dict, float):
        if np.isnan(data_dict) or np.isinf(data_dict):
            return None
    return data_dict