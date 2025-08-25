<script setup>
import { computed, ref } from 'vue'
import todoAddArea from './todoAddArea.vue'
import todoSwitchingArea from './todoSwitchingArea.vue'
import todoLists from './todoLists.vue'
import { getDateTime, dataValidation } from './utils.js'
import { FILTER_MODES } from './constants.js'

let id = 1 //TODOのID(内部用)

const listDatas = ref([]) //TODOリスト表示用配列

//フィルターモード切替え用コンスト。初期値はタスクすべて表示
//all(すべて)NotIsDone(未完了)IsDone(完了済)
const filterMode = ref(FILTER_MODES.ALL)

//フィルターモード切替え
const filterListDatas = computed(() => {
  if (filterMode.value == FILTER_MODES.NOTISDONE) {
    //未完了のみ表示

    return listDatas.value.filter((t) => t.isDone === false)
  } else if (filterMode.value == FILTER_MODES.ISDONE) {
    //完了済のみ表示

    return listDatas.value.filter((t) => t.isDone === true)
  } else {
    //すべて表示

    return listDatas.value
  }
})

const isEditing = ref(false) //編集中フラグ（編集中：true 未編集中：false）
const isEditingId = ref(0) // 編集中の行ID

//↓↓サマリ結果表示用const//
//TODO件数ー全件
const summaryAll = computed(() => listDatas.value.length)

//TODO件数ー完了
const summaryIsDone = computed(() => {
  const list = listDatas.value.filter((t) => t.isDone === true)
  return list.length
})

//TODO件数ー未完了
const summaryNotIsDone = computed(() => {
  const list = listDatas.value.filter((t) => t.isDone === false)
  return list.length
})

function listAddNewTodo(addTitle) {
  //TODOリストにアイテム追加
  if (dataValidation(addTitle, isEditing.value, listDatas.value)) {
    //バリデーションチェック OKだったら処理を行う

    let NowDateTime = getDateTime() //更新日時の取得

    listDatas.value.push({
      id: id++,
      title: addTitle,
      isDone: false,
      createdAt: NowDateTime,
    })
  }
}

function listDel(todo) {
  //TODOリストからアイテム削除
  if (confirm('削除します。よろしいですか？')) {
    //「はい」の場合削除処理実行
    listDatas.value = listDatas.value.filter((t) => t !== todo)
  }
}

function listEdit(id) {
  //TODOリストのアイテム編集
  isEditing.value = true //編集中
  isEditingId.value = id //編集中の行ID
}

function updateTitle({ id, editTitle }) {
  //TODO明細行更新ボタン押下時処理

  if (dataValidation(editTitle, isEditing.value, listDatas.value)) {
    //バリデーションチェック OKだったら処理を行う
    const updateListData = listDatas.value.find((t) => t.id === id) //配列から対象の明細を探す
    updateListData.title = editTitle //更新

    //データ更新後の処理
    isEditing.value = false //未編集中
    isEditingId.value = 0 // 編集中の行IDなし
  }
}

function cancelUpdateTitle() {
  //TODO明細行ｷｬﾝｾﾙボタン押下時処理
  isEditing.value = false //未編集中
  isEditingId.value = 0 // 編集中の行IDなし
}
</script>

<!-- 以下、UIコード++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<template>
  <header id="header-area">
    <h1>TODOメモ</h1>
  </header>

  <main id="main-area">
    <!-- TODO追加エリア -->
    <todoAddArea
      :isEditing="isEditing"
      :isEditingId="isEditingId"
      @addTodo:addTitle="listAddNewTodo"
    />

    <!-- TODOmemoヘッダ -->
    <div id="list-area">
      <div id="list-header">
        <div class="isDone-checkbox">完了</div>
        <div class="task">タスク名</div>
        <div class="actionButton"></div>
      </div>

      <!-- TODOmemo明細 -->
      <todoLists
        :listDatas="filterListDatas"
        :isEditing="isEditing"
        :isEditingId="isEditingId"
        @listDel:listData="listDel"
        @listEdit:id="listEdit"
        @cancelUpdateTitle="cancelUpdateTitle"
        @updateTitle="updateTitle"
      />

      <!-- TODOmemoサマリ-->
      <p id="summary-area">
        全<span>{{ summaryAll }}</span
        >件 / 完了<span>{{ summaryIsDone }}</span
        >件 / 残<span>{{ summaryNotIsDone }}</span
        >件
      </p>
    </div>

    <!-- タスク表示切替エリア-->
    <todoSwitchingArea
      :isEditing="isEditing"
      :ALL="FILTER_MODES.ALL"
      :NOTISDONE="FILTER_MODES.NOTISDONE"
      :ISDONE="FILTER_MODES.ISDONE"
      @filterMode:mode="filterMode = $event"
    />
  </main>
</template>
