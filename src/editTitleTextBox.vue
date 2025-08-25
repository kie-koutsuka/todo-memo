<script setup>
const editTitle = defineModel()
</script>

<template>
  <input v-model="editTitle" type="text" id="edit-title" />
</template>
