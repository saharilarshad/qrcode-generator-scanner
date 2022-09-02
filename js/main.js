const generatorTab = document.querySelector(".nav-gene");
const scannerTab = document.querySelector(".nav-scan");

generatorTab.addEventListener("click", () => {
    // console.log("ok")
    generatorTab.classList.add("active");
    scannerTab.classList.remove("active");

    document.querySelector(".scanner").style.display ="none";
    document.querySelector(".generator").style.display ="block";
})
scannerTab.addEventListener("click", () => {
    // console.log("ok")
    generatorTab.classList.remove("active");
    scannerTab.classList.add("active");

    document.querySelector(".scanner").style.display ="block";
    document.querySelector(".generator").style.display ="none";
})