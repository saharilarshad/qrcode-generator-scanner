const generatorDiv = document.querySelector(".generator");
const qrInput = document.querySelector(".generator-form input");
const generatorBtn = document.querySelector(".generator-form button");
const qrImg = document.querySelector(".generator-img img");
const downloadBtn = document.querySelector(".generator-btn .btn-link");

let imgURL = "";

generatorBtn.addEventListener("click", () => {
  // console.log("ok")
  let qrValue = qrInput.value;
  // console.log(qrValue);
  if (!qrValue.trim()) return;

  generatorBtn.innerText = "Generating QR Code..";
  // console.log(qrValue);

  imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  console.log(imgURL);

  qrImg.src = imgURL;

  qrImg.addEventListener("load", () => {
    generatorDiv.classList.add("active");
    generatorBtn.innerText = "Generate QR Code";
  });
});

//download QR code
downloadBtn.addEventListener("click", () => {
  if (!imgURL) return;
  fetchImage(imgURL);
});

function fetchImage(url) {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      console.log(file);
      let tempFile = URL.createObjectURL(file);
      console.log(tempFile);
      let file_name = url.split("/").pop().split("?")[1];
      console.log(file_name);
      let extension = file.type.split("/")[1];
      console.log(extension);

      download(tempFile, file_name, extension);
    })
    .catch(() => (imgURL = ""));
}

function download(tempFile, file_name, extension) {
  let a = document.createElement("a");
  a.href = tempFile;
  a.download = `${file_name}.${extension}`;

  document.body.appendChild(a);
  a.click();
  a.remove();
}

//remove active class if value empty
qrInput.addEventListener("input", () => {
  if (!qrInput.value.trim()) return generatorDiv.classList.remove("active");
});
