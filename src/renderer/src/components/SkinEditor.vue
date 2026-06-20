<template>
    <div class="editor">

        <div
            class="canvas-container"
            :style="{
                width: canvasSize + 'px',
                height: canvasSize + 'px'
            }"
        >

            <!-- фон UV -->
            <canvas
                ref="backgroundCanvas"
                :width="canvasSize"
                :height="canvasSize"
            />

            <!-- пиксели скина -->
            <canvas
                ref="skinCanvas"
                :width="canvasSize"
                :height="canvasSize"
            />

            <!-- сетка и курсор -->
            <canvas
                ref="overlayCanvas"
                :width="canvasSize"
                :height="canvasSize"

                @mousedown="startDraw"
                @mousemove="moveDraw"
                @mouseup="stopDraw"
                @mouseleave="stopDraw"
            />

        </div>

    </div>
</template>


<script setup>

import { ref, computed, onMounted, watch} from "vue"
import { getMinecraftUV } from "@renderer/data/minecraftUV"
import { useEditorStore } from "@renderer/stores/editorStore"

// STORE
const editor = useEditorStore()


// CONSTANTS
const SKIN_SIZE = 64
const pixelSize = computed(() => {
    return editor.zoom
})
const canvasSize = computed(() => {
    return SKIN_SIZE * pixelSize.value
}) 
const currentUV = computed(() =>
    getMinecraftUV(editor.modelType)
)

// CANVAS
const backgroundCanvas = ref(null)
const skinCanvas = ref(null)
const overlayCanvas = ref(null)

// CONTEXTS
let bgCtx
let skinCtx
let overlayCtx

// MOUSE
let isDrawing = false
let hoverX = -1
let hoverY = -1

function isAllowedPixel(x, y) {
    return currentUV.value.some(uv =>
        x >= uv.x &&
        x < uv.x + uv.width &&
        y >= uv.y &&
        y < uv.y + uv.height
    )
}

// BACKGROUND
function drawBackground() {
    bgCtx.clearRect(
        0,
        0,
        canvasSize.value,
        canvasSize.value
    )
    for (const uv of currentUV.value) {
        bgCtx.fillStyle =
            uv.layer === 0
                ? "#303030"
                : "#404060"

        bgCtx.fillRect(
            uv.x * editor.zoom,
            uv.y * editor.zoom,
            uv.width * editor.zoom,
            uv.height * editor.zoom
        )

        bgCtx.strokeStyle = "#777"
        bgCtx.lineWidth = 1
        bgCtx.strokeRect(
            uv.x * editor.zoom,
            uv.y * editor.zoom,
            uv.width * editor.zoom,
            uv.height * editor.zoom
        )

        const text = `${uv.part}.${uv.face}`
        if (
            uv.width * editor.zoom < 50 ||
            uv.height * editor.zoom < 20
        ) {
            continue
        }

        bgCtx.fillStyle = "#999"
        bgCtx.font = `${Math.max(10, editor.zoom)}px monospace`
        bgCtx.textAlign = "center"
        bgCtx.textBaseline = "middle"
        bgCtx.fillText(
            text,
            uv.x * editor.zoom +
            (uv.width * editor.zoom / 2),
            uv.y * editor.zoom +
            (uv.height * editor.zoom / 2)
        )
    }
}

// SKIN LAYER
function drawSkin() {
    skinCtx.clearRect(
        0,
        0,
        canvasSize.value,
        canvasSize.value
    )
    for (let y = 0; y < SKIN_SIZE; y++) {
        for (let x = 0; x < SKIN_SIZE; x++) {
            const color =
                editor.skin.getPixel(x, y)

            if (color.a === 0)
                continue

            skinCtx.fillStyle =
                `rgba(
                    ${color.r},
                    ${color.g},
                    ${color.b},
                    ${color.a / 255}
                )`

            skinCtx.fillRect(
                x * editor.zoom,
                y * editor.zoom,
                editor.zoom,
                editor.zoom
            )
        }
    }
}

// OVERLAY
function drawOverlay() {
    overlayCtx.clearRect(
        0,
        0,
        canvasSize.value,
        canvasSize.value
    )
    drawGrid()
    drawCursor()
}

// GRID
function drawGrid() {
    overlayCtx.strokeStyle = "#444"
    overlayCtx.lineWidth = 1
    for (let i = 0; i <= SKIN_SIZE; i++) {
        const pos =
            i * editor.zoom
        overlayCtx.beginPath()
        overlayCtx.moveTo(
            pos,
            0
        )
        overlayCtx.lineTo(
            pos,
            canvasSize.value
        )
        overlayCtx.stroke()
        overlayCtx.beginPath()
        overlayCtx.moveTo(
            0,
            pos
        )
        overlayCtx.lineTo(
            canvasSize.value,
            pos
        )
        overlayCtx.stroke()
    }
}

// CURSOR
function drawCursor() {
    if (
        hoverX < 0 ||
        hoverY < 0
    ) {
        return
    }

    overlayCtx.strokeStyle = "#ffffff"
    overlayCtx.lineWidth = 2
    overlayCtx.strokeRect(
        hoverX * editor.zoom,
        hoverY * editor.zoom,
        editor.zoom,
        editor.zoom
    )
}

// MOUSE POSITION
function getPixel(event) {
    const rect = overlayCanvas.value.getBoundingClientRect()
    const x = Math.floor(
        (event.clientX - rect.left)
        / editor.zoom
    )

    const y = Math.floor(
        (event.clientY - rect.top)
        / editor.zoom
    )

    return { x, y }
}

// DRAW ACTION
function applyTool(x, y) {
    if (!isAllowedPixel(x, y)) {
        return
    }

    editor.useTool(
        x,
        y
    )

    drawSkin()
}

// MOUSE EVENTS

function startDraw(event) {
    isDrawing = true
    const { x, y } =
        getPixel(event)
    applyTool(
        x,
        y
    )
}

function moveDraw(event) {

    const { x, y } =
        getPixel(event)
    hoverX = x
    hoverY = y

    drawOverlay()

    if (isDrawing) {
        applyTool(
            x,
            y
        )
    }
}

function stopDraw() {
    isDrawing = false
}

// CANVAS INIT
function initCanvas() {
    bgCtx = backgroundCanvas.value.getContext("2d")
    skinCtx = skinCanvas.value.getContext("2d")
    overlayCtx = overlayCanvas.value.getContext("2d")

    bgCtx.imageSmoothingEnabled = false
    skinCtx.imageSmoothingEnabled = false
    overlayCtx.imageSmoothingEnabled = false
}

// REDRAW
function redrawAll() {
    drawBackground()
    drawSkin()
    drawOverlay()
}

// MOUNT
onMounted(() => {
    initCanvas()
    redrawAll()
})

// ZOOM WATCH
watch(

    () => editor.zoom,
    () => {
        initCanvas()
        redrawAll()
    }

)

watch(
    () => editor.skinVersion,
    () => {
        drawSkin()
    }
)

</script>



<style scoped>

.editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.canvas-container {
    position: relative;
    border: 2px solid #444;
    display: inline-block;
    image-rendering: pixelated;
}

.canvas-container canvas {
    position: absolute;
    top: 0;
    left: 0;
}

</style>