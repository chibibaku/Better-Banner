# Better Banner

## 概要
Better Bannerは、Web版𝕏のメニュー項目の表示・非表示をユーザーがカスタマイズできるようにするChrome拡張です。

## 導入方法
1. リポジトリをクローンします。
    ```sh
    git clone https://github.com/chibibaku/Better-Banner.git
    ```
2. ブラウザを開き、拡張機能の管理ページに移動します。
    ```sh
    chrome://extensions/
    ```
3. 右上の「デベロッパーモード」を有効にします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、クローンしたリポジトリのディレクトリを選択します。

## 設定
1. ツールバーの拡張機能アイコンをクリックし、「オプション」を選択します。
2. オプションページが開くので、ここで表示・非表示にしたいメニュー項目を選択します。
3. 設定を保存するには「Save」ボタンをクリックします。
4. 設定は `chrome.storage.sync` を使用して保存されます。
- 「Load」を押すと自身の設定した内容を読み込めます。
- 「Load default」を押すとデフォルトの設定がレストアされます。

## ファイルの役割
- **main_modifier.js**:
  - 𝕏のサイトを書き換える本体部分です。

- **options.html**:
  - 表示非表示の項目を切り替えるオプションページです。

- **options.js**:
  - オプションページとJSONやChrome storage間のやり取りを担う部分です。

## 参考画像

### 導入前
![導入前](./assets/Before.png "導入前")
### 導入後
![導入後](./assets/After.png "導入後")