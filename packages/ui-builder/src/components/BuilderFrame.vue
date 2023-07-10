<script setup lang="ts">
import BuilderView from "@/components/BuilderView.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import Resizable from "@/components/Resizable.vue";
import {ref} from "vue";

const codeEditorRef = ref(null)

function handleCodeUpdate(ev:any) {
  console.log('ev', ev)
}

function handleResize() {
  codeEditorRef?.value && codeEditorRef.value.resize()
}

</script>

<template>
  <div class="cc-form-builder">
    <div class="head">
    </div>
    <div class="body">
      <Resizable class="left" right @resize="handleResize">
        <BuilderView>
          <CodeEditor ref="codeEditorRef" @value-change="handleCodeUpdate"></CodeEditor>
        </BuilderView>
      </Resizable>
      <div class="content"></div>
      <Resizable class="right" left resize>
      </Resizable>
    </div>
    <div class="foot">
      状态栏
    </div>
  </div>
</template>

<style scoped>
.cc-form-builder {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 500px;
  box-sizing: border-box;
}

.head {
  height: 38px;
  background-color: var(--vt-c-black-soft);
  color: var(--vt-c-text-dark-1);
}
.body {
  flex: 1 1 auto;
  display: flex;
}

.left {
  width: 300px;
  background-color: var(--color-background-soft);
}
.content {
  flex: 1 1 auto;
}
.right {
  width: 300px;
  background-color: var(--color-background-soft);
}

.foot {
  height: 24px;
  background-color: var(--color-background-soft);
  line-height: 1;
}

.left, .right, .foot {
  border: 1px solid var(--color-background-mute);
}
</style>
