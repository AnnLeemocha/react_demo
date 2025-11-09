# useState 管理狀態

> 讓函式元件能「記住資料」，在畫面重新渲染時仍能保存先前的值。

---

## 用途說明

在 React 中，函式元件預設是「純函式」——當元件被呼叫時，會重新執行整個函式。如果你用一般變數儲存資料，每次渲染都會重置。

`useState` 是 React 提供的 Hook，用來在函式元件中「保存狀態」，並在狀態變化時自動觸發重新渲染 UI。

簡單來說：

* `useState` 用來定義「資料狀態」。
* 改變狀態的方式是呼叫由 `useState` 回傳的「更新函式」。
* 狀態更新後，React 會重新渲染畫面，並使用新的值。

## 語法說明

```jsx
const [state, setState] = useState(initialValue);
```

* **state**：目前狀態的值。
* **setState**：用來更新狀態的函式，呼叫後 React 會觸發重新渲染。
* **initialValue**：狀態的初始值，可以是任意型別（字串、數字、物件、陣列等）。

---

### 延遲初始化（Lazy Initialization）

若初始值需要透過計算取得，可以傳入一個回呼函式，React 只會在第一次渲染時計算一次：

```jsx
const [state, setState] = useState(() => computeInitialValue());
```

這樣能避免每次重新渲染時都重複執行初始化邏輯。

---

### 回呼式更新（Functional Update）

當新的狀態值需要根據「前一次狀態」來計算時，建議使用回呼式更新：

```jsx
setState(prevState => prevState + 1);
```

說明：

* `setState` 是「非同步」的，避免在同個 render 後馬上依賴舊值
* `setState` 會接收一個函式，該函式的參數是「前一次的狀態值」。
* React 會保證 `prevState` 是最新的狀態，不會受異步更新或批次處理影響。
* 這種寫法在需要多次連續更新狀態時特別安全，例如：

```jsx
// 錯誤：可能多次更新時只加一次
setCount(count + 1);
setCount(count + 1);

// 正確：每次都根據前一次值遞增
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

回呼式更新是 React 18 並發模式（Concurrent Mode）下建議的最佳實踐，能確保狀態更新的正確性。

---

## 使用範例

```jsx
import { useState } from "react";

function Counter() {
  // 宣告一個狀態變數 count，初始值為 0
  const [count, setCount] = useState(0);

  // 點擊按鈕時更新狀態
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>目前數字：{count}</h1>
      <button onClick={handleClick}>加 1</button>
    </div>
  );
}

export default Counter;
```

說明：

* `useState(0)` 的參數是初始值。
* `useState` 回傳一個陣列，第一個值是「目前的狀態」，第二個是「設定狀態的函式」。
* 改變狀態時，React 會自動重新渲染畫面。
* 在重新渲染後，`count` 的值會保持最新，不會被重置。



---

## 使用時機

1. **需要在畫面上反映動態資料時**

   * 例如：表單輸入值、點擊次數、切換開關、登入狀態等。

2. **需要根據使用者操作更新 UI 時**

   * 如：按下按鈕改變顯示內容。

3. **希望某些資料在多次渲染之間被記住時**

   * 比如一個搜尋關鍵字、目前頁碼、勾選的選項等。

4. **不適合使用 useState 的情況**

   * 如果資料不會影響畫面顯示（例如只是記錄計時器 ID），應考慮用 `useRef`。
   * 如果狀態變化邏輯複雜，可改用 `useReducer`。

---

## 實作題目

**題目：Todo 輸入框**

請用 `useState` 實作一個簡單的輸入框，讓使用者輸入文字後按下按鈕顯示出來。

**需求：**

1. 有一個文字輸入框和一個按鈕。
2. 按下按鈕後，畫面下方顯示輸入的文字。
3. 顯示後清空輸入框。

**提示：**

* 用 `useState` 管理兩個狀態：輸入中的文字（`inputValue`）與顯示文字（`displayText`）。
* 使用 `onChange` 監聽輸入事件。

**範例答案：**

```jsx
import { useState } from "react";

function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleAdd = () => {
    setDisplayText(inputValue);
    setInputValue(""); // 清空輸入框
  };

  return (
    <div>
      <input
        type="text"
        placeholder="輸入待辦事項"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>加入</button>

      {displayText && <p>你輸入的是：{displayText}</p>}
    </div>
  );
}

export default TodoInput;
```

---

## 為什麼重要

1. **是 React 狀態管理的基礎**

   * 幾乎所有動態互動都依賴 `useState`。

2. **讓函式元件具備「記憶能力」**

   * 使得函式元件不再只是靜態畫面，而能根據使用者操作動態更新。

3. **支撐其他 React 機制**

   * 高階 Hook（如 `useEffect`、`useMemo`、`useTransition`）都會與 `useState` 互動。

4. **符合 React 的單向資料流概念**

   * 當狀態變化，React 根據最新狀態重新渲染，確保 UI 永遠與資料一致。

5. **是理解 React 思維的起點**

   * 學會 `useState`，才能理解「聲明式 UI」與「資料驅動畫面」的理念。
