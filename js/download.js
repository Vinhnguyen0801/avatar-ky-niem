// ==========================
// Download
// ==========================

document.getElementById("btnDownload").onclick = function () {

    canvas.discardActiveObject();

    canvas.renderAll();

    const link = document.createElement("a");

    link.download = "avatar-ky-niem.png";

    link.href = canvas.toDataURL({

        format: "png",

        quality: 1

    });

    link.click();

};