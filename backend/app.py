from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import XLMRobertaTokenizer, XLMRobertaForSequenceClassification
import torch
import os
import json

app = Flask(__name__)
CORS(app)

# Model Path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_FOLDER = "checkpoint-1650" 
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "content", "results", MODEL_FOLDER)

MODEL_PATH = os.path.abspath(MODEL_PATH)

print(f" Looking for model at: {MODEL_PATH}") 

try:
    # Load model and tokenizer
    model = XLMRobertaForSequenceClassification.from_pretrained(
        MODEL_PATH,
        local_files_only=True
    )
    
    tokenizer = XLMRobertaTokenizer.from_pretrained("xlm-roberta-base")
    
    # Load config for labels
    config_path = os.path.join(MODEL_PATH, "config.json")
    with open(config_path) as f:
        config = json.load(f)
    id2label = config.get("id2label", {0: 'Arabic', 
                                       1: 'Chinese',
                                       2: 'Dutch',
                                       3: 'English',
                                       4: 'Estonian',
                                       5: 'French',
                                       6: 'Hindi',
                                       7: 'Indonesian',
                                       8: 'Japanese',
                                       9: 'Korean',
                                       10: 'Latin',
                                       11: 'Persian',
                                       12: 'Portugese',
                                       13: 'Pushto',
                                       14: 'Romanian',
                                       15: 'Russian',
                                       16: 'Spanish',
                                       17: 'Swedish',
                                       18: 'Tamil',
                                       19: 'Thai',
                                       20: 'Turkish',
                                       21: 'Urdu'
                                       })
    
    print(f"Successfully loaded model from {MODEL_PATH}")
    print(f"Label mapping: {id2label}")

except Exception as e:
    print(f"Critical error: {str(e)}")
    raise


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    try:
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
        
        with torch.no_grad():
            outputs = model(**inputs)
            prediction = torch.argmax(outputs.logits).item()
        
        language = id2label.get(str(prediction), "unknown")
        confidence = torch.softmax(outputs.logits, dim=1)[0][prediction].item()
        
        return jsonify({
            "language": language,
            "confidence": float(confidence),
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "failed"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)