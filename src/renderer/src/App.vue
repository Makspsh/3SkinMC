<script setup lang="ts">
import MenuBar from './components/MenuBar.vue';
import Tools from './components/Tools.vue';
import Color from './components/Color.vue';
import Preview from './components/Preview.vue';
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
        <div class="preview">
          <Preview />
        </div>
      </section>
      <section class="editor">
        <Editor />
      </section>
    </main>

</template>

<style>

</style>