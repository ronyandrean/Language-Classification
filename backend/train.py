import torch
import pandas as pd
from torch.utils.data import Dataset, DataLoader
from transformers import XLMRobertaTokenizer, XLMRobertaForSequenceClassification, Trainer, TrainingArguments
from sklearn.preprocessing import LabelEncoder

# Check if GPU is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load dataset
data_path = "D:\BINUS\Semester 4\Machine Learning\Language-Detector\dataset\dataset.csv"
df = pd.read_csv(data_path, encoding="utf-8-sig")

# Ensure dataset has required columns
TEXT_COLUMN = "Text" 
LABEL_COLUMN = "language" 

if TEXT_COLUMN not in df.columns or LABEL_COLUMN not in df.columns:
    raise ValueError(f"Dataset must contain '{TEXT_COLUMN}' and '{LABEL_COLUMN}' columns!")

# Remove NaN values and reset index
df = df[[TEXT_COLUMN, LABEL_COLUMN]].dropna().reset_index(drop=True)

# Encode labels
label_encoder = LabelEncoder()
df[LABEL_COLUMN] = label_encoder.fit_transform(df[LABEL_COLUMN])

# Create id2label and label2id dictionaries
id2label = {i: label for i, label in enumerate(label_encoder.classes_)}
label2id = {label: i for i, label in enumerate(label_encoder.classes_)}

# Save to config.json format
import json
config_update = {
    "id2label": id2label,
    "label2id": label2id
}

# Load tokenizer
tokenizer = XLMRobertaTokenizer.from_pretrained("xlm-roberta-base")

# Tokenize dataset
encodings = tokenizer(list(df[TEXT_COLUMN]), truncation=True, padding=True, max_length=512)
labels = torch.tensor(df[LABEL_COLUMN].values, dtype=torch.long)  # Convert to Tensor

# Custom PyTorch Dataset
class CustomDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels  # Already a tensor

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item["labels"] = self.labels[idx]  # Trainer expects 'labels' key
        return item 

    def __len__(self):
        return len(self.labels)

# Split dataset
train_size = int(0.8 * len(df))
train_encodings = {key: val[:train_size] for key, val in encodings.items()}
train_labels = labels[:train_size]
val_encodings = {key: val[train_size:] for key, val in encodings.items()}
val_labels = labels[train_size:]

train_dataset = CustomDataset(train_encodings, train_labels)
val_dataset = CustomDataset(val_encodings, val_labels)

# Load Model
model = XLMRobertaForSequenceClassification.from_pretrained("xlm-roberta-base", num_labels=len(label_encoder.classes_))
model.to(device)

# Optional: Update model config and save
model.config.id2label = id2label
model.config.label2id = label2id

# Save updated config.json to the last checkpoint directory
with open("config.updated.json", "w", encoding="utf-8") as f:
    json.dump(model.config.to_dict(), f, indent=2, ensure_ascii=False)

# Training Arguments
training_args = TrainingArguments(
    output_dir="./results",
    eval_strategy="epoch", 
    save_strategy="epoch",
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    num_train_epochs=0.25,
    logging_dir="./logs",
    logging_steps=10,
    load_best_model_at_end=True,
    save_total_limit=2,
    fp16=torch.cuda.is_available()
)


# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset
)

# Train Model
trainer.train()

# Save Model 
model_path = "../models"
model.save_pretrained(model_path)
tokenizer.save_pretrained(model_path)

import joblib
joblib.dump(label_encoder, f"{model_path}/label_encoder.pkl")
print(f"Model saved to {model_path}")