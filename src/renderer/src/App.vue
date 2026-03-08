<script setup lang="ts">
import Tools from './components/Tools.vue';
import Color from './components/Color.vue';
import ToolOptions from './components/ToolOptions.vue';
import Editor from './components/Editor.vue';

</script>

<template>

    <main class="main">
      <aside class="tools">
        <Tools />
      </aside>
      <section class="selection">
        <div class="color">
          <Color />
        </div>
        <div class="tool-options">
          <ToolOptions />
        </div>
      </section>
      <section class="editor">
        <Editor />
      </section>
    </main>

</template>

<style>

</style>