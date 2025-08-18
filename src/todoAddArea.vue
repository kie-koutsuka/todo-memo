<script setup>
import { ref } from 'vue'
//イベント宣言
const emit = defineEmits(['addTodo:addTitle'])
const props = defineProps({ isEditing: Boolean })

const addTitle = ref('') //TODO新規追加

function clickAddButton() {
  //emit
  emit('addTodo:addTitle', addTitle.value)
  addTitle.value = ''
}
</script>

<template>
  <div id="add-area">
    <input
      v-model="addTitle"
      type="text"
      id="add-title"
      placeholder="新しいタスクを追加"
      :disabled="props.isEditing"
    />
    <button @click="clickAddButton" :disabled="props.isEditing">追加</button>
  </div>
</template>
