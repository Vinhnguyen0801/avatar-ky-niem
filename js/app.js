// =========================
// Avatar Builder
// Version 1.0
// =========================

const canvas = new fabric.Canvas("canvas", {

    preserveObjectStacking: true,

    selection: false

});

canvas.setWidth(2048);
canvas.setHeight(2048);

canvas.backgroundColor = "#ffffff";

canvas.renderAll();

let userImage = null;

// =========================
// Upload Button
// =========================

const imageInput = document.getElementById("imageInput");

const btnUpload = document.getElementById("btnUpload");

btnUpload.onclick = function () {

    imageInput.click();

};

// =========================
// Upload Image
// =========================

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

                transparentCorners: false,

                borderColor: "#009640"

            });

            userImage.scaleToWidth(1200);

            canvas.add(userImage);

            canvas.setActiveObject(userImage);

            canvas.renderAll();

        });

    };

    reader.readAsDataURL(file);

};

// =========================
// Zoom +
// =========================

document.getElementById("btnZoomIn").onclick = function () {

    if (!userImage) return;

    userImage.scale(userImage.scaleX * 1.05);

    canvas.renderAll();

};

// =========================
// Zoom -
// =========================

document.getElementById("btnZoomOut").onclick = function () {

    if (!userImage) return;

    userImage.scale(userImage.scaleX * 0.95);

    canvas.renderAll();

};

// =========================
// Rotate Left
// =========================

document.getElementById("btnRotateLeft").onclick = function () {

    if (!userImage) return;

    userImage.rotate(userImage.angle - 5);

    canvas.renderAll();

};

// =========================
// Rotate Right
// =========================

document.getElementById("btnRotateRight").onclick = function () {

    if (!userImage) return;

    userImage.rotate(userImage.angle + 5);

    canvas.renderAll();

};

// =========================
// Reset
// =========================

document.getElementById("btnReset").onclick = function () {

    if (!userImage) return;

    userImage.set({

        left: 1024,

        top: 1024,

        angle: 0,

        scaleX: 1,

        scaleY: 1

    });

    canvas.renderAll();

};

// =========================
// Download
// =========================

document.getElementById("btnDownload").onclick = function () {

    if (!userImage) {

        alert("Hãy chọn ảnh trước.");

        return;

    }

    canvas.discardActiveObject();

    canvas.renderAll();

    const link = document.createElement("a");

    link.download = "avatar.png";

    link.href = canvas.toDataURL({

        format: "png",

        quality: 1

    });

    link.click();

};