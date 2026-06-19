<script setup lang="ts">
import { computed, ref } from "vue"

const props = defineProps<{
    modelValue: number
    min: number
    max: number
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: number): void
}>()

const sliderRef = ref<HTMLElement | null>(null)

const percent = computed(() => {
    return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

function updateValue(clientY: number) {
    if (!sliderRef.value) return

    const rect = sliderRef.value.getBoundingClientRect()

    const y = rect.bottom - clientY
    const p = y / rect.height

    const value =
        props.min + p * (props.max - props.min)

    const rounded = Math.round(value)

    const clamped = Math.min(
        props.max,
        Math.max(props.min, rounded)
    )

    emit("update:modelValue", clamped)
}

function startDrag(event: MouseEvent) {
    updateValue(event.clientY)

    function move(e: MouseEvent) {
        updateValue(e.clientY)
    }

    function stop() {
        window.removeEventListener("mousemove", move)
        window.removeEventListener("mouseup", stop)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", stop)
}
</script>

<template>
    <div class="slider" ref="sliderRef" @mousedown="startDrag">
        <div class="track">
            <div class="thumb" :style="{ bottom: percent + '%' }"></div>
        </div>
    </div>
</template>

<style scoped>
.slider {
    width: 30px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.track {
    position: relative;
    width: 6px;
    height: 100%;
    background: #444;
    border-radius: 4px;
}

.thumb {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
}
</style>