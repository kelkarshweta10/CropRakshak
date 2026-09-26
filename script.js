let selectedImage=null;

function scrollToScan(){document.getElementById("scan").scrollIntoView({behavior:"smooth"});}

function previewImage(event){
  const file=event.target.files[0];
  if(!file)return;
  selectedImage=file;
  const container=document.getElementById("previewContainer");
  container.innerHTML="";
  const img=document.createElement("img");
  img.src=URL.createObjectURL(file);
  img.className="preview";
  container.appendChild(img);
  document.getElementById("analyzeBtn").disabled=false;
  showToast("Crop image selected successfully!");
}

function analyzeCrop(){
  if(!selectedImage){showToast("Please upload an image first.");return;}
  document.getElementById("status").innerText="Analyzing...";
  document.getElementById("resultContent").innerHTML='<div class="empty-result"><div>🧠</div><h3>AI is analyzing...</h3><p>Detecting disease, pest and severity.</p></div>';
  setTimeout(generateResult,1800);
}

function generateResult(){
  const disease="Leaf Blight",confidence=92,severity="Moderate",affected=30;
  document.getElementById("status").innerText="Analysis Complete";
  document.getElementById("resultContent").innerHTML='<div style="padding-top:35px"><div style="background:#e8f7eb;padding:18px;border-radius:12px;text-align:center"><div style="font-size:45px">🌿</div><h2>Leaf Blight</h2><p style="color:#6f7d73;margin-top:5px">AI detected a probable crop disease.</p></div></div>';
  document.getElementById("diseaseName").innerText=disease;
  document.getElementById("confidenceValue").innerText=confidence+"%";
  document.getElementById("severityText").innerText=severity;
  document.getElementById("affectedArea").innerText=affected+"%";
  document.getElementById("severityProgress").style.width=affected+"%";
  document.getElementById("treatmentContent").innerHTML=
    '<div class="treatment-item">🌿 Remove heavily infected leaves and dispose of them safely.</div>'+
    '<div class="treatment-item">💧 Avoid excessive moisture and maintain proper field drainage.</div>'+
    '<div class="treatment-item">🌱 Maintain adequate crop nutrition and proper field hygiene.</div>'+
    '<div class="treatment-item">🔍 Rescan the same crop area after treatment to compare progress.</div>';
  addHistory(disease,severity,confidence);
  showToast("AI diagnosis completed!");
}

function addHistory(disease,severity,confidence){
  const list=document.getElementById("historyList");
  const empty=document.querySelector(".empty-history");
  if(empty)empty.remove();
  const row=document.createElement("div");
  row.className="history-row";
  row.innerHTML=`<span>${new Date().toLocaleDateString()}</span><span>Crop Plant</span><span>${disease}</span><span>${severity}</span><span>${confidence}%</span>`;
  list.prepend(row);
}

function showDemo(){
  alert("CropRakshak Flow:\n\n1. Scan Crop 📷\n2. AI Analysis 🧠\n3. Severity Assessment 📊\n4. Treatment Guidance 💊\n5. Save History 📋\n6. Compare Future Scans 📈");
}

function changeLanguage(){
  const language=prompt("Choose language:\n1. English\n2. Marathi\n3. Hindi");
  if(language==="2")alert("Marathi interface can be added in the next version.");
  else if(language==="3")alert("Hindi interface can be added in the next version.");
  else if(language==="1")alert("English selected.");
}

function showToast(message){
  const toast=document.getElementById("toast");
  toast.innerText=message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2500);
}