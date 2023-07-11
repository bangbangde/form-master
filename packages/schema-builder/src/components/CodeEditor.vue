<script setup lang="ts">
import {computed, reactive, watchEffect} from "vue";
import {useMonaco} from "@/useEffects/useMonaco";
import type * as monaco from 'monaco-editor'

interface Props {
  options: monaco.editor.IStandaloneEditorConstructionOptions
}

interface Emits {
  (event:'valueChange', payload:string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const data = reactive({
  id: 'em-' + Math.random().toString(32).substring(2)
})

const monacoOptions = computed(() => {
  return {
    lineDecorationsWidth: 0,
    ...props.options
  }
})

let editorInstance:monaco.editor.IStandaloneCodeEditor

useMonaco(`#${data.id}`, monacoOptions.value).then(editor => {
  editorInstance = editor
  editor.onDidChangeModelContent(() => {
    emit('valueChange', editor.getValue())
  })
})

const layout = () => {
  if (editorInstance) {
    editorInstance.layout()
  }
}

defineExpose({
  layout
})
</script>

<template>
  <div class="code-editor">
    <div class="editor-ref" :id="data.id"></div>
  </div>
</template>

<style scoped>
.code-editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rebeccapurple;
  box-sizing: border-box;
}
.editor-head {
}
.editor-ref {
  flex: 1 1 auto;
}
</style>
