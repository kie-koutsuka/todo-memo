<script setup>
import { FILTER_MODES } from './constants.js'
const props = defineProps({ isEditing: Boolean })
const emit = defineEmits(['filterMode:mode'])
</script>

<template>
  <div id="switching-area">
    タスク表示<br />
    <button @click="emit('filterMode:mode', FILTER_MODES.ALL)" :disabled="props.isEditing">
      すべて
    </button>
    <button @click="emit('filterMode:mode', FILTER_MODES.NOTISDONE)" :disabled="props.isEditing">
      未完了
    </button>
    <button @click="emit('filterMode:mode', FILTER_MODES.ISDONE)" :disabled="props.isEditing">
      完了済
    </button>
  </div>
</template>
