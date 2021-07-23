# AC_expense-tracker

<br>

此專案為一個網路記帳工具應用程式

## 產品功能

<br>

* 使用者可以在首頁一次瀏覽所有支出的清單 及 清單的總金額
* 使用者可以新增一筆支出
* 使用者可以編輯支出的所有屬性
* 使用者可以刪除任何一筆支出
* 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

<br>

## 建置環境

<br>

* node.js : 10.15.0
* express: 4.17.1
* express-handlebars: 5.3.2
* mongoose: ^5.12.0
* mongoDB: ^4.2.14

<br>

## 安裝流程

<br>

1. 開啟終端機(terminal)，利用 git clone 將專案下載至本機
```
git clone https://github.com/Linus-Peng1/AC_expense-tracker.git
```
2. 進入存放此專案資料夾
```
cd restaurant-list
```
3. 安裝套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```

5. 啟動網頁伺服器
```
npm run dev
```
6. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

App is running on http://localhost:3000

