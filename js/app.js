// ==========================
// Zoom
// ==========================

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

// ==========================
// Rotate
// ==========================

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

// ==========================
// Reset
// ==========================

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