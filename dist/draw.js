var canvas = document.getElementById("signature"); 
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#222222";
ctx.lineWith = 2;
                 
var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
var wasDraw = false;

//Работа с мышкой
canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    wasDraw = true;
    lastPos = getMousePos(canvas, e);
}, false);

canvas.addEventListener("mouseup", function (e) {
    drawing = false;
}, false);

canvas.addEventListener("mousemove", function (e) {
    mousePos = getMousePos(canvas, e);
}, false);

canvas.addEventListener("mouseout", function (e) {
    drawing = false;
}, false);

function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

//Работа с касанием
canvas.addEventListener("touchstart", function (e) {
    wasDraw = true;
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);

document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);

document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);

//Отрисовка
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function (callback) {
            window.setTimeout(callback, 1000/60);
        };
})();

function renderCanvas() {
    if (drawing) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
    }
}

(function drawLoop () {
    requestAnimFrame(drawLoop);
    renderCanvas();
})();

//Функции кнопок
function clear() {
    canvas.width = canvas.width;
    wasDraw = false;
}

function sign(){
    if(wasDraw){
        var image = canvas.toDataURL();
        console.log(image);
    }
    else{
        if(!document.getElementById('noSignetureMessage')){
            var newDiv = document.createElement('div');
            newDiv.setAttribute("id", "noSignetureMessage");
            newDiv.innerHTML = "Пожалуйста, оставьте свою подпись";
            if (signatureDiv) {
                signatureDiv.appendChild(newDiv);
            };
        };
    };
}