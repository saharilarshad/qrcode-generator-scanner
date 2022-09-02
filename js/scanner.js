const scannerDiv = document.querySelector(".scanner");
const camera = scannerDiv.querySelector("h1 .fa-camera");
const stopCam = scannerDiv.querySelector("h1 .fa-circle-stop");

const form = scannerDiv.querySelector(".scanner-form");
const fileInput = form.querySelector("input");
const p = form.querySelector("p");
const img = form.querySelector("img");
const video = form.querySelector("video");
const content = form.querySelector(".content");

const textarea = scannerDiv.querySelector(".scanner-details textarea");
const copyBtn = scannerDiv.querySelector(".scanner-details .copy");
const closeBtn = scannerDiv.querySelector(".scanner-details .close");

//input file
form.addEventListener("click", () => {
  // console.log("ok");
  fileInput.click();
});

//scan QR Code image
fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  // console.log(file);
  if (!file) return;
  fetchRequest(file);
});

function fetchRequest(file) {
  let formData = new FormData();
  formData.append("file", file);

  p.innerText = "Scanning QR Code..";

  fetch(`http://api.qrserver.com/v1/read-qr-code/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      // console.log(result);
      let text = result[0].symbol[0].data;
      console.log(text);

      if (!text) return (p.innerText = "Couldn't find QR Code");

      scannerDiv.classList.add("active");
      form.classList.add("active-img");

      img.src = URL.createObjectURL(file);
      textarea.innerText = text;
    });
}

//scan QR Code camera
let scanner;

camera.addEventListener("click", () => {
  // console.log("camera")
  camera.style.display = "none";
  p.innerText = "Scanning QR Code..";
  form.classList.add("pointerEvents");

  scanner = new Instascan.Scanner({ video: video });
  Instascan.Camera.getCameras()
    .then((cameras) => {
      if (cameras.length > 0) {
        scanner.start(cameras[0]).then(() => {
          form.classList.add("active-video");
          stopCam.style.display = "inline-block";
        });
      } else {
        console.log("No Cameras Found");
      }
    })
    .catch((err) => console.error(err));

    //addListener not addEventListener
    scanner.addListener("scan", c => {
        scannerDiv.classList.add("active");
        textarea.innerText = c;
    })
});

//copy
copyBtn.addEventListener("click", () => {
  let text = textarea.textContent;
  // console.log(text);
  navigator.clipboard.writeText(text);
});

//close
closeBtn.addEventListener("click", () => stopScan());
stopCam.addEventListener("click", () => stopScan());

function stopScan() {
  p.innerText = "Upload QR Code to Scan";
  
  camera.style.display = "inline-block";
  stopCam.style.display = "none";

  scannerDiv.classList.remove("active");
  form.classList.remove("active-img","active-video", "pointerEvents");
//   form.classList.remove("active-video", "pointerEvents");

  scanner.stop();

}
