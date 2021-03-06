'use strict';

const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const clean = document.getElementById("jsClean");
const save = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");

let painting = false;

(function setCanvas(){
    canvas.width = 595;
    canvas.height = 670;
    
    ctx.strokeStyle = "black";
    ctx.lineWith = 2.5;
})();

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}


function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChage(event) {
    ctx.lineWidth = event.target.value;
}

function cleanThisCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveThisPainting() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint";
    link.click();
}

function blockRightMouse(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", blockRightMouse);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChage);
}

if (clean) {
    clean.addEventListener("click", cleanThisCanvas);
}

if(save) {
    save.addEventListener("click", saveThisPainting);
}