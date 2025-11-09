# React Hook

內建的 Hook 或使用自訂 Hook。

本頁列出了 React 中所有內建 Hook。

---

## State Hook

狀態幫助元件 「記住」使用者輸入的資訊。

例如，一個表單元件可以使用狀態儲存輸入值，而一個影像庫元件可以使用狀態儲存所選的影像索引。

* `useState` 
  > 宣告可以直接更新的狀態變數。

* `useReducer` 
  > 在 reducer 函數 中宣告帶有更新邏輯的 state 變數。

---

## Context Hook

上下文幫助元件 從祖先元件接收訊息，而無需將其作為 props 傳遞。

例如，應用程式的頂層元件可以藉助上下文將 UI 主題傳遞給所有下方的元件，無論這些元件層級有多深。

* `useContext` 
  > 讀取訂閱上下文。

---

## Ref Hook

ref 允許元件 保存一些不用於渲染的信息，

例如 DOM 節點或 timeout ID。

與狀態不同，更新 ref 不會重新渲染元件。 

ref 是從 React 範例中的「脫圍機制」。當需要與非 React 系統如瀏覽器內建 API 一同工作時，ref 將會非常有用。

* `useRef` 
  > 聲明 ref。  
  > 你可以在其中保存任何值，但最常用於保存 DOM 節點。

* `useImperativeHandle` 
  > 自訂從元件中暴露的 ref，但是很少使用。

---

## Effect Hook 

Effect 允許元件 連接到外部系統並與之同步。

這包括處理網頁、瀏覽器、DOM、動畫、使用不同 UI 庫編寫的小部件以及其他非 React 程式碼。

Effect 是從 React 範式中的「脫圍機制」。避免使用 Effect 協調應用程式的資料流。如果不需要與外部系統交互，那麼 可能不需要 Effect。

* `useEffect` 
  > 將元件連接到外部系統。

---

### useEffect 有兩個很少使用的變換形式，它們在執行時機有所不同：

* `useLayoutEffect` 
  > 在瀏覽器重新繪製畫面前執行，可以在此處測量佈局。

* `useInsertionEffect` 
  > 在 React 對 DOM 進行更改之前觸發，庫可以在此處插入動態 CSS。

---

## 效能 Hook

優化重新渲染效能的常見方法是跳過不必要的工作。

例如，可以告訴 React 重複使用快取的計算結果，或者如果資料自上次渲染以來沒有更改，則跳過重新渲染。

有時由於螢幕確實需要更新，無法跳過重新渲染。

在這種情況下，可以透過將必須同步的阻塞更新（例如使用輸入法輸入內容）與不需要阻塞使用者介面的非阻塞更新（例如更新圖表）分開以提高效能。

---

### 使用以下 Hook 跳過計算和不必要的重新渲染：

* `useMemo` 
  > 快取計算代價昂貴的計算結果。

* `useCallback`
  > 將函數傳遞給最佳化元件之前快取函數定義。 

---

### 使用以下 Hook 處理渲染優先順序：

* `useTransition`
  > 允許將狀態轉換標記為非阻塞，並允許其他更新中斷它。

* `useDeferredValue`
  > 允許延遲更新 UI 的非關鍵部分，讓其他部分先更新。

---

## 其他 Hook

這些 Hook 主要適用於函式庫作者，不常在應用程式程式碼中使用。

* `useDebugValue` 
  > 自訂 React 開發者工具為自訂 Hook 新增的標籤。

* `useId` 
  > 將唯一的 ID 與元件相關聯，其通常與可訪問性 API 一起使用。

* `useSyncExternalStore` 
  > 訂閱外部 store。

* `useActionState` 
  > 允許你管理動作的狀態.

---

## 自訂 Hook

開發者可以 自訂 Hook 作為 JavaScript 函數。

---

# React Dom Hook

`react-dom` 包含的 Hook 僅支援 web 應用程序，即在瀏覽器 DOM 環境中執行的應用程式。

這些 Hook 不支援非瀏覽器環境，如 iOS、Android 或 Windows 應用程式。

---

## Form Hooks

Form 允許建立用於提交資訊的互動式控制項。

若要在元件中管理表單，請使用下列其中一個 Hook：

* `useFormStatus` 
  > 允許根據表單的狀態更新使用者介面。

# 參考資料

* [React 官網](https://zh-hans.react.dev/reference/react/hooks)
* [ExplainThis](https://www.explainthis.io/zh-hant/swe/what-is-react-hook)
* [Heidi-Liu - HackMD](https://hackmd.io/@Heidi-Liu/react-hooks)
* [CodeLove 愛寫扣論壇](https://codelove.tw/@tony/post/jalPAa)
* [Hannah Lin - Medium](https://medium.com/hannah-lin/react-hook-筆記-從最基本的-hook-開始-usestate-useeffect-fee6582d8725)