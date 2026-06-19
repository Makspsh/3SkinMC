import { defineStore } from "pinia"
import { ref } from "vue"

import { Skin } from "@renderer/models/Skin"


export const useEditorStore = defineStore(
    "editor",
    () => {


        // =============================
        // ДАННЫЕ СКИНА
        // =============================

        const skin = ref(
            new Skin()
        )


        // =============================
        // НАСТРОЙКИ РИСОВАНИЯ
        // =============================

        const color = ref({
            r: 255,
            g: 0,
            b: 0,
            a: 255
        })


        const tool = ref("brush")


        const zoom = ref(8)


        const showOuterLayer = ref(true)


        // =============================
        // ИНСТРУМЕНТЫ
        // =============================


        function drawPixel(x, y) {

            skin.value.setPixel(
                x,
                y,
                color.value
            )

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


        // =============================
        // SETTERS
        // =============================


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


        // =============================
        // УПРАВЛЕНИЕ СКИНОМ
        // =============================


        function clearSkin() {

            skin.value.clear()

        }


        function replaceSkin(newSkin) {

            skin.value = newSkin

        }


        // =============================
        // EXPORT
        // =============================


        return {


            // данные

            skin,

            color,

            tool,

            zoom,

            showOuterLayer,


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

            replaceSkin

        }


    }
)