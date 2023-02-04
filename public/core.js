//const URL = 'https://teachablemachine.withgoogle.com/models/nAWJsjhIY/'; 동서양 const URL =
const URL = 'https://teachablemachine.withgoogle.com/models/bnwLZHdXn/';
let model, webcam, labelContainer, maxPredictions;
const fileInput = document.getElementById('file-upload');
let fileLabel = document.getElementById('file-upload-label');
let button = document.getElementById('predict');
let selectedFile;
let image;
let loading = document.getElementById('spinner');
let div;
window.onload = () => {
    init();
};
fileInput.onchange = () => {
    selectedFile = [...fileInput.files];
    button.disabled = false;
    image = document.getElementById('image');
    image.src = window.URL.createObjectURL(fileInput.files[0]);
};
async function init() {
    loading.style.display = 'block';
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById('label-container');
    fileInput.disabled = false;
    fileLabel.style.opacity = 1;
    loading.style.display = 'none';
    console.log(maxPredictions);
}
async function predict() {
    loading.style.display = 'block';
    const prediction = await model.predict(image, false);
    let max = prediction[0].probability.toFixed(2) * 100;
    let maxIndex = 0;
    for (let i = 0; i < maxPredictions; i++) {
        let slider = document.createElement('input');
        slider.style.display = 'block';
        slider.setAttribute('class', 'slider');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', '0');
        slider.setAttribute('max', '100');
        slider.setAttribute('disabled', '');
        slider.setAttribute('value', prediction[i].probability.toFixed(2) * 100);
        if (max < prediction[i].probability.toFixed(2) * 100) {
            max = prediction[i].probability.toFixed(2) * 100;
            maxIndex = i;
        }
        const classPrediction =
            prediction[i].className +
            ': ' +
            Math.ceil(prediction[i].probability.toFixed(2) * 100) +
            '%';
        labelContainer.children[i].innerHTML = classPrediction;
        labelContainer.children[i].appendChild(slider);
    }
	
    div = document.getElementById('result-div');
	
    div.children[0].innerHTML = '당신의 닮은꼴은...';
    div.children[1].innerHTML = prediction[maxIndex].className;
	
    let name = '';
    switch (prediction[maxIndex].className) {
        case '안철수':
            name = 'ahn.jpg';
            break;
        case '홍준표':
            name = 'hong.jpg';
            break;
        case '문재인':
            name = 'moon.jpg';
            break;
        case '윤석열':
            name = 'yoon.jpg';
            break;
        case '이재명':
            name = 'lee.jpg';
            break;
        case '오세훈':
            name = 'oh.jpg';
            break;
    }
    let img = document.getElementById('result-img');
    img.style.display = 'block';
    // img.setAttribute('height', '100%');
    // img.setAttribute('width', '100%');
    img.src = 'public/' + name;
    loading.style.display = 'none';
}