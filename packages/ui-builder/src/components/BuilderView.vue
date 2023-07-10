<script setup lang="ts">

interface Props {
  title?: string
  visible?: boolean
}

const props = defineProps<Props>()

</script>

<template>
<div class="builder-view">
  <div class="head">
    <div class="title">{{ props.title || 'untitled' }}</div>
    <div class="action">
      <div class="iconfont icon-minus"></div>

    </div>
  </div>
  <div class="body">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.builder-view {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.2;
  height: 100%;
}

.head {
  min-height: 22px;
  padding: 2px 8px;
  display: flex;
}
.title {
  flex: 1 1 auto;
}

.body {
  flex: 1 1 auto;
}
</style>
