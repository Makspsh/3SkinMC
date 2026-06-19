<template>
    <div class="editor">
        <input type="color" v-model="editor.color" />

        <div class="canvas-container">
            <!-- Фон -->
            <canvas
                ref="backgroundCanvas"
                width="512"
                height="512"
            ></canvas>

            <!-- Пиксели скина -->
            <canvas
                ref="skinCanvas"
                width="512"
                height="512"
            ></canvas>

            <!-- Сетка и мышь -->
            <canvas
                ref="overlayCanvas"
                width="512"
                height="512"
                @mousedown="startDraw"
                @mousemove="moveDraw"
                @mouseup="stopDraw"
                @mouseleave="stopDraw"
            ></canvas>
        </div>
    </div>
</template>


<script setup>

import { minecraftUV } from "@renderer/data/minecraftUV.js"
import { ref, onMounted } from "vue"
import { useEditorStore } from "@renderer/stores/editorStore"
const editor = useEditorStore()


// КОНСТАНТЫ

const SKIN_SIZE = 64
const PIXEL_SIZE = 8
const CANVAS_SIZE = SKIN_SIZE * PIXEL_SIZE


// CANVAS

const backgroundCanvas = ref(null)
const skinCanvas = ref(null)
const overlayCanvas = ref(null)


// КОНТЕКСТЫ

let bgCtx
let skinCtx
let overlayCtx


// СОСТОЯНИЕ РЕДАКТОРА

const currentColor = ref("#ff0000")

let isDrawing = false
let hoverX = -1
let hoverY = -1

// ДОСТУПНЫЕ ПИКСЕЛИ

function isAllowedPixel(x, y) {
    return minecraftUV.some(uv =>
        x >= uv.x &&
        x < uv.x + uv.width &&
        y >= uv.y &&
        y < uv.y + uv.height
    )
}


// ФОН

function drawBackground() {
    for (const uv of minecraftUV) {
        bgCtx.fillStyle =
            uv.layer === 0
                ? "#303030"
                : "#404060"

        bgCtx.fillRect(
            uv.x * PIXEL_SIZE,
            uv.y * PIXEL_SIZE,
            uv.width * PIXEL_SIZE,
            uv.height * PIXEL_SIZE
        )

        bgCtx.strokeStyle = "#777"

        bgCtx.strokeRect(
            uv.x * PIXEL_SIZE,
            uv.y * PIXEL_SIZE,
            uv.width * PIXEL_SIZE,
            uv.height * PIXEL_SIZE
        )

        bgCtx.fillStyle = "#999"
        bgCtx.font = "10px monospace"
        bgCtx.textAlign = "center"
        bgCtx.textBaseline = "middle"

        bgCtx.fillText(
            `${uv.part}.${uv.face}`,
            uv.x * PIXEL_SIZE + uv.width * PIXEL_SIZE / 2,
            uv.y * PIXEL_SIZE + uv.height * PIXEL_SIZE / 2
        )
    }
}


// ОТРИСОВКА СКИНА

function drawSkin() {
    skinCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    for (let y = 0; y < SKIN_SIZE; y++) {
        for (let x = 0; x < SKIN_SIZE; x++) {
            const color = editor.skin.getPixel()

            if (!color)
                continue

            skinCtx.fillStyle = color

            skinCtx.fillRect(
                x * PIXEL_SIZE,
                y * PIXEL_SIZE,
                PIXEL_SIZE,
                PIXEL_SIZE
            )
        }
    }
}


// РИСОВАНИЕ

function paintPixel(x, y) {

    if (!isAllowedPixel(x, y))
        return

    editor.useTool(x, y)
    drawSkin()
}


// OVERLAY

function drawOverlay() {
    overlayCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    drawGrid()
    drawCursor()
}


function drawGrid() {
    overlayCtx.strokeStyle = "#444"
    overlayCtx.lineWidth = 1

    for (let i = 0; i <= SKIN_SIZE; i++) {
        const pos = i * PIXEL_SIZE

        overlayCtx.beginPath()
        overlayCtx.moveTo(pos, 0)
        overlayCtx.lineTo(pos, CANVAS_SIZE)
        overlayCtx.stroke()

        overlayCtx.beginPath()
        overlayCtx.moveTo(0, pos)
        overlayCtx.lineTo(CANVAS_SIZE, pos)
        overlayCtx.stroke()
    }
}


function drawCursor() {
    if (hoverX < 0 || hoverY < 0)
        return

    overlayCtx.strokeStyle = "#ffffff"
    overlayCtx.lineWidth = 2

    overlayCtx.strokeRect(
        hoverX * PIXEL_SIZE,
        hoverY * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE
    )
}


// МЫШЬ

function getPixel(event) {
    const rect =
        overlayCanvas.value.getBoundingClientRect()

    const x = Math.floor(
        (event.clientX - rect.left) / PIXEL_SIZE
    )

    const y = Math.floor(
        (event.clientY - rect.top) / PIXEL_SIZE
    )

    return { x, y }
}


function startDraw(event) {
    isDrawing = true

    const { x, y } = getPixel(event)

    paintPixel(x, y)
}


function moveDraw(event) {
    const { x, y } = getPixel(event)

    hoverX = x
    hoverY = y

    drawOverlay()

    if (isDrawing) {
        paintPixel(x, y)
    }
}


function stopDraw() {
    isDrawing = false
}


// ЗАПУСК

onMounted(() => {
    bgCtx = backgroundCanvas.value.getContext("2d")
    skinCtx = skinCanvas.value.getContext("2d")
    overlayCtx = overlayCanvas.value.getContext("2d")

    bgCtx.imageSmoothingEnabled = false
    skinCtx.imageSmoothingEnabled = false
    overlayCtx.imageSmoothingEnabled = false

    drawBackground()
    drawSkin()
    drawOverlay()
})

</script>


<style scoped>

.editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
}


.canvas-container {
    position: relative;
    width: 512px;
    height: 512px;
    border: 2px solid #444;
}


.canvas-container canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 512px;
    height: 512px;
}

</style>