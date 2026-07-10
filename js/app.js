// ===============================
// APP.JS - PART 1
// ===============================

const canvas = new fabric.Canvas("canvas", {
    preserveObjectStacking: true,
    selection: false
});

const workspace = document.querySelector(".workspace");

canvas.setDimensions({
    width: workspace.clientWidth,
    height: workspace.clientHeight
});

console.log("INIT:", canvas.width, canvas.height);

canvas.backgroundColor = "#ffffff";
canvas.renderAll();

let userImage = null;
let frameImage = null;

// ===============================
// LOAD FRAME
// ===============================

fabric.Image.fromURL(
    "assets/frame.png",
    function (img) {

        frameImage = img;

        frameImage.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
            hoverCursor: "default"
        });

        frameImage.scaleToWidth(canvas.width);
        frameImage.scaleToHeight(canvas.height);

        canvas.add(frameImage);
        frameImage.bringToFront();

        canvas.renderAll();

    },
    {
        crossOrigin: "anonymous"
    }
);

// ===============================
// IMAGE UPLOAD
// ===============================

const imageInput = document.getElementById("imageInput");

document.getElementById("btnUpload").onclick = () => {
    imageInput.click();
};

imageInput.onchange = function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        fabric.Image.fromURL(
            event.target.result,
            function (img) {

                if (userImage) {
                    canvas.remove(userImage);
                }

                userImage = img;

                const maxSize = canvas.width * 0.8;

                if (img.width > img.height) {
                    img.scaleToWidth(maxSize);
                } else {
                    img.scaleToHeight(maxSize);
                }

                img.set({
                    left: canvas.width / 2,
                    top: canvas.height / 2,
                    originX: "center",
                    originY: "center",

                    selectable: true,
                    evented: true,

                    cornerStyle: "circle",
                    cornerColor: "#009640",
                    borderColor: "#009640",
                    transparentCorners: false
                });

                canvas.add(img);

                if (frameImage) {
                    frameImage.bringToFront();
                }

                canvas.setActiveObject(img);
                canvas.requestRenderAll();
            },
            {
                crossOrigin: "anonymous"
            }
        );
    };

    reader.readAsDataURL(file);
};
// ===============================
// ZOOM
// ===============================

document.getElementById("btnZoomIn").onclick = function () {

    if (!userImage) return;

    userImage.scale(userImage.scaleX * 1.05);

    canvas.renderAll();

};

document.getElementById("btnZoomOut").onclick = function () {

    if (!userImage) return;

    userImage.scale(userImage.scaleX * 0.95);

    canvas.renderAll();

};

// ===============================
// MOUSE WHEEL ZOOM
// ===============================

canvas.on("mouse:wheel", function (opt) {

    if (!userImage) return;

    const delta = opt.e.deltaY;

    let zoom = userImage.scaleX;

    zoom *= 0.999 ** delta;

    if (zoom < 0.15) zoom = 0.15;

    if (zoom > 8) zoom = 8;

    userImage.scale(zoom);

    canvas.renderAll();

    opt.e.preventDefault();

    opt.e.stopPropagation();

});

// ===============================
// ROTATE
// ===============================

document.getElementById("btnRotateLeft").onclick = function () {

    if (!userImage) return;

    userImage.rotate(userImage.angle - 5);

    canvas.renderAll();

};

document.getElementById("btnRotateRight").onclick = function () {

    if (!userImage) return;

    userImage.rotate(userImage.angle + 5);

    canvas.renderAll();

};

// ===============================
// RESET
// ===============================

document.getElementById("btnReset").onclick = function () {

    if (!userImage) return;

    userImage.set({

        left: canvas.width / 2,

        top: canvas.height / 2,

        angle: 0,

        scaleX: 1,

        scaleY: 1,

        originX: "center",

        originY: "center"

    });

    canvas.setActiveObject(userImage);

    canvas.renderAll();

};
// ===============================
// DOWNLOAD
// ===============================

document.getElementById("btnDownload").onclick = function () {

    canvas.discardActiveObject();

    canvas.renderAll();

    const link = document.createElement("a");

    link.download = "avatar-ky-niem.png";

    link.href = canvas.toDataURL({

        format: "png",

        quality: 1,

        multiplier: 1

    });

    link.click();

};

// ===============================
// KEEP FRAME ALWAYS ON TOP
// ===============================

canvas.on("object:moving", function () {

    if (frameImage) {

        frameImage.moveTo(999);

    }

});

canvas.on("object:scaling", function () {

    if (frameImage) {

        frameImage.moveTo(999);

    }

});

canvas.on("object:rotating", function () {

    if (frameImage) {

        frameImage.moveTo(999);

    }

});

// ===============================
// SHORTCUTS
// ===============================

document.addEventListener("keydown", function (e) {

    if (!userImage) return;

    switch (e.key) {

        case "+":
        case "=":

            userImage.scale(userImage.scaleX * 1.05);

            break;

        case "-":

            userImage.scale(userImage.scaleX * 0.95);

            break;

        case "ArrowLeft":

            userImage.rotate(userImage.angle - 2);

            break;

        case "ArrowRight":

            userImage.rotate(userImage.angle + 2);

            break;

        default:

            return;

    }

    canvas.renderAll();

});

// ===============================
// END
// ===============================

console.log("Avatar Builder Ready");