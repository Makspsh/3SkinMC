<script setup lang="ts">
import pencilIcon from '@resources/tools/pencil-icon.png';
import rubberIcon from '@resources/tools/rubber-icon.png';
import eyedropperIcon from '@resources/tools/eyedropper-icon.png';
import noiseIcon from '@resources/tools/noise-icon.png';
import dodgeIcon from '@resources/tools/dodge-icon.png';
import fillIcon from '@resources/tools/fill-icon.png';
import grabIcon from '@resources/tools/grab-icon.png';
import undoIcon from '@resources/tools/undo-icon.png';
import redoIcon from '@resources/tools/redo-icon.png';

</script>

<template>
    <div class="toolPanel_inner">
        <div class="toolPanel_undo">
            <button class="toolPanel_undo-btn">
                <img :src="undoIcon" alt="" class="toolPanel_undo-icon">
            </button>
        </div>
        <nav class="toolPanel_bar">
            <ul class="toolPanel_bar-list">
                <li class="toolPanel_bar-item">
                    <button class="toolPanel_bar-btn">
                        <img :src="pencilIcon" alt="" class="toolPanel_bar-icon">
                    </button>
                </li>
                <li class="toolPanel_bar-item">
                    <button class="toolPanel_bar-btn">
                        <img :src="rubberIcon" alt="" class="toolPanel_bar-icon">
                    </button>
                </li>
                <li class="toolPanel_bar-item">
                    <button class="toolPanel_bar-btn">
                        <img :src="eyedropperIcon" alt="" class="toolPanel_bar-icon">
                    </button>
                </li>
                <li class="toolPanel_bar-item">
                    <button class="toolPanel_bar-btn">
                        <img :src="noiseIcon" alt="" class="toolPanel_bar-icon">
                    </button>
                </li>
                <li class="toolPanel_bar-item">
                    <button class="toolPanel_bar-btn">
                        <img :src="dodgeIcon" alt="" class="toolPanel_bar-icon">
                    </button>
                </li>
                <li class="toolPanel_bar-item">
                    <button class="toolPanel_bar-btn">
                        <img :src="fillIcon" alt="" class="toolPanel_bar-icon">
                    </button>
                </li>
                <li class="toolPanel_bar-item">
                    <button class="toolPanel_bar-btn">
                        <img :src="grabIcon" alt="" class="toolPanel_bar-icon">
                    </button>
                </li>

            </ul>
        </nav>
        <div class="toolPanel_redo">
            <button class="toolPanel_redo-btn">
                <img :src="redoIcon" alt="" class="toolPanel_redo-icon">
            </button>
        </div>
    </div>
</template>

<style>
.toolPanel_inner {
    display: flex;
    gap: 32px;
    align-items: center;
}

.toolPanel_undo-btn,
.toolPanel_redo-btn {
    transition: all .3s;
}

.toolPanel_undo-btn:hover,
.toolPanel_redo-btn:hover {
    transform: scale(1.05);
}

.toolPanel_bar {
    display: flex;
    border: 3px #fff solid;
    border-radius: 24px;

}

.toolPanel_bar-list {
    padding: 4px 24px;
    counter-reset: toolItem;
}

.toolPanel_bar-item {
    margin-right: 24px;
    counter-increment: toolItem;
    position: relative;
}

.toolPanel_bar-item:last-child {
    margin-right: 0;
}

.toolPanel_bar-item::after {
    content: counter(toolItem);
    position: absolute;
    font-size: 24px;
    top: -86px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.toolPanel_bar-btn {
    border: 3px transparent solid;
    padding: 8px;
    transition: all .3s;
}

.toolPanel_bar-btn:hover,
.toolPanel_bar-btn:focus {
    border-bottom-color: #fff;
    padding: 8px;
}

.toolPanel_bar-icon {
    width: 48px;
    height: 48px;
}

</style>