<script setup>
import { computed, ref } from 'vue'

const addText = ref('') //新規追加TODO
//const completion = ref(false) //完了(true) /未完了(false)※デフォルトfalse

let id = 0 //TODOのID(内部用)
const listDatas = ref([]) //TODOリスト表示用配列

//↓↓サマリ結果表示用const//
//TODO件数ー全件
const summaryAll = computed(() => listDatas.value.length)

//TODO件数ー完了
const summaryCompletion = computed(() => {
  const list = listDatas.value.filter((t) => t.Completion === true)
  return list.length
})

//TODO件数ー未完了
const summaryNotCompletion = computed(() => {
  const list = listDatas.value.filter((t) => t.Completion === false)
  return list.length
})

function listAddNewTodo() {
  //TODOリストにアイテム追加
  listDatas.value.push({ id: id++, text: addText.value, Completion: false })
  addText.value = ''
}

function listDelTodo(todo) {
  //TODOリストからアイテム削除
  listDatas.value = listDatas.value.filter((t) => t !== todo)
}
</script>

<template>
  <header id="header-area">
    <h1>TODOメモ</h1>
  </header>

  <main id="main-area">
    <div id="add-area">
      <input v-model="addText" type="text" id="add-text" placeholder="新しいタスクを追加" />
      <button @click="listAddNewTodo">追加</button>
    </div>

    <div id="list-area">
      <!-- TODOmemoヘッダ -->
      <div id="list-header">
        <div class="completion-checkbox">完了</div>
        <div class="task">タスク名</div>
        <div class="button"></div>
      </div>
      <!-- TODOmemo明細 -->
      <div v-for="listData in listDatas" :key="listData.id" class="list-detail">
        <div class="completion-checkbox">
          <input class="checkbox" type="checkbox" />
        </div>
        <div class="task">{{ listData.text }}</div>
        <div class="button">
          <button>編集</button><button @click="listDelTodo(listData)">削除</button>
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
      <button>すべて</button><button>未完了</button><button>完了済</button>
    </div>
  </main>
</template>
