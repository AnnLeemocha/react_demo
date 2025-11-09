# useCallback：函式記憶化與子元件渲染優化

> 讓函式元件能「記住函式」，避免每次渲染都建立新的函式，從而提升效能與穩定子元件渲染。

---

## 用途說明

在 React 中，每次元件重新渲染時，**元件內定義的函式都會被重新建立**。

這會帶來兩個問題：

1. **子元件不必要的重新渲染**

   * 當子元件依賴傳入的函式作為 props，且使用 `React.memo` 優化渲染時，每次父元件渲染都會產生新函式，導致子元件仍然重新渲染。

2. **效能浪費**

   * 對於複雜應用或高頻率事件，每次重新建立函式可能增加 GC 負擔。

`useCallback` 用來**記憶化函式**，確保在依賴不變時，函式引用保持不變。

---

## 語法說明

```jsx
const memoizedCallback = useCallback(
  () => {
    // 要執行的函式邏輯
  },
  [dependencies] // 依賴陣列
);
```

### 語法解析：

* **第一個參數**：要記憶化的函式。
* **第二個參數（依賴陣列）**：

  * 依賴值改變時，函式會重新建立。
  * 若依賴未改變，React 會回傳相同函式引用。

---

## 使用範例

### 範例一：避免子元件重複渲染

```jsx
import { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("子元件渲染");
  return <button onClick={onClick}>點我</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // 記憶化函式，依賴空陣列，永遠不變
  const handleClick = useCallback(() => {
    console.log("按鈕點擊");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>增加 Count</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent;
```

說明：

* `Child` 使用 `React.memo` 避免不必要渲染。
* 若不使用 `useCallback`，每次 `Parent` 重新渲染時，`handleClick` 都是新函式，`Child` 仍會渲染。
* 使用 `useCallback` 後，`Child` 僅在依賴改變時渲染。

---

### 範例二：結合 useMemo 優化計算與函式

```jsx
import { useState, useMemo, useCallback } from "react";

function ExpensiveList({ multiplier, onClick }) {
  const items = useMemo(() => {
    console.log("計算列表");
    return [1, 2, 3].map(n => n * multiplier);
  }, [multiplier]);

  return (
    <ul>
      {items.map(n => (
        <li key={n} onClick={onClick}>{n}</li>
      ))}
    </ul>
  );
}

function App() {
  const [multiplier, setMultiplier] = useState(1);

  const handleClick = useCallback(() => {
    console.log("點擊項目");
  }, []);

  return (
    <div>
      <button onClick={() => setMultiplier(prev => prev + 1)}>倍數 +1</button>
      <ExpensiveList multiplier={multiplier} onClick={handleClick} />
    </div>
  );
}

export default App;
```

說明：

* `useMemo` 用於記憶化計算結果。
* `useCallback` 用於記憶化傳入子元件的函式。
* 結合兩者，可同時避免昂貴計算與子元件不必要渲染。

---

## 使用時機

1. **父元件頻繁渲染，子元件使用 React.memo**

   * 避免子元件因函式參考變化而重新渲染。

2. **需要將函式傳給子元件**

   * 確保函式在依賴不變時引用不變。

3. **與 useMemo 或 useEffect 搭配**

   * 例如：作為依賴傳入 useEffect 或 useMemo。

4. **優化高頻率事件回呼**

   * 避免每次渲染都建立新函式，減少效能消耗。

---

## 實作題目

**題目：計數器與子元件點擊事件**

**需求：**

1. 父元件有一個 count 狀態，每次點擊按鈕增加 count。
2. 子元件是一個按鈕，點擊後顯示 console.log。
3. 使用 `React.memo` 優化子元件，並使用 `useCallback` 避免子元件每次渲染都重新建立函式。

**範例答案：**

```jsx
import { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("子元件渲染");
  return <button onClick={onClick}>點我</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("子元件被點擊");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>增加 Count</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent;
```

說明：

* 子元件只在第一次渲染時渲染，點擊父元件增加 count 不會導致子元件重新渲染。

---

## 為什麼重要

1. **穩定函式引用**

   * 避免因父元件重建函式而導致子元件不必要渲染。

2. **效能優化**

   * 對於大型應用或高頻繁更新場景，能減少函式重建和子元件渲染。

3. **搭配 React.memo 使用**

   * 是 `React.memo` 正確使用的關鍵，確保 props 引用不變。

4. **與 useMemo 搭配**

   * 記憶化函式與計算結果，最大化效能提升。

5. **支援 React 18 並發渲染**

   * 函式引用穩定，避免在 concurrent rendering 下出現副作用或不一致。

---
