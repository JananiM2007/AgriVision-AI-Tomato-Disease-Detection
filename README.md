# 🍅 AgriVision AI

## On-Device Tomato Disease Detection using CNN

AgriVision AI is an open-source browser-based application that detects tomato leaf diseases using a Convolutional Neural Network (CNN) trained entirely from scratch. The trained model is converted to TensorFlow.js, enabling all predictions to run directly in the user's browser without relying on cloud AI services.

This project was developed for **OSDHack 2026** under the **On-Device AI** theme.

---

## Features

- CNN built completely from scratch
- No Transfer Learning
- Browser-based AI inference using TensorFlow.js
- Offline-capable after model loading
- Privacy-friendly (no image upload to any server)
- Detects multiple tomato leaf diseases
- Displays confidence score
- Shows top predictions
- Responsive web interface

---

## Dataset

**PlantVillage Dataset**

Tomato Classes:

- Tomato Bacterial Spot
- Tomato Early Blight
- Tomato Late Blight
- Tomato Leaf Mold
- Tomato Septoria Leaf Spot
- Tomato Spider Mites
- Tomato Target Spot
- Tomato Yellow Leaf Curl Virus
- Tomato Mosaic Virus
- Tomato Healthy

---

## Model Architecture

- Input Size: 128 × 128 × 3
- CNN built from scratch
- ReLU Activation
- Max Pooling
- Dropout
- Dense Layers
- Softmax Output

Optimizer:
Adam

Loss Function:
Sparse Categorical Crossentropy

Epochs:
10

Validation Accuracy:
93.88%

---

## Tech Stack

- Python
- TensorFlow
- TensorFlow.js
- NumPy
- Matplotlib
- HTML
- CSS
- JavaScript

---

## Project Workflow

Image
↓
Preprocessing
↓
CNN Feature Extraction
↓
Classification
↓
Disease Prediction
↓
Confidence Score

---

## Results

Validation Accuracy

93.88%

---

## Future Improvements

- Grad-CAM Visualization
- Disease Severity Estimation
- Treatment Recommendation
- Mobile Friendly UI
- TensorFlow Lite Support
- Additional Crop Disease Detection

---



## License

MIT License

---

## Author

Janani M

Developed for OSDHack 2026
