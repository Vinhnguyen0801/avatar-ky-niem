// ==========================
// Canvas
// ==========================

const canvas = new fabric.Canvas("canvas", {

    preserveObjectStacking: true,

    selection: false

});

canvas.setWidth(2048);

canvas.setHeight(2048);

canvas.backgroundColor = "#ffffff";

canvas.renderAll();

let userImage = null;

let frameImage = null;