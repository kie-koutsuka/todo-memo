<script setup>
import { ref } from 'vue'
//イベント宣言
const props = defineProps({ listDatas: Array, isEditingId: Number, isEditing: Boolean })
const emit = defineEmits(['listDel:listData', 'listEdit:id', 'cancelUpdateTitle', 'updateTitle'])
const editTitle = ref('') //TODO更新用

function clickEditButton(id, title) {
  //編集ボタン押下
  editTitle.value = title //編集前テキスト
  emit('listEdit:id', id)
}

function updateButtonClick(id) {
  //更新ボタン押下
  emit('updateTitle', { id, editTitle: editTitle.value })
}
</script>

<template>
  <div
    v-for="listData in props.listDatas"
    :key="listData.id"
    class="list-detail"
    :class="{ isDone: listData.isDone, edit: props.isEditingId === listData.id }"
  >
    <!--完了/未完了チェックボックス-->
    <div class="isDone-checkbox">
      <input v-model="listData.isDone" class="checkbox" type="checkbox" :disabled="isEditing" />
    </div>

    <!--TODO更新用フォーム-->
    <input
      v-if="props.isEditing && props.isEditingId === listData.id"
      v-model="editTitle"
      type="text"
      id="edit-title"
    />
    <!--TODO通常表示用フォーム-->
    <div class="task" v-else>
      <span :class="{ isDone: listData.isDone }">{{ listData.title }}</span
      ><br />
      <small>{{ listData.createdAt }}</small>
    </div>

    <div class="actionbutton">
      <!--TODO更新用ボタン-->
      <div class="edit-actionbutton" v-if="props.isEditing && props.isEditingId === listData.id">
        <button @click="updateButtonClick(listData.id)">更新</button>
        <button @click="emit('cancelUpdateTitle')">ｷｬﾝｾﾙ</button>
      </div>

      <!--通常表示用ボタン-->
      <div class="default-actionbutton" v-else>
        <div id="button-layout">
          <button
            @click="clickEditButton(listData.id, listData.title)"
            :disabled="props.isEditing && props.isEditingId !== listData.id"
            v-show="!listData.isDone"
          >
            編集
          </button>
        </div>
        <button
          @click="emit('listDel:listData', listData)"
          :disabled="props.isEditing && props.isEditingId !== listData.id"
        >
          削除
        </button>
      </div>
    </div>
  </div>
</template>
