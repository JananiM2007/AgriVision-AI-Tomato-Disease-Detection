let model;

const classNames = [
    "Tomato Bacterial Spot",
    "Tomato Early Blight",
    "Tomato Late Blight",
    "Tomato Leaf Mold",
    "Tomato Septoria Leaf Spot",
    "Tomato Spider Mites",
    "Tomato Target Spot",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato Mosaic Virus",
    "Healthy"
];

async function loadModel() {
    try {
        model = await tf.loadLayersModel("model/model.json");
        console.log("✅ Model Loaded Successfully");
        console.log(model);
    } catch (err) {
        console.error("❌ Model Loading Failed");
        console.error(err);
    }
}

loadModel();
const upload =
document.getElementById("imageUpload");

const preview =
document.getElementById("previewImage");

const predictBtn =
document.getElementById("predictBtn");

const prediction =
document.getElementById("prediction");

const confidenceBar =
document.getElementById("confidenceBar");

const confidenceText =
document.getElementById("confidenceText");

const topPredictions =
document.getElementById("topPredictions");
upload.addEventListener("change",function(){

    const file=this.files[0];

    if(file){

        preview.src=
        URL.createObjectURL(file);

        preview.style.display="block";

    }

});
predictBtn.addEventListener("click",predictImage);

async function predictImage(){

    if(!preview.src){

        alert("Upload an image first.");

        return;

    }

    let tensor=tf.browser.fromPixels(preview)

    .resizeNearestNeighbor([128,128])

    .toFloat()

    .div(255.0)

    .expandDims();

    const output=model.predict(tensor);

    const predictions=
    await output.data();

    displayResults(predictions);

}
function displayResults(predictions){

    let max=Math.max(...predictions);

    let index=predictions.indexOf(max);

    prediction.innerHTML=

    classNames[index];

    confidenceBar.style.width=

    (max*100).toFixed(1)+"%";

    confidenceText.innerHTML=

    (max*100).toFixed(2)+" %";

    showTop3(predictions);

    updateDiseaseInfo(index);

}
function showTop3(predictions){

    topPredictions.innerHTML="";

    const arr=[];

    predictions.forEach((value,index)=>{

        arr.push({

            disease:classNames[index],

            confidence:value

        });

    });

    arr.sort((a,b)=>

    b.confidence-a.confidence);

    arr.slice(0,3).forEach(item=>{

        const li=

        document.createElement("li");

        li.innerHTML=

        `${item.disease}
        <span>${(item.confidence*100).toFixed(2)}%</span>`;

        topPredictions.appendChild(li);

    });

}
const diseaseInfo={

"Tomato Bacterial Spot":{

description:"Bacterial disease causing dark spots on leaves.",

treatment:"Use copper-based bactericides.",

prevention:"Avoid overhead watering."

},

"Tomato Early Blight":{

description:"Fungal disease causing concentric brown spots.",

treatment:"Apply fungicide and remove infected leaves.",

prevention:"Rotate crops regularly."

},

"Tomato Late Blight":{

description:"Serious fungal disease causing rapid wilting.",

treatment:"Use protective fungicides.",

prevention:"Avoid excessive moisture."

},

"Tomato Leaf Mold":{

description:"Fungal disease common in humid conditions.",

treatment:"Improve ventilation and use fungicides.",

prevention:"Reduce humidity."

},

"Tomato Septoria Leaf Spot":{

description:"Small circular leaf spots leading to defoliation.",

treatment:"Remove infected foliage.",

prevention:"Avoid splashing water."

},

"Tomato Spider Mites":{

description:"Tiny mites feeding on leaves causing yellow speckles.",

treatment:"Use miticides or insecticidal soap.",

prevention:"Inspect plants regularly."

},

"Tomato Target Spot":{

description:"Brown target-like lesions on leaves.",

treatment:"Apply appropriate fungicides.",

prevention:"Ensure good air circulation."

},

"Tomato Yellow Leaf Curl Virus":{

description:"Viral disease causing yellow curled leaves.",

treatment:"Control whiteflies.",

prevention:"Use resistant varieties."

},

"Tomato Mosaic Virus":{

description:"Virus causing mottled and distorted leaves.",

treatment:"Remove infected plants.",

prevention:"Disinfect tools."

},

"Healthy":{

description:"Leaf appears healthy.",

treatment:"No treatment needed.",

prevention:"Continue proper crop management."

}

};

function updateDiseaseInfo(index){

const disease=

classNames[index];

document.getElementById("description").innerHTML=

diseaseInfo[disease].description;

document.getElementById("treatment").innerHTML=

diseaseInfo[disease].treatment;

document.getElementById("prevention").innerHTML=

diseaseInfo[disease].prevention;

}