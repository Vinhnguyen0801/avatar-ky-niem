const chooseBtn = document.getElementById("chooseBtn");

const fileInput = document.getElementById("fileInput");

const previewImage = document.getElementById("previewImage");

const placeholder = document.getElementById("placeholder");

chooseBtn.addEventListener("click", () => {

    fileInput.click();

});

fileInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        previewImage.src = e.target.result;

        previewImage.style.display = "block";

        placeholder.style.display = "none";

    }

    reader.readAsDataURL(file);

});