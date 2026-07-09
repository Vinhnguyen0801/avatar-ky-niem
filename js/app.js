// ===============================
// Avatar Builder - Sprint 1
// ===============================

const canvas = new fabric.Canvas("canvas", {
    preserveObjectStacking: true,
    selection: false
});

let userImage = null;
let frameImage = null;

// Kích thước canvas
canvas.setWidth(2048);
canvas.setHeight(2048);

// Màu nền
canvas.backgroundColor = "#ffffff";
canvas.renderAll();

// ===============================
// Nạp khung PNG
// ===============================

fabric.Image.fromURL("assets/frame.png", function(img){

    frameImage = img;

    frameImage.set({
        left:0,
        top:0,
        selectable:false,
        evented:false
    });

    frameImage.scaleToWidth(2048);
    frameImage.scaleToHeight(2048);

    canvas.add(frameImage);
    frameImage.moveTo(999);

});

// ===============================
// Upload ảnh
// ===============================

const imageInput = document.getElementById("imageInput");

document.getElementById("btnUpload").onclick = () => {

    imageInput.click();

};

imageInput.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        fabric.Image.fromURL(event.target.result,function(img){

            if(userImage){

                canvas.remove(userImage);

            }

            userImage = img;

            userImage.set({

                left:1024,

                top:1024,

                originX:"center",

                originY:"center",

                cornerColor:"#009640",

                cornerStyle:"circle",

                transparentCorners:false

            });

            userImage.scaleToWidth(1200);

            canvas.insertAt(userImage,0);

            if(frameImage){

                frameImage.moveTo(999);

            }

            canvas.setActiveObject(userImage);

            canvas.renderAll();

        });

    };

    reader.readAsDataURL(file);

});

// ===============================
// Zoom
// ===============================

document.getElementById("btnZoomIn").onclick = function(){

    if(!userImage) return;

    userImage.scale(userImage.scaleX * 1.05);

    canvas.renderAll();

};

document.getElementById("btnZoomOut").onclick = function(){

    if(!userImage) return;

    userImage.scale(userImage.scaleX * 0.95);

    canvas.renderAll();

};

// ===============================
// Rotate
// ===============================

document.getElementById("btnRotateLeft").onclick = function(){

    if(!userImage) return;

    userImage.rotate(userImage.angle - 5);

    canvas.renderAll();

};

document.getElementById("btnRotateRight").onclick = function(){

    if(!userImage) return;

    userImage.rotate(userImage.angle + 5);

    canvas.renderAll();

};

// ===============================
// Reset
// ===============================

document.getElementById("btnReset").onclick = function(){

    if(!userImage) return;

    userImage.set({

        angle:0,
        scaleX:1,
        scaleY:1,
        left:1024,
        top:1024

    });

    canvas.renderAll();

};

// ===============================
// Download PNG
// ===============================

document.getElementById("btnDownload").onclick = function(){

    canvas.discardActiveObject();

    canvas.renderAll();

    const link = document.createElement("a");

    link.download = "avatar-ky-niem.png";

    link.href = canvas.toDataURL({
        format:"png",
        quality:1
    });

    link.click();

};