# React Outline

1. React
    * 安裝 (框架 vs 建構工具)
        * https://zh-hans.react.dev/learn/installation
        * npm create vite@latest my-app -- --template react
    * 找進入點
        * index.html
        * src/main.js
            * 引入全局 css
            * 用 React 將元件加到 html 中，並渲染
        * src/App.jsx
            * 畫面
    * JSX 語法   
      (JSX and React 是相互獨立的東西，但它們經常一起使用)
        * 將 HTML 轉換為 JSX 規則
            1. 只能傳回一個根元素 (<></>)
            2. 標籤必須閉合 (\<img />)
            3. 使用駝峰式命名法為所有大部分屬性命名 (class --> className)
        * 使用 [JSX 轉換器](https://transform.tools/html-to-jsx)
    * Hook  
        * `useState` 管理狀態  
            > 讓函式元件能「記住資料」。
            1. useState(initialValue) 會回傳 [state, setState]
            2. 改變狀態會重新 render 元件
            3. setState 是「非同步」的，避免在同個 render 後馬上依賴舊值
            4. 用回呼式更新：setCount(prev => prev + 1)
            * 練習題目：計數器、表單輸入同步顯示 
        * `useEffect` 處理副作用
            > 處理「非渲染邏輯」：API 請求、事件監聽、訂閱。
            * 第二參數為依賴陣列（dependency array）說明：
                * [] → 僅初次執行
                * [id] → 當 id 改變時執行
                * 無第二參數 → 每次 render 都執行（⚠️ 通常不建議）
            * 練習題目：計時器、API 取資料
        * `useRef` 保存值、不觸發重渲染
            > 取得 DOM 元素或儲存跨 render 的值，或保存狀態
            * 練習題目：計時器、API 取資料
        * `useContext` 跨層級共享資料
            > 避免一層層傳 props。
            * Provider 提供值
            * useContext 取得當前最近的值
            * 常與狀態管理（如 useReducer）搭配
            * 練習題目：Todo List、主題切換
        * `useReducer` 管理複雜狀態
            > 當 useState 太多時，用類似 Redux 的 reducer 方式。
            * 練習題目：Todo List、主題切換
        * `useMemo` 記住「運算結果」
            > 避免重複執行昂貴計算。
            * 僅當依賴變數變化時重新計算
            * 用於 CPU 密集或資料過濾邏輯
            * 練習題目：
        * `useCallback` 記住「函式本身」
            > 避免子元件因父元件函式變更而重渲染。 
            * 練習題目：
        * `useId` 產生穩定的唯一 ID
            > 表單 label 對應 input、可重複渲染時保持一致。
            * 練習題目： 表單
        * `useTransition` 處理 UI 過渡（React 18）
            > 將「非緊急更新」設為背景執行，保持 UI 流暢。
            * 練習題目：Loading
        * `useXxx` (自訂) 提煉可重用邏輯
            > 抽出多個元件共用的邏輯。
            * 練習題目：useFetch、useLocalStorage
2. TODO LIST
    * 預計畫面
    * 拆分元件
    * 撰寫元件
    * Hook

    * React DevTools





# useState  管理狀態

> 讓函式元件能「記住資料」。

## 用途說明

## 語法說明

(更完整的細節與陷阱解析)

## 使用範例

## 使用時機

### 避免濫用的注意事項

### 實作題目

## 為什麼重要



    