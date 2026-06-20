<template>
    <canvas
        ref="canvas"
        class="preview"
    />
</template>


<script setup>

import {
    ref,
    onMounted,
    watch
} from "vue"

import {
    SkinViewer,
    IdleAnimation
} from "skinview3d"

import { useEditorStore } from "@renderer/stores/editorStore"

// STORE
const editor = useEditorStore()

// HTML
const canvas = ref(null)

// SKINVIEW
let viewer

// Canvas для преобразования Skin.js → Image
let skinCanvas
let skinCtx

// Создание 64x64 текстуры
function initSkinCanvas() {
    skinCanvas = document.createElement("canvas")
    skinCanvas.width = 64
    skinCanvas.height = 64
    skinCtx = skinCanvas.getContext("2d")
}

// Обновление изображения скина
function updateSkin() {
    const imageData =
        skinCtx.createImageData(64, 64)
    imageData.data.set(
        editor.skin.data
    )
    skinCtx.putImageData(
        imageData,
        0,
        0
    )
    viewer.loadSkin(
    skinCanvas,
    {
        model:
            editor.modelType === "slim"
                ? "slim"
                : "default"
    }
)
}


// Создание 3D просмотра
function initViewer() {
    viewer = new SkinViewer({
        canvas: canvas.value,
        width: 300,
        height: 400
    })

    // Камера
    viewer.zoom = 0.8

    // Вращение персонажа
    viewer.animation = new IdleAnimation()
}

function updateModel() {

    viewer.playerObject.skin.slim =
        editor.modelType === "slim"

}

function updateLayers() {
    const visible =editor.showOuterLayer
    viewer.playerObject.skin.headOverlay.visible = visible
    viewer.playerObject.skin.bodyOverlay.visible = visible
    viewer.playerObject.skin.rightArmOverlay.visible = visible
    viewer.playerObject.skin.leftArmOverlay.visible = visible
    viewer.playerObject.skin.rightLegOverlay.visible = visible
    viewer.playerObject.skin.leftLegOverlay.visible = visible
}

// Запуск
onMounted(() => {
    initSkinCanvas()
    initViewer()
    updateModel()
    updateLayers()
    updateSkin()
})

// Реакция на изменение скина
watch(
    () => editor.skinVersion,
    () => {
        updateSkin()
    }
)

watch(
    () => editor.modelType,
    () => {
        updateSkin()
    }
)

watch(
    () => editor.showOuterLayer,
    () => {
        updateLayers()
    }
)

</script>



<style scoped>

.preview {
    width: 300px;
    height: 400px;
    border: 2px solid #444;
    image-rendering: pixelated;
}

</style>