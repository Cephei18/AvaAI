let currentStep = 1;
let faceDescription = ""; 
let selectedStyle = "";

function goToStep(step) {
    document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step${step}`).classList.remove('hidden');
    document.getElementById('progressBar').style.width = `${step * 25}%`;
    
    if(step === 2) {
        startFaceAnalysis();
    }
}

document.getElementById('photoInput').addEventListener('change', function(e) {
    if (this.files[0]) {
        document.getElementById('fileName').innerText = this.files[0].name;
        document.getElementById('toStep2').classList.remove('hidden');
    }
});

async function startFaceAnalysis() {
    const file = document.getElementById('photoInput').files[0];
    const base64 = await toBase64(file);
    
    const messages = ["Analyzing face cut...", "Detecting hair texture...", "Matching skin undertones...", "Locking identity..."];
    let i = 0;
    const interval = setInterval(() => {
        document.getElementById('loadingText').innerText = messages[i % messages.length];
        i++;
    }, 800);

    try {
        // FIX 1: Use backticks and ${} to inject the key from config.js
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_KEY}`, {
            method: "POST",
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Analyze this face. Provide a 1-sentence physical description focusing on gender, face shape, and hair style. Start with 'A person with...'" },
                        { inline_data: { mime_type: "image/jpeg", data: base64.split(',')[1] } }
                    ]
                }]
            })
        });
        const data = await response.json();
        faceDescription = data.candidates[0].content.parts[0].text;
        
        clearInterval(interval);
        goToStep(3); 
    } catch (e) {
        console.error(e);
        alert("Vision analysis failed. Check if CONFIG.GEMINI_KEY is correct.");
        clearInterval(interval);
        goToStep(1);
    }
}

async function generateMagic() {
    if(!selectedStyle) return alert("Please select a style first!");
    
    const accessories = document.getElementById('accInput').value;
    const vibe = document.getElementById('vibeSelect').value;
    
    goToStep(2);
    document.getElementById('loadingText').innerText = "Painting your masterpiece...";

    const finalPrompt = `A professional high-quality avatar of ${faceDescription}. 
                         Style: ${selectedStyle}. 
                         Wearing: ${accessories}. 
                         Setting: ${vibe}. 
                         Same facial features and gender as description. 
                         4k, artistic lighting, profile picture format.`;

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
            // FIX 2: Use Template Literals (backticks) to send the Bearer token correctly
            headers: { 
                "Authorization": `Bearer ${CONFIG.HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ inputs: finalPrompt }),
        });

        if (!response.ok) throw new Error("Hugging Face API Error");

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        
        document.getElementById('finalAvatar').innerHTML = `<img src="${imgUrl}" class="w-full h-full object-cover">`;
        
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = imgUrl; // Using the imgUrl generated in generateMagic
            link.download = 'my-avatar.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        goToStep(4);
    } catch (e) {
        console.error(e);
        alert("Drawing failed! check your Hugging Face Token.");
        goToStep(3);
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('border-cyan-500', 'bg-cyan-900/20'));
        btn.classList.add('border-cyan-500', 'bg-cyan-900/20');
        selectedStyle = btn.getAttribute('data-style');
    });
});


let currentStep = 1;
let faceDescription = ""; 
let selectedStyle = "";

function goToStep(step) {
    document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step${step}`).classList.remove('hidden');
    document.getElementById('progressBar').style.width = `${step * 25}%`;
    
    if(step === 2) {
        startFaceAnalysis();
    }
}

document.getElementById('photoInput').addEventListener('change', function(e) {
    if (this.files[0]) {
        document.getElementById('fileName').innerText = this.files[0].name;
        document.getElementById('toStep2').classList.remove('hidden');
    }
});

async function startFaceAnalysis() {
    const file = document.getElementById('photoInput').files[0];
    const base64 = await toBase64(file);
    
    const messages = ["Analyzing face cut...", "Detecting hair texture...", "Matching skin undertones...", "Locking identity..."];
    let i = 0;
    const interval = setInterval(() => {
        document.getElementById('loadingText').innerText = messages[i % messages.length];
        i++;
    }, 800);

    try {
        // FIX 1: Use backticks and ${} to inject the key from config.js
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_KEY}`, {
            method: "POST",
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Analyze this face. Provide a 1-sentence physical description focusing on gender, face shape, and hair style. Start with 'A person with...'" },
                        { inline_data: { mime_type: "image/jpeg", data: base64.split(',')[1] } }
                    ]
                }]
            })
        });
        const data = await response.json();
        faceDescription = data.candidates[0].content.parts[0].text;
        
        clearInterval(interval);
        goToStep(3); 
    } catch (e) {
        console.error(e);
        alert("Vision analysis failed. Check if CONFIG.GEMINI_KEY is correct.");
        clearInterval(interval);
        goToStep(1);
    }
}

async function generateMagic() {
    if(!selectedStyle) return alert("Please select a style first!");
    
    const accessories = document.getElementById('accInput').value;
    const vibe = document.getElementById('vibeSelect').value;
    
    goToStep(2);
    document.getElementById('loadingText').innerText = "Painting your masterpiece...";

    const finalPrompt = `A professional high-quality avatar of ${faceDescription}. 
                         Style: ${selectedStyle}. 
                         Wearing: ${accessories}. 
                         Setting: ${vibe}. 
                         Same facial features and gender as description. 
                         4k, artistic lighting, profile picture format.`;

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
            // FIX 2: Use Template Literals (backticks) to send the Bearer token correctly
            headers: { 
                "Authorization": `Bearer ${CONFIG.HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ inputs: finalPrompt }),
        });

        if (!response.ok) throw new Error("Hugging Face API Error");

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        
        document.getElementById('finalAvatar').innerHTML = `<img src="${imgUrl}" class="w-full h-full object-cover">`;
        
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = imgUrl; // Using the imgUrl generated in generateMagic
            link.download = 'my-avatar.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        goToStep(4);
    } catch (e) {
        console.error(e);
        alert("Drawing failed! check your Hugging Face Token.");
        goToStep(3);
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('border-cyan-500', 'bg-cyan-900/20'));
        btn.classList.add('border-cyan-500', 'bg-cyan-900/20');
        selectedStyle = btn.getAttribute('data-style');
    });
});
