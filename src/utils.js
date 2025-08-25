export function getDateTime() {
  //追加・更新日時取得
  let date = new Date()

  let YYYY = date.getFullYear() //年
  let MM = String(date.getMonth() + 1).padStart(2, '0') //月
  let DD = String(date.getDate()).padStart(2, '0') //日
  let hh = String(date.getHours()).padStart(2, '0') //時間
  let mm = String(date.getMinutes()).padStart(2, '0') //分

  return YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm
}

export function dataValidation(title, isEditing, listDatas) {
  //追加・更新時にデータのバリデーションを行い、必要なメッセージを表示
  try {
    if (!title || typeof title !== 'string') {
      alert('値が不正です')

      return false
    }

    if (!(title.trim().length > 1)) {
      //空文字更新チェック
      alert('入力してください')
      return false
    }
    if (!isEditing && listDatas.length >= 20) {
      //件数チェック(20件)まで登録可能
      alert('20件までしか追加できません。タスクを削除してください。')
      return false
    }

    return true
  } catch (e) {
    alert('予期せぬエラーが発生しました')
    console.error('Error内容:', e)
    return false
  }
}
