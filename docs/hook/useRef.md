# useRef：參考與非渲染狀態管理

> 讓函式元件能「記住某個值或 DOM 節點」，而不會觸發重新渲染。

---

## 用途說明

在 React 中，當我們使用 `useState` 更新狀態時，元件會重新渲染。

然而，有些情境下，我們希望**保存資料但不引發重新渲染**，例如：

* 儲存一個 DOM 元素的參考（例如：取得輸入框焦點）
* 儲存某個在渲染之間持續存在的變數（例如：計時器 ID、前一次的值、外部 API 實例）

這時可以使用 **`useRef`**。

`useRef` 提供一個可變的物件，其結構為 `{ current: ... }`，即使元件重新渲染，`ref.current` 也不會被重置。

這讓它成為「非渲染狀態」（non-render state）的理想工具。

---

## 語法說明

```jsx
const ref = useRef(initialValue);
```

### 語法解析：

* **`useRef(initialValue)`**：建立一個 `ref` 物件，並將 `current` 屬性初始化為指定的值。
* **`ref.current`**：儲存資料或 DOM 節點的地方。
* 當 `ref.current` 改變時，不會導致元件重新渲染。

---

## 使用範例

### 範例一：操作 DOM 元素

```jsx
import { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus(); // 取得 input 元素並聚焦
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="點擊按鈕聚焦" />
      <button onClick={handleFocus}>聚焦輸入框</button>
    </div>
  );
}

export default InputFocus;
```

說明：

* 使用 `ref` 綁定在 `<input>` 元素上，React 在渲染後會將真實 DOM 元素指派給 `inputRef.current`。
* 點擊按鈕時，透過 `inputRef.current.focus()` 操作 DOM。
* 不需使用 `document.querySelector`，這是 React 官方推薦的方式。

---

### 範例二：儲存不觸發渲染的資料

```jsx
import { useState, useRef, useEffect } from "react";

function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderTimes = useRef(0);

  useEffect(() => {
    renderTimes.current += 1; // 不觸發重新渲染
  });

  return (
    <div>
      <p>點擊次數：{count}</p>
      <p>元件重新渲染次數：{renderTimes.current}</p>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </div>
  );
}

export default RenderCounter;
```

說明：

* `renderTimes.current` 在每次渲染時更新，但不會引起新的渲染。
* 若這個計數使用 `useState` 會造成無限重新渲染循環，因此要用 `useRef`。

---

## 使用時機

1. **操作 DOM 元素**

   * 如手動聚焦、捲動、控制播放影片等。

2. **儲存不需要觸發重新渲染的資料**

   * 例如：計時器 ID、前一次的 props、或某些快取值。

3. **避免閉包陷阱**

   * `ref` 的值在函式中不會被重新綁定，可以保持最新狀態而不必重新建立 effect。

4. **保存可變資料的生命週期**

   * 資料在元件整個生命週期內都會被保存，即使重新渲染也不會重置。

---

## 實作題目

**題目：計時器（使用 useRef 管理 interval）**

**需求：**

1. 按下「開始」後，每秒數字遞增。
2. 按下「停止」後停止計時。
3. 使用 `useRef` 儲存計時器 ID，而非用 state。

**範例答案：**

```jsx
import { useState, useRef } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null); // 用來儲存 interval ID

  const startTimer = () => {
    if (timerRef.current) return; // 防止重複啟動
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <h2>計時器：{seconds} 秒</h2>
      <button onClick={startTimer}>開始</button>
      <button onClick={stopTimer}>停止</button>
    </div>
  );
}

export default Timer;
```

說明：

* `timerRef.current` 儲存 interval ID，不會觸發重新渲染。
* 若使用 `useState` 儲存 ID，會造成額外渲染且沒有必要。
* 使用 `useRef` 是管理「非 UI 狀態」的最佳選擇。

---

## 為什麼重要

1. **避免不必要的重新渲染**

   * 儲存資料或 DOM 參考而不影響 UI 效能。

2. **安全操作 DOM**

   * React 官方建議透過 `ref` 操作 DOM，而非直接使用 `document.querySelector`。

3. **保存跨渲染的資料**

   * 在多次渲染之間保持狀態，例如前一次值、動畫實例、WebSocket 連線等。

4. **搭配 useEffect 使用**

   * `useEffect` 負責設定或清除副作用，`useRef` 儲存其相關資源（如事件監聽器或定時器 ID）。

5. **支援 Concurrent Rendering**

   * React 18 並發模式下，`ref` 的值不會受中斷渲染影響，保持穩定。

---

是否要我照這個教學結構繼續撰寫下一章 **useMemo：效能優化與避免重複計算**？
我可以延續這個章節風格，幫你建立完整的 React Hooks 筆記系列。
