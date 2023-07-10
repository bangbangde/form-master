<script setup lang="ts">
import {camelize, computed, onMounted, onUnmounted, reactive, ref} from "vue";

interface Props {
  left?: boolean
  top?: boolean
  right?: boolean
  bottom?: boolean
  minWidth?: number
  minHeight?: number
  barWidth?: number
  resize?: boolean
}

interface Data {
  [key:string]: any
  dragging: null | { pos: 'top'|'right'|'bottom'|'left', sizeType: 'width'|'height', initPos: number, initSize: number }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (ev: 'resize', data?: { sizeType: 'width'|'height', diff: number }): void
}>()

const data = reactive({
  width: null,
  height: null,
  dragging: null
})

const containerRef = ref(null)

const dragBars = computed(() => {
  const barWidth = props.barWidth == null ? '5px' : props.barWidth + 'px';
  return ['top', 'right', 'bottom', 'left'].filter(k => props[k]).map(k => {
    const style: {[key:string]: any} = {}

    if (k === 'top' || k === 'bottom') {
      style.height = barWidth
    } else {
      style.width = barWidth
    }
    return {
      position: k,
      style
    }
  })
})

const handleMouseAction = (pos, action, ev) => {
  ev.preventDefault()

  switch (action) {
    case 'down':
      data.dragging = {
        pos,
        sizeType: pos === 'left' || pos === 'right' ? 'width' : 'height'
      };
      if (data.dragging.sizeType === 'width') {
        data.dragging.initPos = ev.screenX
        data.dragging.initSize = containerRef.value.offsetWidth
      } else {
        data.dragging.initPos = ev.screenY
        data.dragging.initSize = containerRef.value.offsetHeight
      }
      break;
    case 'move':
      if (!data.dragging) return

      switch (data.dragging.pos) {
        case 'top':
          data.height = data.dragging.initSize - (ev.screenY - data.dragging.initPos) + 'px'
          break;
        case 'right':
          data.width = data.dragging.initSize + (ev.screenX - data.dragging.initPos) + 'px'
          break;
        case 'bottom':
          data.height = data.dragging.initSize + (ev.screenY - data.dragging.initPos) + 'px'
          break;
        case 'left':
          data.width = data.dragging.initSize - (ev.screenX - data.dragging.initPos) + 'px'
          break;
      }
      break;
    case 'up':
      if (!data.dragging) return

      data.dragging = null
      emit('resize')
      break;
  }
}

const handleMouseMove = handleMouseAction.bind(null, null, 'move')
const handleMouseUp = handleMouseAction.bind(null, null, 'up')

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

</script>

<template>
<div class="resizable" ref="containerRef" :style="{width: data.width, height: data.height}">
  <div class="inner-container">
    <div
      v-for="item in dragBars"
      :key="item.position"
      :class="['drag-bar', item.position]"
      :style="item.style"
      @mousedown="handleMouseAction(item.position, 'down', $event)"
    ></div>
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.resizable {
  width: 100%;
  height: 100%;
}
.inner-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.drag-bar {
  position: absolute;
  z-index: 9;
}
.drag-bar:hover {
  background-color: var(--color-border);
}

.drag-bar.top:hover, .drag-bar.bottom:hover {
  cursor: ns-resize;
}
.drag-bar.left:hover, .drag-bar.right:hover {
  cursor: ew-resize;
}

.drag-bar.top {
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
}
.drag-bar.right {
  right: 0;
  top: 0;
  height: 100%;
  transform: translateX(50%);
}
.drag-bar.bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(50%);
}
.drag-bar.left {
  left: 0;
  top: 0;
  height: 100%;
  transform: translateX(-50%);
}
</style>
