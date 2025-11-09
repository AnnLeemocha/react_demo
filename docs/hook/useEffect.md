# useEffect 副作用管理

> 讓函式元件能在「畫面渲染後」執行副作用（Side Effects）。

---

## 用途說明

在 React 中，**副作用（side effect）** 指的是那些不屬於「純渲染邏輯」的操作。

React 元件本身應該只負責描述 UI 應該長什麼樣子，而不直接與外部世界互動。

然而，實際應用中我們經常需要做以下事情：

* 取得伺服器資料（fetch API）
* 操作瀏覽器 API（如 `document.title`、`window.scrollTo`）
* 設定或清除計時器
* 同步狀態到 localStorage
* 監聽與解除事件（例如 resize、scroll）

`useEffect` 讓這些行為能夠在**渲染完成後**執行，並讓 React 控制它們的執行與清除。

---

## 語法說明

```jsx
useEffect(() => {
  // 執行副作用的邏輯
  return () => {
    // 清除副作用（可選）
  };
}, [dependencies]);
```

### 語法解析：

* **第一個參數：effect callback**

  * 放置要在畫面渲染後執行的副作用邏輯。
  * 可以回傳一個清除函式（cleanup function），用來在副作用結束前清除資源。

* **第二個參數：依賴陣列（dependencies）**

  * 控制副作用的執行時機。
  * 不寫  
    → 每次渲染後都執行。
  * 空陣列 `[]`  
    → 僅在初次掛載（mount）後執行一次。
  * 帶有依賴 `[a, b]`  
    → 當 `a` 或 `b` 改變時重新執行。

### React 18 並發渲染注意事項：

* 在開發模式下（Strict Mode），React 會**執行並清除一次 effect** 以模擬元件卸載的情況，幫助你撰寫更安全的副作用。
* 在生產環境中，effect 仍然只會執行一次。

---

## 使用範例

```jsx
import { useState, useEffect } from "react";

function CounterWithTitle() {
  const [count, setCount] = useState(0);

  // 當 count 改變時更新文件標題
  useEffect(() => {
    document.title = `目前數字：${count}`;
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c + 1)}>加 1</button>
    </div>
  );
}

export default CounterWithTitle;
```

說明：

* `useEffect` 會在畫面更新後執行，保證在 DOM 已經完成更新後才修改外部環境。
* `[count]` 表示只有當 `count` 改變時才重新執行 effect。
* 若改成 `[]`，則只會在元件初次掛載時執行一次。

---

## 使用時機

1. **初始化邏輯（componentDidMount）**

   * 在元件掛載後讀取資料、設定事件或初始化第三方函式庫。

2. **狀態變化邏輯（componentDidUpdate）**

   * 當狀態或 props 改變時觸發特定動作。

3. **清理邏輯（componentWillUnmount）**

   * 在元件卸載前清除事件監聽、取消 API 請求、停止計時器等。

4. **同步外部狀態**

   * 當某個 state 改變時，同步到 localStorage、sessionStorage 或 URL。

---

## 清除副作用

在 effect 函式中回傳一個「清除函式（cleanup function）」，React 會在以下兩種情況下自動執行它：

1. 元件卸載（unmount）時。
2. effect 重新執行前（因依賴改變）。

範例：

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 回傳清除函式
    return () => {
      clearInterval(id);
    };
  }, []); // 僅在掛載與卸載時執行

  return <div>已過時間：{seconds} 秒</div>;
}

export default Timer;
```

說明：

* 當元件卸載時，React 會呼叫回傳的清除函式，停止計時器。
* 若依賴改變（如重新設定 interval），React 會先清除舊的，再執行新的。

---

## 實作題目

**題目：自動儲存輸入內容到 localStorage**

**需求：**

1. 使用者輸入文字後自動儲存到 localStorage。
2. 重新整理頁面時，自動載入上次輸入的內容。
3. 使用 `useEffect` 監聽狀態變化並同步。

**範例答案：**

```jsx
import { useState, useEffect } from "react";

function AutoSaveInput() {
  const [text, setText] = useState(() => {
    // 初次渲染時讀取 localStorage
    return localStorage.getItem("savedText") || "";
  });

  useEffect(() => {
    // 當 text 改變時，同步到 localStorage
    localStorage.setItem("savedText", text);
  }, [text]);

  return (
    <div>
      <h2>自動儲存輸入框</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入文字"
      />
      <p>目前內容：{text}</p>
    </div>
  );
}

export default AutoSaveInput;
```

---

## 為什麼重要

1. **讓 React 與外部世界溝通**

   * React 自身僅關注狀態與 UI，而 `useEffect` 負責與「外部環境」互動。

2. **取代類別元件的生命週期方法**

   * 在函式元件中整合了 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 的功能。

3. **可預測且乾淨的副作用控制**

   * 透過依賴陣列明確指定執行條件，使邏輯清晰、可維護。

4. **支援 React 18 的並發渲染**

   * `useEffect` 只在畫面「真正繪製後」執行，避免非同步渲染造成不一致。

5. **搭配其他 Hook 形成完整邏輯流程**

   * 通常與 `useState` 或 `useRef` 搭配使用，構成資料 → 副作用 → UI 的循環。

---

