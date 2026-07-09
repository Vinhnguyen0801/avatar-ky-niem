// ==========================
// Frame
// ==========================

fabric.Image.fromURL(

    "assets/frame.png",

    function(img){

        frameImage = img;

        frameImage.set({

            left:0,

            top:0,

            selectable:false,

            evented:false,

            hoverCursor:"default"

        });

        frameImage.scaleToWidth(2048);

        frameImage.scaleToHeight(2048);

        canvas.add(frameImage);

        frameImage.moveTo(999);

        canvas.renderAll();

    },

    {

        crossOrigin:"anonymous"

    }

);