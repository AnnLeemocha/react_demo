# 自訂 Hook（Custom Hook）

> 將重複的邏輯抽離成可重用的函式，讓元件更簡潔、邏輯更清晰。

---

## 用途說明

React 的自訂 Hook 是一種用來**封裝與重用邏輯**的設計方式。
當不同元件需要共用相似的狀態或副作用時（例如表單控制、資料請求、事件監聽），
你可以將這些邏輯抽出成一個以 `use` 開頭的函式，稱為 **自訂 Hook**。

自訂 Hook 並不是新的 React 元件型別，而是**普通的函式**，
只是它內部**可以使用其他 Hook**（例如 `useState`、`useEffect`、`useMemo`）。

每次呼叫自訂 Hook，React 都會為該元件建立**獨立的狀態空間**。
因此，即使多個元件共用相同的 Hook，也不會互相干擾。

這種模式的核心價值在於：

* **抽象邏輯**（例如資料同步、事件監聽）
* **重用邏輯**（避免重複撰寫）
* **分離邏輯與 UI** （使元件更專注於畫面呈現）
* 更容易測試與維護

---

## 語法說明

```jsx
function useSomething(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // 副作用邏輯
    return () => {
      // 清除副作用（可選）
    };
  }, []);

  return { value, setValue };
}
```

### 語法解析：

* **命名規則**

  * 必須以 `use` 開頭（例如 `useForm`、`useFetch`）。
  * 這不是命名習慣，而是 React 的**靜態分析要求**。
    若不以 `use` 開頭，React 將無法追蹤 Hook 的呼叫順序，導致錯誤。

* **呼叫規則**

  * 自訂 Hook 必須在 **React 函式元件或另一個 Hook** 的最上層呼叫。
  * 不可在條件或迴圈中動態呼叫，否則會破壞 Hook 的呼叫順序。

* **回傳值設計**

  * 常見設計方式有：

    * 物件 `{ data, loading, error }`
    * 陣列 `[value, setValue]`
  * 依據語意設計 API，方便使用者理解。

---

### 進階細節與陷阱解析

1. **React 18 並發渲染的重複執行問題**

   * 在開發模式（Strict Mode）下，React 會故意讓 Hook 內的 effect 執行兩次（模擬掛載/卸載），
     以幫助開發者發現未清除的副作用。
   * 若 Hook 內包含計時器、API 請求、事件監聽，必須確保：

     * 有明確的清除函式；
     * 或使用「旗標（flag）」防止重複執行。

   ```jsx
   useEffect(() => {
     let active = true;
     fetchData().then((res) => {
       if (active) setData(res);
     });
     return () => {
       active = false;
     };
   }, []);
   ```

2. **閉包陷阱（Closure Trap）**

   * 若 Hook 內部的回呼函式依賴外部變數，必須小心「閉包記住舊值」的問題。
   * 若未正確列入依賴，可能造成狀態更新不一致或無法觸發。

   ```jsx
   function useCounter() {
     const [count, setCount] = useState(0);

     function increment() {
       // 錯誤：若 count 未列入依賴，會捕捉舊值
       setCount(count + 1);
     }

     return { count, increment };
   }
   ```

   **解法：**
   使用函式型更新，確保取得最新狀態：

   ```jsx
   setCount((prev) => prev + 1);
   ```

3. **依賴設計錯誤**

   * 當 Hook 內部使用 `useEffect`、`useMemo` 時，必須正確列出依賴。
   * 常見錯誤是忽略某個外部參數導致資料不同步。
   * React 18 的 ESLint Plugin (`eslint-plugin-react-hooks`)
     能協助自動檢查與修正這類問題。

4. **共享狀態與封裝邏輯的界線**

   * 自訂 Hook 預設是「每個呼叫者獨立」。
   * 若需要跨元件共用狀態，應搭配 **Context** 或 **外部狀態管理工具**（如 Redux、Zustand）。

5. **副作用的非同步清除**

   * 若 Hook 內有非同步副作用（如 API 請求），在卸載後更新 state 會觸發警告。
     解法是用旗標或 AbortController 避免卸載後更新。

---

## 使用範例

### 範例一：監聽視窗大小

```jsx
import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

// 使用
function App() {
  const { width, height } = useWindowSize();
  return <p>螢幕大小：{width} x {height}</p>;
}
```

---

### 範例二：封裝資料抓取邏輯

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network error");
        const result = await res.json();
        if (!ignore) setData(result);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, error, loading };
}

// 使用
function PostList() {
  const { data, error, loading } = useFetch("/api/posts");

  if (loading) return <p>載入中...</p>;
  if (error) return <p>錯誤：{error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

## 使用時機

1. **重用邏輯時**

   * 當多個元件需要共用相同的狀態或副作用邏輯，例如滾動監聽、API 請求、表單輸入等。

2. **抽象功能模組時**

   * 當一段邏輯具有清楚的行為邊界，可以設計成專用 Hook，例如 `useAuth`、`useTheme`。

3. **拆解複雜元件時**

   * 當元件邏輯太多導致可讀性下降時，將內部邏輯拆分成多個 Hook 可提升可維護性。

---

### 避免濫用的注意事項

1. **不要為了「看起來乾淨」而過度拆分**

   * 自訂 Hook 是為了重用或抽象邏輯，不是為了讓檔案變短。
     若 Hook 僅被使用一次，反而可能增加理解成本。

2. **確保 API 清晰**

   * 過度回傳內部狀態（例如多層物件）會讓使用者難以掌握。
   * 應明確定義「輸入（參數）」與「輸出（回傳值）」。

3. **不要讓 Hook 同時負責太多職責**

   * 一個 Hook 應只關注一個邏輯單位（例如請求資料或管理輸入），
     避免產生過度耦合。

4. **避免副作用污染外部狀態**

   * Hook 應該封閉在自己的邏輯中，不應任意操作外部變數或 DOM 節點。

5. **測試與文件化**

   * 若自訂 Hook 用於專案共用層，應撰寫單元測試與明確文件。

---

## 實作題目

**題目：撰寫 `useCountdown(initialSeconds)`**

**需求：**

1. 每秒倒數直到 0。
2. 提供：

   * `timeLeft`：剩餘秒數。
   * `reset()`：重新啟動倒數。
3. 倒數結束後自動停止計時器。

**範例答案：**

```jsx
import { useState, useEffect, useRef } from "react";

function useCountdown(initialSeconds) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timerRef = useRef(null);

  const start = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(initialSeconds);
    start();
  };

  useEffect(() => {
    start();
    return () => clearInterval(timerRef.current);
  }, []);

  return { timeLeft, reset };
}
```

---

## 為什麼重要

1. **促進邏輯重用**
   減少重複程式碼，提升開發效率與一致性。

2. **分離邏輯與 UI**
   Hook 處理資料邏輯，元件負責畫面，讓結構更清晰。

3. **提升可維護性**
   自訂 Hook 可獨立測試、版本化、共用。

4. **支援 React 18 並發渲染模型**
   Hook 遵循 React 生命週期規範，可在 Concurrent Mode 下保持穩定行為。

5. **建立團隊共用邏輯層**
   可形成公司內部的 `hooks/` 工具庫，作為邏輯復用的核心。

---
