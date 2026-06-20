<template>

    <div class="options">

        <!-- Тип модели -->
        <div class="option">

            <label>
                Модель
            </label>

            <select :value="editor.modelType" @change="changeModel">

                <option value="classic">
                    Steve (Classic)
                </option>

                <option value="slim">
                    Alex (Slim)
                </option>

            </select>

        </div>

        <label>
            Второй слой
        </label>

        <input type="checkbox" :checked="editor.showOuterLayer" @change="changeLayer" />

    </div>

</template>


<script setup>

import { useEditorStore }
    from "@renderer/stores/editorStore"


// STORE
const editor = useEditorStore()


// Изменение модели
function changeModel(event) {

    const select =
        event.target

    editor.setModel(
        select.value
    )
}

function changeLayer(event) {

    const input =
        event.target

    editor.setOuterLayer(
        input.checked
    )
}

</script>


<style scoped>
.options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    background: #2b2b2b;
    border: 2px solid #444;
}

.option {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

label {
    color: #ddd;
    font-size: 14px;
}

select {
    background: #3a3a3a;
    color: white;
    border: 1px solid #666;
    padding: 6px;
}
</style>