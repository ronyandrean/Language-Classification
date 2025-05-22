import torch
import pandas as pd
from transformers import (
    XLMRobertaTokenizer, 
    XLMRobertaForSequenceClassification, 
    Trainer, 
    TrainingArguments
)
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


# --- Load Dataset ---
from google.colab import files
uploaded = files.upload()  # Upload your dataset.csv

df = pd.read_csv("dataset.csv", encoding='utf-8')
df.head()

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

# Load tokenizer
tokenizer = XLMRobertaTokenizer.from_pretrained("xlm-roberta-base")

# Tokenize dataset
encodings = tokenizer(list(df[TEXT_COLUMN]), truncation=True, padding=True, max_length=512)
labels = torch.tensor(df[LABEL_COLUMN].values, dtype=torch.long)  # Convert to Tensor

# Custom PyTorch Dataset
from torch.utils.data import Dataset, DataLoader

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

import wandb
wandb.login(key="088ffbecd5a9b0fd2498ded39f8104431140c7d1")

# Training Arguments
training_args = TrainingArguments(
    output_dir="./results",
    run_name="xlm-roberta-language-detection-final",
    report_to="wandb",
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    gradient_accumulation_steps=2,
    num_train_epochs=3,
    learning_rate=2e-5,
    logging_steps=50,
    save_steps=500,
    fp16=True
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
from google.colab import files
!zip -r model.zip /content/results/checkpoint-1650
files.download("model.zip")