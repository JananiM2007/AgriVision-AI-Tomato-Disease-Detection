from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os

app = Flask(__name__)

# ----------------------------
# Load Trained Model
# ----------------------------

model = load_model("model/agri_model.h5")

# ----------------------------
# Class Names
# ----------------------------

class_names = [
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite",
    "Tomato__Target_Spot",
    "Tomato__Tomato_YellowLeaf__Curl_Virus",
    "Tomato__Tomato_mosaic_virus",
    "Tomato_healthy"
]

# ----------------------------
# Disease Information
# ----------------------------

disease_info = {

"Tomato_Bacterial_spot":{
"description":"Bacterial disease causing dark circular spots on leaves and fruits.",
"treatment":"Use copper-based bactericides and remove infected leaves."
},

"Tomato_Early_blight":{
"description":"Fungal disease causing brown concentric rings.",
"treatment":"Apply fungicides and avoid overhead irrigation."
},

"Tomato_Late_blight":{
"description":"Serious fungal disease that rapidly destroys plants.",
"treatment":"Use chlorothalonil or mancozeb fungicides."
},

"Tomato_Leaf_Mold":{
"description":"Fungal infection causing yellow patches and mold underneath leaves.",
"treatment":"Improve ventilation and apply fungicide."
},

"Tomato_Septoria_leaf_spot":{
"description":"Leaf disease producing many tiny brown spots.",
"treatment":"Remove infected leaves and spray fungicide."
},

"Tomato_Spider_mites_Two_spotted_spider_mite":{
"description":"Spider mites suck plant sap causing yellow leaves.",
"treatment":"Use miticides or neem oil."
},

"Tomato__Target_Spot":{
"description":"Circular brown lesions appearing on leaves.",
"treatment":"Apply recommended fungicides."
},

"Tomato__Tomato_YellowLeaf__Curl_Virus":{
"description":"Virus transmitted by whiteflies causing curled yellow leaves.",
"treatment":"Control whiteflies and remove infected plants."
},

"Tomato__Tomato_mosaic_virus":{
"description":"Virus causing mosaic pattern and distorted leaves.",
"treatment":"Destroy infected plants and disinfect tools."
},

"Tomato_healthy":{
"description":"Healthy Tomato Leaf",
"treatment":"No treatment required."
}

}

# ----------------------------
# Home Page
# ----------------------------

@app.route("/")
def home():
    return render_template("index.html")

# ----------------------------
# Prediction API
# ----------------------------

@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error":"No image uploaded"})

    image = request.files["image"]

    img = Image.open(image).convert("RGB")
    img = img.resize((128,128))

    img = np.array(img)

    img = np.expand_dims(img,axis=0)

    prediction = model.predict(img)

    confidence = float(np.max(prediction))*100

    predicted_index = np.argmax(prediction)

    disease = class_names[predicted_index]

    response = {

        "disease": disease,

        "confidence": round(confidence,2),

        "description": disease_info[disease]["description"],

        "treatment": disease_info[disease]["treatment"]

    }

    return jsonify(response)

# ----------------------------
# Run App
# ----------------------------

if __name__ == "__main__":
    app.run(debug=True)