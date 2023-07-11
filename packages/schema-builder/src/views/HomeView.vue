<script setup lang="ts">
import Resizable from "@/components/Resizable.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import {onMounted, reactive, ref} from "vue";

const codeEditorRef = ref<typeof CodeEditor | null>(null)
const data = reactive({
  editorOptions: {
    language: 'json',
    value: `{}`,
    readOnly: true,
    domReadOnly: true,
  },
  arr: [1, '2']
})

const handleCodeEditorContainerResize = () => {
  if (!codeEditorRef.value) return

  codeEditorRef.value.layout()
}

</script>

<template>
  <div class="home-view">
    <Resizable class="section-left" right @resize="handleCodeEditorContainerResize">
      <CodeEditor ref="codeEditorRef" :options="data.editorOptions"></CodeEditor>
    </Resizable>
    <div class="section-right"></div>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  height: 100vh;
  min-height: 500px;
}
.section-left, .section-right {
  width: 50%;
  height: 100%;
  flex: 0 0 auto;
}
.section-right {
  flex: 1 1 auto;
}
</style>
