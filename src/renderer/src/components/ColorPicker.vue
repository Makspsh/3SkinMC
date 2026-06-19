<template>

<div class="color-picker">

    <label>
        Цвет:
    </label>

    <input
        type="color"
        v-model="hexColor"
    />

</div>

</template>


<script setup>

import { computed } from "vue"
import { useEditorStore } from "@renderer/stores/editorStore"

const editor = useEditorStore()

function rgbToHex(color) {
    const toHex = (value) => {
        return value
            .toString(16)
            .padStart(2, "0")

    }

    return (
        "#" +
        toHex(color.r) +
        toHex(color.g) +
        toHex(color.b)
    )
}

function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
        a: 255
    }
}

const hexColor = computed({
    get() {
        return rgbToHex(
            editor.color
        )
    },
    set(value) {
        editor.setColor(
            hexToRgb(value)
        )
    }
})

</script>



<style scoped>

.color-picker {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

input {
    width: 100%;
    height: 40px;
}

</style>