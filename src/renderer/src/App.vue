<script setup lang="ts">
import ColorPicker from './components/ColorPicker.vue';
import ColorFav from './components/ColorFav.vue';
import SkinEditor from './components/SkinEditor.vue';
import ToolPanel from './components/ToolPanel.vue';
import Options from './components/Options.vue';
import SkinPreview from './preview/SkinPreview.vue';

import { onMounted } from "vue"
import { useEditorStore } from "@renderer/stores/editorStore"

const editor = useEditorStore()

onMounted(async () => {
    await editor.loadDefaultSkin()
})

</script>

<template>

    <div class="wrapper">
      <aside class="color-section">
        <section class="color_picker">
          <ColorPicker />
        </section>
        <div class="color_fav">
          <ColorFav />
        </div>
      </aside>

      <main class="editor-section">
        <SkinEditor />
        <SkinPreview />
        <section class="toolPanel">
          <ToolPanel />
        </section>
      </main>

      <aside class="options-section">
        <Options />
      </aside>
    </div>

</template>

<style>

</style>