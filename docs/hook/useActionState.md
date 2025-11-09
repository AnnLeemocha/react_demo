# useActionState：從動作結果管理元件狀態

> 讓函式元件能根據「動作（Actions／表單提交等）」的結果來更新狀態，並追蹤該動作的提交／處理狀態。([React][1])

---

## 用途說明

在許多應用中，我們需要根據使用者觸發的動作（例如表單提交、按鈕啟動的伺服器函式等）來更新 UI 狀態。

傳統上，會用 `useState` 管理「提交中（loading）」、「錯誤／成功狀態」、「結果資料」等多個變數；

而 `useActionState` 提供一種更為簡化且集中化的模式：

* 傳入一個動作函式（action function），該函式將接收目前狀態與提交資料，並返回下一個狀態。([React][1])

* Hook 回傳一組值：最新的「狀態值」、一個新的 action 可直接用於 `<form action={…}>`（或按鈕 `formAction` 屬性）、以及一個 `isPending` 布林值表示該動作是否正在處理中。([React][1])

* 可以用於客戶端與伺服器端（如 React Server Components +表單動作）整合的場景，減少樣板程式碼。([wisp.blog][2])

簡而言之：當你有「動作觸發／提交＋結果處理」需求時，useActionState 是一個可考慮的 Hook。

---

## 語法說明

```jsx
import { useActionState } from "react";

const [state, formAction, isPending] = useActionState(actionFn, initialState, permalink?);
```

### 語法解析：

* `actionFn`: 一個函式，格式通常為 `async (previousState, formData) => newState`（或接受該 action 所需要的參數）。這個函式用於處理動作觸發時的邏輯。([React][1])
* `initialState`: 初始狀態值，在第一次渲染時使用，之後每次動作觸發時用前次狀態作為參考。([200OK Solutions][3])
* `permalink?`（選填）: 在某些支援伺服器動作的場景，用於動作後導航的永久連結。([React][1])
* 回傳陣列值（順序）：

  1. `state`: 目前狀態值（初次為 `initialState`，動作完成後為其回傳値）
  2. `formAction`: 一個 action 函式，可設定至 `<form action={formAction}>` 或按鈕 `formAction={formAction}`
  3. `isPending`: 布林，表示該動作是否正在進行中

---

## 使用範例

### 範例一：簡單計數器（透過動作更新）

```jsx
"use client";
import { useActionState } from "react";

async function increment(prevCount) {
  // 模擬延遲或伺服器操作
  await new Promise(resolve => setTimeout(resolve, 1000));
  return prevCount + 1;
}

function CounterForm() {
  const [count, formAction, isPending] = useActionState(increment, 0);

  return (
    <form action={formAction}>
      <p>目前計數：{count}</p>
      <button type="submit" disabled={isPending}>
        {isPending ? "Incrementing…" : "Increment"}
      </button>
    </form>
  );
}

export default CounterForm;
```

說明：

* 初始 `count` 為 `0`。
* 每次提交按鈕時觸發 `increment(prevCount)` 動作，延遲後返回新值。
* `isPending` 在動作進行期間為 `true`，可用於禁用按鈕。
* 無需額外 `useState` 管理 loading／錯誤／結果。

### 範例二：表單提交並顯示結果或錯誤訊息

```jsx
"use client";
import { useActionState } from "react";

async function submitForm(prev, formData) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const email = formData.get("email");
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { success: false, message: "請輸入有效 Email" };
  }
  return { success: true, message: "提交成功！" };
}

function EmailForm() {
  const [result, formAction, isPending] = useActionState(submitForm, { success: null, message: "" });

  return (
    <form action={formAction}>
      <input name="email" type="email" placeholder="輸入 Email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting…" : "送出"}
      </button>
      {result && <p>{result.message}</p>}
    </form>
  );
}

export default EmailForm;
```

說明：

* `submitForm` 接收前一次狀態（`prev`）與表單資料。
* 根據驗證結果返回新狀態。
* `useActionState` 自動追蹤 `isPending`、提供 `formAction`。

---

## 使用時機

### 適合使用的情況：

1. **表單提交後需要跟蹤結果／狀態**

   * 提交後返回成功／錯誤／訊息、清空欄位、顯示提示。

2. **動作可能是伺服器函式（Server Actions）或異步操作**

   * 當你使用 React Server Components 或類似流程，`useActionState` 能整合動作與狀態更新。([wisp.blog][2])

3. **希望集中管理動作相關的狀態（結果 + pending）**

   * 無需設置多個 `useState` 來管理 `loading`、`result`、`error`。

### 避免濫用的注意事項：

* **不是所有狀態都適合用 useActionState**

  * 若只是簡單 UI 狀態（如切換開／關）、非動作觸發狀態，使用 `useState` 或 `useReducer` 更合適。

* **避免將大範圍狀態集中到此 Hook**

  * `useActionState` 專注動作導向的狀態，若包含大量複雜邏輯或資料流，可能需要更完整的狀態管理方案。

* **理解 actionFn 的第一參數不同於一般提交函式**

  * `actionFn(prevState, formData)` 第一個參數是 **目前的狀態值**，不是表單資料。若忽略這點，可能混淆邏輯。([React][1])

* **注意瀏覽器支援與 React 版本**

  * `useActionState` 為 React 19+ 的新特性（或實驗／Canary 頻道），尚未在所有環境穩定使用。

---

## 實作題目

**題目：留言板表單（使用 useActionState）**

**需求：**

1. 建立一個表單，使用者可輸入留言（`<textarea name="comment" />`）並提交。
2. 提交後將留言加入留言清單，並顯示「留言已提交」或「提交失敗」訊息。
3. 使用 `useActionState` 管理留言清單狀態、提交中 `isPending` 狀態。

**範例答案：**

```jsx
"use client";
import { useActionState } from "react";

async function addComment(prevState, formData) {
  // 假設 prevState 是 { comments: [], error: null }
  await new Promise(resolve => setTimeout(resolve, 1000));
  const text = String(formData.get("comment") || "");
  if (!text) {
    return { comments: prevState.comments, error: "留言不能為空" };
  }
  const newComment = { id: Date.now(), text };
  return {
    comments: [ ...prevState.comments, newComment ],
    error: null
  };
}

function CommentForm() {
  const [state, formAction, isPending] = useActionState(addComment, { comments: [], error: null });

  return (
    <div>
      <form action={formAction}>
        <textarea name="comment" placeholder="輸入留言…" required />
        <button type="submit" disabled={isPending}>
          {isPending ? "提交中…" : "提交"}
        </button>
      </form>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      <ul>
        {state.comments.map(c => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentForm;
```

說明：

* 初始 `state` 為 `{ comments: [], error: null }`。
* 每次表單提交會觸發 `addComment(prevState, formData)`，並更新留言清單。
* `isPending` 表示正在提交中，可用於禁用按鈕或顯示提示。

---

## 為什麼重要

1. **簡化動作導向的狀態管理**

   * 將「動作 → 結果狀態」的流程整合到單一 Hook 中，減少樣板程式碼。

2. **提升表單／提交體驗**

   * 自動處理 `pending` 狀態，避免重複提交並可顯示提交中 UI。

3. **支援最新的 React 架構**

   * 在 React 19（或實驗版本）中，與 Actions API／Server Components 整合更順暢。([200OK Solutions][3])

4. **提升程式可讀性與維護性**

   * 將動作邏輯集中、狀態更新集中，比繁雜的 `useState` 多個旗標變數更乾淨。

5. **促進更一致的資料流**

   * 動作函式接收舊狀態並產生新狀態，使狀態變化更可預測。

---

[1]: https://react.dev/reference/react/useActionState?utm_source=chatgpt.com "useActionState - React"
[2]: https://www.wisp.blog/blog/what-is-reacts-useactionstate-and-when-should-you-use-it?utm_source=chatgpt.com "What is React's useActionState and When Should You Use It?"
[3]: https://200oksolutions.com/blog/exploring-react-19-new-hooks/?utm_source=chatgpt.com "Exploring React 19's New Hooks: useActionState and use Optimistic"
