<script setup lang="ts">
import {computed} from "vue";

interface Props {
  value: unknown
}

const props = defineProps<Props>()

const fieldInfo = computed(() => {
  const isPrimitive = typeof props.value === 'object'
  const isArray = Array.isArray(props.value)
  const isNull = props.value === null
  return {
    isPrimitive,
    isArray,
    isObject: !isPrimitive && !isArray && !isNull
  }
})

defineExpose({
  name: 'json-field'
})

</script>
<template>
<div class="json-field">
  <div v-if="fieldInfo.isPrimitive">{{props.value}}</div>

  <template v-else>
    <div class="field-key">{{props.value}}</div>
    <div class="field-value">
      <div v-if="fieldInfo.isObject" class="field-object"></div>
      <div v-if="fieldInfo.isArray" class="field-array">

      </div>
    </div>
  </template>
</div>
</template>
