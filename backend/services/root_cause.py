# services/root_cause.py

def analyze_root_cause(correlation_dict, threshold=0.7):
    """
    Interpret strong correlations into narratives.
    """

    if not correlation_dict:
        return "No correlation data available."

    strong_relations = []

    for pair, value in correlation_dict.items():
        if abs(value) >= threshold:
            direction = "positively" if value > 0 else "negatively"
            strong_relations.append(
                f"{pair} are strongly {direction} correlated ({round(value,2)})"
            )

    if not strong_relations:
        return "No strong correlations detected."

    return " ; ".join(strong_relations)