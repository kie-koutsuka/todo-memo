<script setup>
import { computed, ref } from 'vue'

const addText = ref('') //TODO新規追加
const modText = ref('') //TODO更新用

let id = 1 //TODOのID(内部用)

const listDatas = ref([]) //TODOリスト表示用配列

const modFlg = ref(false) //編集中フラグ（編集中：true 未編集中：false）
const modId = ref(0) // 編集中の行ID

//↓↓サマリ結果表示用const//
//TODO件数ー全件
const summaryAll = computed(() => listDatas.value.length)

//TODO件数ー完了
const summaryCompletion = computed(() => {
  const list = listDatas.value.filter((t) => t.completion === true)
  return list.length
})

//TODO件数ー未完了
const summaryNotCompletion = computed(() => {
  const list = listDatas.value.filter((t) => t.completion === false)
  return list.length
})

function listAddNewTodo() {
  //TODOリストにアイテム追加
  listDatas.value.push({ id: id++, text: addText.value, completion: false })
  addText.value = ''
}

function listDel(todo) {
  //TODOリストからアイテム削除
  listDatas.value = listDatas.value.filter((t) => t !== todo)
}

function listMod(id) {
  //TODOリストのアイテム編集
  modFlg.value = true //編集中
  modId.value = id //編集中の行ID
}

function updateText(listdata) {
  //TODO明細行更新ボタン押下時処理
  listdata.text = modText.value
  modFlg.value = false //未編集中
  modId.value = 0 // 編集中の行IDなし
  modText.value = ''
}

function cancelUpdateText() {
  //TODO明細行ｷｬﾝｾﾙボタン押下時処理
  modFlg.value = false //未編集中
  modId.value = 0 // 編集中の行IDなし
}
</script>

<template>
  <header id="header-area">
    <h1>TODOメモ</h1>
  </header>

  <main id="main-area">
    <!-- TOD追加エリア -->
    <div id="add-area">
      <input
        v-model="addText"
        type="text"
        id="add-text"
        placeholder="新しいタスクを追加"
        :disabled="modFlg"
      />
      <button @click="listAddNewTodo" :disabled="modFlg">追加</button>
    </div>

    <!-- TODOmemoヘッダ -->
    <div id="list-area">
      <div id="list-header">
        <div class="completion-checkbox">完了</div>
        <div class="task">タスク名</div>
        <div class="actionButton"></div>
      </div>

      <!-- TODOmemo明細 -->
      <div
        v-for="listData in listDatas"
        :key="listData.id"
        class="list-detail"
        :class="{ completion: listData.completion, mod: modId === listData.id }"
      >
        <!--完了/未完了チェックボックス-->
        <div class="completion-checkbox">
          <input
            v-model="listData.completion"
            class="checkbox"
            type="checkbox"
            :disabled="modFlg"
          />
        </div>

        <!--TODO更新用フォーム-->
        <input
          v-if="modFlg && modId === listData.id"
          v-model="modText"
          type="text"
          id="mod-text"
          :placeholder="listData.text"
        />
        <!--TODO通常表示用フォーム-->
        <div class="task" v-else>{{ listData.text }}</div>

        <div class="actionbutton">
          <!--TODO更新用ボタン-->
          <div class="mod-actionbutton" v-if="modFlg && modId === listData.id">
            <button @click="updateText(listData)">更新</button>
            <button @click="cancelUpdateText">ｷｬﾝｾﾙ</button>
          </div>

          <!--通常表示用ボタン-->
          <div class="default-actionbutton" v-else>
            <button @click="listMod(listData.id)" :disabled="modFlg && modId !== listData.id">
              編集
            </button>
            <button @click="listDel(listData)" :disabled="modFlg && modId !== listData.id">
              削除
            </button>
          </div>
        </div>
      </div>
      <!--
      <div class="list-detail">
        <div class="completion-checkbox"><input class="checkbox" type="checkbox" /></div>
        <div class="task">BBBBBBBBBBBBBBBB</div>
        <div class="button"><button>編集</button><button>削除</button></div>
      </div>
      <div class="list-detail mod">
        <div class="completion-checkbox"><input class="checkbox" type="checkbox" /></div>
        <div class="task"><input type="text" id="mod-text" value="編集中" /></div>
        <div class="button"><button>更新</button><button>ｷｬﾝｾﾙ</button></div>
      </div>
      <div class="list-detail completion">
        <div class="completion-checkbox"><input class="checkbox" type="checkbox" /></div>
        <div class="task">完了済みタスク</div>
        <div class="button"><button>編集</button><button>削除</button></div>
      </div>
      <div class="list-detail">
        <div class="completion-checkbox"><input class="checkbox" type="checkbox" /></div>
        <div class="task">他の行を編集中は使用不可</div>
        <div class="button"><button disabled>編集</button><button disabled>削除</button></div>
      </div>
      CSS確認用おわり-->
      <!-- TODOmemoサマリ-->
      <p id="summary-area">
        全<span>{{ summaryAll }}</span
        >件 / 完了<span>{{ summaryCompletion }}</span
        >件 / 残<span>{{ summaryNotCompletion }}</span
        >件
      </p>
    </div>

    <div id="switching-area">
      タスク表示<br />
      <button :disabled="modFlg">すべて</button>
      <button :disabled="modFlg">未完了</button><button :disabled="modFlg">完了済</button>
    </div>
  </main>
</template>
