# useMemo：效能優化與避免重複計算

> 讓函式元件能「記住計算結果」，避免在每次渲染時重複執行昂貴的運算。

---

## 用途說明

在 React 中，每次元件重新渲染時，所有的程式碼（包含函式、邏輯與運算）都會重新執行。

如果有某些運算成本高、但輸出結果只取決於特定依賴值（dependencies），那麼不需要每次渲染都重新計算。

這時可以使用 **`useMemo`** 來「記住」計算結果。

簡單來說：

* `useMemo` 是「記憶化（memoization）」的工具。
* 它會在依賴不變時，回傳先前計算過的結果，提升效能。
* 適合用於：

  * **昂貴的運算結果快取**
  * **避免不必要的子元件重新渲染**

---

## 語法說明

```jsx
const memoizedValue = useMemo(() => computeValue(a, b), [a, b]);
```

### 語法解析：

* **第一個參數**：一個回呼函式，內含要執行的計算邏輯。
* **第二個參數（依賴陣列）**：控制何時重新計算。

  * 若依賴中的值沒有改變，React 會回傳先前的計算結果。
* 回傳值為「記憶化後的結果」。

**重點：**

* 若沒有提供依賴陣列，每次渲染都會重新計算（失去意義）。
* 若依賴為空 `[]`，則只會在初次渲染時計算一次。

---

## 使用範例

### 範例一：避免重複執行昂貴計算

```jsx
import { useState, useMemo } from "react";

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(10);

  const computed = useMemo(() => {
    console.log("執行大量計算中...");
    // 模擬耗時運算
    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += i * value;
    }
    return total;
  }, [value]);

  return (
    <div>
      <h2>useMemo 範例</h2>
      <p>計算結果：{computed}</p>
      <p>Count：{count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>增加 Count</button>
      <button onClick={() => setValue(prev => prev + 1)}>改變 Value</button>
    </div>
  );
}

export default ExpensiveCalculation;
```

說明：

* `computed` 只會在 `value` 改變時重新計算。
* 即使 `count` 改變導致重新渲染，也不會觸發耗時計算。
* 沒有 `useMemo` 的情況下，每次渲染都會重新跑完整個 for 迴圈。

---

### 範例二：避免子元件重複渲染

```jsx
import { useState, useMemo } from "react";

function Child({ data }) {
  console.log("子元件渲染");
  return <div>資料：{data.join(", ")}</div>;
}

function Parent() {
  const [count, setCount] = useState(0);

  // 若不使用 useMemo，每次渲染都會建立新陣列，導致 Child 重新渲染
  const data = useMemo(() => [1, 2, 3], []);

  return (
    <div>
      <Child data={data} />
      <button onClick={() => setCount(prev => prev + 1)}>增加 Count ({count})</button>
    </div>
  );
}

export default Parent;
```

說明：

* `useMemo` 確保 `data` 陣列在多次渲染間保持相同的參考位址。
* 若省略 `useMemo`，React 會認為傳入的 `data` 是新物件，導致子元件重新渲染。

---

## 使用時機

1. **避免重複執行昂貴的計算**

   * 如排序、大型資料處理、過濾、數據分析等。

2. **穩定子元件的 props 引用**

   * 搭配 `React.memo` 使用時，可以防止不必要的重新渲染。

3. **控制效能瓶頸**

   * 當應用程式隨著狀態更新頻繁重新渲染時，`useMemo` 能局部優化。

4. **避免無意義的重複物件或陣列建立**

   * React 會根據物件參考（reference equality）來判斷是否更新。

---

## 實作題目

**題目：篩選清單（避免重複計算）**

**需求：**

1. 有一組商品清單（名稱、價格）。
2. 使用者輸入價格範圍，篩選符合條件的商品。
3. 使用 `useMemo` 優化篩選結果，避免每次輸入文字都重新執行完整篩選。

**範例答案：**

```jsx
import { useState, useMemo } from "react";

function ProductFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const products = [
    { id: 1, name: "筆電", price: 1200 },
    { id: 2, name: "滑鼠", price: 50 },
    { id: 3, name: "鍵盤", price: 200 },
    { id: 4, name: "螢幕", price: 800 },
  ];

  const filteredProducts = useMemo(() => {
    console.log("執行篩選中...");
    return products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
  }, [minPrice, maxPrice, products]);

  return (
    <div>
      <h2>商品篩選</h2>
      <label>
        最低價：
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
      </label>
      <label>
        最高價：
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </label>

      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductFilter;
```

說明：

* 篩選邏輯只在 `minPrice` 或 `maxPrice` 改變時重新執行。
* 若有其他不相關的狀態更新，不會重複執行篩選。

---

## 為什麼重要

1. **提升效能**

   * 對於複雜或高頻率渲染的元件，能顯著減少重複計算的開銷。

2. **穩定子元件的 props**

   * 確保傳入的物件或陣列參考不變，避免不必要的重新渲染。

3. **保持渲染純粹**

   * 避免在每次渲染中重新執行非必要的邏輯，使元件行為更可預測。

4. **支援 React 18 並發渲染**

   * React 可能中斷並重啟渲染，`useMemo` 可確保計算結果一致且安全。

5. **與其他 Hook 協作**

   * 常與 `useCallback` 搭配，用於記憶化回呼函式以提升子元件效能。

---
