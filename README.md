# React Outline

1. React
    * 安裝 (框架 vs 建構工具)
        * https://zh-hans.react.dev/learn/installation
        * npm create vite@latest my-app -- --template react
    * 專案結構
    * 找進入點
        * index.html
        * src/main.js
            * 引入全局 css
            * 用 React 將元件加到 html 中，並渲染
        * src/App.jsx 
            1. 只能傳回一個根元素 (<></>)
            2. 標籤必須閉合 (\<img />)
            3. 使用駝峰式命名法為所有大部分屬性命名 (class --> className)
        * 使用 [JSX 轉換器](https://transform.tools/html-to-jsx)
    * Hook (docs)
        * ★ `useState` 管理狀態  
        * ★ `useEffect` 處理副作用  
        * ★ `useRef` 保存值、不觸發重渲染  
        * ★ `useContext` 跨層級共享資料  
        * ☆ `useReducer` 管理複雜狀態
        * ☆ `useMemo` 記住「運算結果」
        * ☆ `useCallback` 記住「函式本身」
        * ★ `useId` 產生穩定的唯一 ID  
        * ☆ `useTransition` 處理 UI 過渡（React 18）
        * ★ `useXxx` (自訂) 提煉可重用邏輯
            > 抽出多個元件共用的邏輯。
            * 練習題目：useFetch、useLocalStorage
    * [React Developer Tools](https://zh-hans.react.dev/learn/react-developer-tools)

2. Tailwind CSS
    * 安裝
    * [指令與函數](https://tailwindcss.com/docs/functions-and-directives)
    * 基本用法

3. TODO LIST
    * 預計畫面
    * 拆分元件
    * 撰寫元件
    * state 放哪
    * type.d.ts
    * 元件資料流串接
