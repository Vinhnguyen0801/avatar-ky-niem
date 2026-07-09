// ==========================
// Upload Image
// ==========================

const imageInput = document.getElementById("imageInput");

document.getElementById("btnUpload").onclick = function () {

    imageInput.click();

};

imageInput.onchange = function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        fabric.Image.fromURL(event.target.result, function (img) {

            if (userImage) {

                canvas.remove(userImage);

            }

            userImage = img;

            userImage.set({

                originX: "center",

                originY: "center",

                left: 1024,

                top: 1024,

                cornerStyle: "circle",

                cornerColor: "#009640",

                borderColor: "#009640",

                transparentCorners: false

            });

            userImage.scaleToWidth(1200);

            canvas.insertAt(userImage, 0);

            if (frameImage) {

                frameImage.moveTo(999);

            }

            canvas.setActiveObject(userImage);

            canvas.renderAll();

        });

    };

    reader.readAsDataURL(file);

};