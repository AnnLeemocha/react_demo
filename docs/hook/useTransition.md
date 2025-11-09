# useTransition：優化 UI 響應與延遲狀態更新

> 讓函式元件能將非急迫狀態更新標記為「低優先級」，保持 UI 流暢，提高使用者體驗。

---

## 用途說明

在 React 中，當狀態更新涉及大量計算或渲染大型列表時，UI 可能出現**卡頓或延遲反應**。
`useTransition` 是 React 18 引入的「非阻塞更新」機制，能：

1. 將某些狀態更新標記為 **非急迫（transitional）**，先保持 UI 響應。
2. 顯示載入指示（Loading）或其他占位 UI，避免使用者感受到卡頓。

常見用途：

* 搜尋或過濾大型列表
* 畫面複雜或需要大量計算的元件
* 延遲非核心狀態更新以提升使用者互動流暢度

---

## 語法說明

```jsx
const [isPending, startTransition] = useTransition();
```

### 語法解析：

* **`useTransition()`** 返回一個陣列：

  1. `isPending`：布林值，表示非急迫更新是否正在處理中，可用於顯示 Loading 狀態。
  2. `startTransition`：將更新標記為「低優先級」的函式。

* 使用方式：

```jsx
startTransition(() => {
  setState(newValue); // 此更新被視為非急迫
});
```

* 在 `startTransition` 中的狀態更新不會阻塞急迫更新（如輸入框文字、點擊事件）。

---

## 使用範例

### 範例一：延遲過濾列表

```jsx
import { useState, useTransition } from "react";

function FilterList({ items }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      const result = items.filter(item => item.includes(value));
      setFiltered(result);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="搜尋..." />
      {isPending && <p>Loading...</p>}
      <ul>
        {filtered.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterList;
```

說明：

* 使用者輸入時 `query` 更新為「急迫狀態」，即時反映輸入文字。
* 過濾列表的更新被包在 `startTransition` 中，屬於「非急迫狀態」，可延遲計算。
* `isPending` 可以用來顯示載入提示。

---

### 範例二：結合大型列表與非阻塞更新

```jsx
import { useState, useTransition } from "react";

function LargeList() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      setFiltered(items.filter(item => item.toLowerCase().includes(value.toLowerCase())));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} placeholder="搜尋大型列表..." />
      {isPending && <p>正在載入結果...</p>}
      <ul>
        {filtered.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default LargeList;
```

說明：

* 即使列表很大，輸入框仍能即時響應。
* 過濾列表的計算延後，不阻塞核心 UI 互動。

---

## 使用時機

1. **大型列表或昂貴計算**

   * 避免重新渲染大資料集造成卡頓。

2. **非急迫狀態更新**

   * UI 不需立即反映的計算或篩選，例如過濾列表、生成報表。

3. **提高使用者互動流暢度**

   * 保證核心 UI（文字輸入、按鈕點擊）即時反應。

4. **結合 isPending 顯示 Loading**

   * 提供使用者等待提示，提高使用體驗。

---

## 實作題目

**題目：大型搜尋列表**

**需求：**

1. 有一個包含 5000 個文字項目的列表。
2. 使用者在輸入框輸入文字時，列表動態篩選符合條件的項目。
3. 輸入文字應立即顯示，而列表篩選是非急迫更新。
4. 篩選時顯示 Loading。

**範例答案：**

```jsx
import { useState, useTransition } from "react";

function SearchList() {
  const items = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      setFiltered(items.filter(item => item.toLowerCase().includes(value.toLowerCase())));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="搜尋項目..." />
      {isPending && <p>Loading...</p>}
      <ul>
        {filtered.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default SearchList;
```

說明：

* `query` 更新是急迫狀態，即時顯示文字。
* `filtered` 更新是非急迫狀態，延遲處理大量篩選計算。
* `isPending` 控制載入提示，提升使用者體驗。

---

## 為什麼重要

1. **改善使用者體驗**

   * 在大量資料或昂貴運算的場景下，保持核心 UI 流暢。

2. **控制更新優先級**

   * 將非急迫更新標記為低優先級，急迫 UI 不會被阻塞。

3. **與 React 18 並發渲染協作**

   * 支援 concurrent rendering，提高渲染效率與可預測性。

4. **簡單顯示 Loading**

   * `isPending` 方便在非急迫更新進行時顯示占位 UI。

5. **適合大型應用**

   * 搜尋、過濾、排序或報表生成等高成本操作。

---
