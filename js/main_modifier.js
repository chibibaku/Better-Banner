// 設定を読み込み
function loadSettings() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(
      { visibilitySelection: [] },
      (items) => {
        resolve(items.visibilitySelection);
      }
    );
  });
}


//メニューを編集
async function modify_menu() {
  //設定を読み込み
  let visibilitySelection = await loadSettings();

  //メニューのaタグを取得
  let menu_contents = document.querySelectorAll('a[role="link"]');

  //各aタグに対して処理を行う
  menu_contents.forEach((menu_content) => {
    //href属性の値を取得
    let href = menu_content.getAttribute('href');

    //設定の中から一致するhref属性を持つもののisVisibleを取得し、falseなら非表示にする
    let item = visibilitySelection.find((item) => item.href === href);
    if (item && !item.isVisible) {
      console.log('hide:', item.id, item.href);
      menu_content.style.display = 'none';
    }
  });
}


//intervalで読み込みを待つ
let interval = setInterval(() => {
    // role属性に"tablist"を持つ要素が読み込まれたらCookieを取得する
    if (document.querySelector('[role="banner"]')) {
        console.log('role="banner" loaded');
        modify_menu();
        clearInterval(interval);
    }
}, 1000);
