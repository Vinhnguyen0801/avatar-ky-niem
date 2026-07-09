const chooseBtn = document.getElementById("chooseBtn");
const resetBtn = document.getElementById("resetBtn");
const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const placeholder = document.getElementById("placeholder");

let cropper = null;

// Chọn ảnh
chooseBtn.addEventListener("click", () => {
    fileInput.click();
});

// Khi chọn ảnh
fileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

        previewImage.style.display = "block";

        placeholder.style.display = "none";

        previewImage.onload = function () {

            if (cropper) {
                cropper.destroy();
            }

            cropper = new Cropper(previewImage, {

                aspectRatio: 1,

                viewMode: 1,

                dragMode: "move",

                autoCropArea: 1,

                background: false,

                guides: false,

                center: false,

                highlight: false,

                cropBoxMovable: false,

                cropBoxResizable: false,

                movable: true,

                zoomable: true,

                rotatable: false,

                scalable: false,

                wheelZoomRatio: 0.1,

                responsive: true

            });

        };

    };

    reader.readAsDataURL(file);

});

// Đặt lại
resetBtn.addEventListener("click", () => {

    if (cropper) {

        cropper.reset();

    }

});