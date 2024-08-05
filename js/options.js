// 設定を保存
function saveOptions() {
  // visibility_selector内のdivのinput要素を取得
  let visibilitySelector = document.getElementById('visibility_selector');
  let inputs = visibilitySelector.querySelectorAll('input');
  let visibilitySelection = [];
  // input要素のチェック状態とidを取得
  inputs.forEach((input) => {
    visibilitySelection.push({
      id: input.id,
      href: input.getAttribute('href'),
      isVisible: input.checked
    });
  });
  // 取得した値を保存
  chrome.storage.sync.set(
    { visibilitySelection: visibilitySelection },
    () => {
      // 保存完了メッセージを表示
      let status = document.getElementById('status');
      status.textContent = 'Saved!';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
}


// 設定を読み込み
function loadSettings() {
  chrome.storage.sync.get(
    { visibilitySelection: [] },
    (items) => {
      let visibilitySelection = items.visibilitySelection;
      // visibility_selector内のdivのinput要素を取得
      let visibilitySelector = document.getElementById('visibility_selector');
      let inputs = visibilitySelector.querySelectorAll('input');
      // input要素のチェック状態を復元
      inputs.forEach((input) => {
        let id = input.id;
        let item = visibilitySelection.find((item) => item.id === id);
        if (item) {
          input.checked = item.isVisible;
        }
      });
    }
  );
}


// デフォルト設定を読み込み
function loadDefaultSettings() {
  // 必要な要素を取得
  let visibilitySelector = document.getElementById('visibility_selector');
  let divTemplate = document.getElementById('template');
  
  // すでに要素があれば削除 template要素以外
  let visibilitySelectorChildren = visibilitySelector.children;
  for (let i = visibilitySelectorChildren.length - 1; i >= 0; i--) {
      if (visibilitySelectorChildren[i].id !== 'template') {
          visibilitySelector.removeChild(visibilitySelectorChildren[i]);
      }
  }

  // JSONファイルを読み込む
  getJSON("../res/menu_items.json").then(function(r) {
      // テンプレートを操作してメニューを作成
      let menuItems = JSON.parse(r);
      menuItems.forEach((menuItem) => {
          let div = divTemplate.cloneNode(true);
          div.querySelector('input').id = menuItem.id;
          div.querySelector('input').checked = menuItem.isVisible;
          div.querySelector('label').textContent = menuItem.display_name;
          div.querySelector('input').setAttribute('href', menuItem.href);
          div.removeAttribute('id');
          div.removeAttribute('style');
          visibilitySelector.appendChild(div);
      });
  });
}


// JSONファイルを取得する関数
function getJSON(filename) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', filename, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.statusText));
        }
      }
    };
    xhr.send(); 
  });
}


// Chrome内に設定が保存されているか確認
function checkStorage() {
  chrome.storage.sync.get(
    {visibilitySelection: []},
    (items) => {
      if (items.visibilitySelection.length > 0) {
        console.log('Local settings found.');
        loadDefaultSettings();
        loadSettings();
      } else {
        console.log('No local settings found.');
        loadDefaultSettings();
      }
    }
  );
}

//イベントリスナーを追加
document.addEventListener('DOMContentLoaded', checkStorage);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('load').addEventListener('click', loadSettings);
document.getElementById('load_default').addEventListener('click', loadDefaultSettings);