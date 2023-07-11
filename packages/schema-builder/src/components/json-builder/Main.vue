<script setup lang="ts">
import Field from "@/components/json-builder/Field.vue";

interface Props {
  value: unknown
}

const props = defineProps<Props>()

</script>
<template>
<div class="json-builder">
  <Field :value="props.value"></Field>
</div>
</template>
