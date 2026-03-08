<script setup lang="ts">
import pencilIcon from '@resources/tools/pencil.png';
import rubberBandIcon from '@resources/tools/rubber-band.png';

</script>

<template>
  <ul class="tool-list">
    <li class="tool-item">
      <button class="tool-btn pencil">
        <img :src='pencilIcon' alt="pencil">
      </button>
    </li>
    <li class="tool-item">
      <button class="tool-btn rubber-band">
        <img :src='rubberBandIcon' alt="rubber band">
      </button>
    </li>
  </ul>
</template>

<style>

.tool-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  counter-reset: tool;
}


.tool-btn {
  all: unset;
  width: 100%;
  height: 48px;
  text-align: center;
  border: 1px solid;
  border-color: transparent;
  transition: all .2s ease;
}

.tool-btn:hover,
.tool-btn:focus {
  border-left-color: #fff;
}

.tool-btn:active {
  border-left-color: #fff;
}

.tool-btn::after {
  counter-increment: tool;
  content: counter(tool);
}

img {
  width: 32px;
  height: 32px;
  -webkit-user-drag: none;
}


</style>