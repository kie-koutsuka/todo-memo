<template>
  <header id="header-area">
    <h1>TODOメモ</h1>
  </header>

  <main id="main-area">
    <div id="add-area">
      <input type="text" id="add-text" value="新しいタスクを追加" /><button>追加</button>
    </div>

    <div id="list-area">
      <div id="list-header">
        <div class="completion-checkbox">完了</div>
        <div class="task">タスク名</div>
        <div class="button"></div>
      </div>
      <div class="list-detail">
        <div class="completion-checkbox"><input class="checkbox" type="checkbox" /></div>
        <div class="task">AAAAAA</div>
        <div class="button"><button>編集</button><button>削除</button></div>
      </div>
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
      <p id="summary-area">全<span>2</span>件 / 完了<span>1</span>件 / 残<span>1</span>件</p>
    </div>

    <div id="switching-area">
      タスク表示<br />
      <button>すべて</button><button>未完了</button><button>完了済</button>
    </div>
  </main>
</template>

<script setup></script>

<style scoped></style>
