<script setup lang="ts">
import colorPickerDefaultIcon from '@resources/colorPicker/colorPicker-default-icon.png';
import colorPickerExtraIcon from '@resources/colorPicker/colorPicker-extra-icon.png';
import colorPickerFavIcon from '@resources/colorPicker/colorPicker-fav-icon.png';

import { useEditorStore } from "@renderer/stores/editorStore"
const editor = useEditorStore()

</script>

<template>
    <nav class="color_tab">
        <ul class="color_tab-list">
            <li class="color_tab-item">
                <button class="color_tab-btn">
                    <img :src="colorPickerDefaultIcon" alt="" class="color_tab-icon">
                </button>
            </li>
            <li class="color_tab-item">
                <button class="color_tab-btn">
                    <img :src="colorPickerExtraIcon" alt="" class="color_tab-icon">
                </button>
            </li>
        </ul>
        <div class="color_tab-fav">
            <button class="color_tab-btn">
                <img :src="colorPickerFavIcon" alt="" class="color_tab-icon">
            </button>
        </div>
    </nav>
    <section class="color_content">
        <input type="color" v-model="editor.color" />
    </section>
    <section class="color_content"></section>
</template>

<style>
.color_tab {
    display: flex;
    justify-content: space-between;
}

.color_tab-list {
    display: flex;
}

.color_tab-item {}

.color_tab-btn {
    padding: 8px 8px 4px 8px;
    border-top: var(--color-gray) 2px solid;
    border-radius: 12px;
    background: var(--color-gray);
    transition: all .3s;
}

.color_tab-btn:hover,
.color_tab-btn:active,
.color_tab-btn:focus {
    border-top: 2px #fff solid;
}


.color_tab-icon {
    width: 32px;
    height: 32px;
}

.color_tab-fav {}

.color_content {}
</style>