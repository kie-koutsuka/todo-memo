<script setup>
const props = defineProps({ isEditing: Boolean, ALL: String, NOTISDONE: String, ISDONE: String })
const emit = defineEmits(['filterMode:mode'])
</script>

<template>
  <div id="switching-area">
    タスク表示<br />
    <button @click="emit('filterMode:mode', props.ALL)" :disabled="isEditing">すべて</button>
    <button @click="emit('filterMode:mode', props.NOTISDONE)" :disabled="isEditing">未完了</button>
    <button @click="emit('filterMode:mode', props.ISDONE)" :disabled="isEditing">完了済</button>
  </div>
</template>
