import { defineStore } from "pinia"
import { ref } from "vue"

import { Skin } from "@renderer/models/Skin"

import Steve from "@renderer/assets/skins/steve.png"
import Alex from "@renderer/assets/skins/alex.png"

export const useEditorStore = defineStore(
    "editor",
    () => {

        // ДАННЫЕ СКИНА
        const skin = ref(
            new Skin()
        )

        // НАСТРОЙКИ РИСОВАНИЯ
        const color = ref({
            r: 255,
            g: 0,
            b: 0,
            a: 255
        })

        const tool = ref("brush")
        const zoom = ref(8)
        const showOuterLayer = ref(true)
        const skinVersion = ref(0)
        const modelType = ref("classic")

        // ИНСТРУМЕНТЫ
        function drawPixel(x, y) {
            skin.value.setPixel(
                x,
                y,
                color.value
            )
            touchSkin()
        }

        function erasePixel(x, y) {
            skin.value.setPixel(
                x,
                y,
                {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                }
            )
            touchSkin()
        }

        // Универсальное действие
        function useTool(x, y) {
            switch (tool.value) {
                case "brush":
                    drawPixel(x, y)
                    break
                case "eraser":
                    erasePixel(x, y)
                    break
                default:
                    drawPixel(x, y)
            }
        }

        // SETTERS
        function setTool(newTool) {
            tool.value = newTool
        }

        function setColor(newColor) {
            color.value = {
                ...newColor
            }
        }

        function setZoom(newZoom) {
            zoom.value = Math.max(
                2,
                Math.min(64, newZoom)
            )
        }

        // УПРАВЛЕНИЕ СКИНОМ
        function clearSkin() {
            skin.value.clear()
            touchSkin()
        }
        function replaceSkin(newSkin) {
            skin.value = newSkin
        }
        function touchSkin() {
            skinVersion.value++
        }

        async function setModel(type) {
            modelType.value = type
            await loadDefaultSkin()
        }

        function setOuterLayer(value) {
            showOuterLayer.value = value
        }

        // START SKIN
        async function loadDefaultSkin() {
            try {
                const image =
                    modelType.value === "slim"
                        ? Alex
                        : Steve
                console.log("Loading:", image)
                await skin.loadImage(image)
                skinVersion.value++
                console.log("Skin loaded")
            } catch (error) {
                console.error("Skin load error:", error)
            }
        }

        // EXPORT
        return {
            // данные
            skin,
            color,
            tool,
            zoom,
            showOuterLayer,
            skinVersion,

            // инструменты
            drawPixel,
            erasePixel,
            useTool,

            // настройки
            setTool,
            setColor,
            setZoom,

            // скин
            clearSkin,
            replaceSkin,
            modelType,
            setModel,
            showOuterLayer,
            setOuterLayer,
            loadDefaultSkin
        }
    }
)