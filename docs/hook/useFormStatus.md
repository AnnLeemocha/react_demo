# useFormStatus：表單提交狀態追蹤

> 讓函式元件能在表單提交期間追蹤其「提交中」狀態與提交資料，以改善使用體驗與防止重複提交。

---

## 用途說明

在使用 HTML `<form>` 或伺服器動作（Server Actions）時，常見需求包括：

* 使用者按下提交按鈕後需要顯示「正在提交」狀態（Prevent double‑submit）
* 在提交過程中禁用按鈕或輸入欄位
* 顯示提交資料的預覽或提示
* 在提交完成後根據返回資料做 UI 更新

useFormStatus 提供一個 Hook，用來從最近一次表單提交中取得「狀態資訊」

—— 例如是否正在提交（pending），提交的資料 (FormData)、使用的 HTTP 方法 (method)、action 函式或 URL (action) 等。 ([React][1])

> 注意：這個 Hook 必須在 `<form>` 元件內的一個子元件中呼叫，才能追蹤到該表單的提交狀態。 ([React][1])

---

## 語法說明

```jsx
import { useFormStatus } from "react-dom";

const { pending, data, method, action } = useFormStatus();
```

### 語法解析：

* **`useFormStatus()`**：呼叫時不帶參數。
* 回傳一個物件，至少包括以下屬性：

  * `pending`: 布林值，表示該表單是否正在提交。 ([React][1])
  * `data`: 若提交中，則為 `FormData` 的實例；否則為 `null`。 ([React][1])
  * `method`: 字串 “get” 或 “post”，表示該 `<form>` 的 method。 ([React][1])
  * `action`: 若 `<form>` 的 `action` 屬性為函式或 URL，則返回該函式或 URL，否則為 `null`。 ([LogRocket Blog][2])
* 呼叫位置限制：必須置於該 `<form>` 元件的子元件中。若在同一元件渲染 `<form>` 並同時呼叫此 Hook，將無效。 ([GitHub][3])

---

## 使用範例

### 範例一：基本提交按鈕禁用

```jsx
"use client";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function App() {
  async function handleSubmit(formData) {
    "use server";
    // 模擬延遲
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(formData.get("name"));
  }

  return (
    <form action={handleSubmit}>
      <input name="name" type="text" required />
      <SubmitButton />
    </form>
  );
}
```

說明：

* 當表單提交時，`pending` 會變為 `true`，按鈕被禁用，顯示 “Submitting…”
* 完成後 `pending` 回復 `false`，按鈕恢復可用狀態。

### 範例二：顯示提交資料預覽

```jsx
"use client";
import { useFormStatus } from "react-dom";

function FormPreview() {
  const { data, pending } = useFormStatus();

  return (
    <div>
      {pending && data && (
        <p>Submitting: {data.get("username")}</p>
      )}
    </div>
  );
}

export default function UsernameForm() {
  async function action(formData) {
    "use server";
    await new Promise(resolve => setTimeout(resolve, 1500));
    return null;
  }

  return (
    <form action={action} method="post">
      <label htmlFor="username">Username:</label>
      <input id="username" name="username" required />
      <button type="submit">Submit</button>
      <FormPreview />
    </form>
  );
}
```

說明：

* 利用 `data` 屬性取得當前提交的 `FormData`，可用於顯示使用者提交內容或追蹤。

---

## 使用時機

1. **表單提交流程需要追蹤狀態時**

   * 例如：註冊、登入、資料上傳、支付流程等。
   * 需要顯示 loading、禁用重複提交、顯示提交中提示。

2. **搭配伺服器動作（Server Actions）或 HTML `<form>` 的 `action` 屬性**

   * 當表單提交由伺服器端處理時，useFormStatus 能協助監控。

3. **避免濫用的注意事項**

   * 不應用於單純本地狀態變更、非提交流程。
   * 不適合用來監控任意按鈕點擊或非 `<form>` 提交事件。
   * 如果你的表單純在客戶端處理、無伺服器 action，用 useFormStatus 可能無法帶來實質益處。
   * 確保 Hook 所在元件實際是 `<form>` 的子元件，否則 `pending` 永遠會是 `false`。 ([React][1])

---

## 實作題目

**題目：檔案上傳表單**

**需求：**

1. 建立一個表單，包含檔案輸入欄位（`<input type="file" />`）與提交按鈕。
2. 當使用者提交時，按鈕變為「Uploading…」並禁用。
3. 提交中顯示「正在上傳 … 檔案名稱：XXX」。
4. 使用 useFormStatus 追蹤狀態與資料。

**範例答案：**

```jsx
"use client";
import { useFormStatus } from "react-dom";

function UploadButton() {
  const { pending, data } = useFormStatus();

  const fileName = data?.get("file")?.name;

  return (
    <div>
      <button type="submit" disabled={pending}>
        {pending ? "Uploading…" : "Upload File"}
      </button>
      {pending && fileName && (
        <p>Uploading file: {fileName}</p>
      )}
    </div>
  );
}

export default function FileUploadForm() {
  async function uploadAction(formData) {
    "use server";
    const file = formData.get("file");
    // 模擬上傳
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Uploaded file:", file);
  }

  return (
    <form action={uploadAction} method="post" encType="multipart/form-data">
      <input type="file" name="file" required />
      <UploadButton />
    </form>
  );
}
```

說明：

* 使用 `data.get("file")` 取得檔案欄位資料。
* 利用 `pending` 控制按鈕文字與禁用。

---

## 為什麼重要

1. **改善使用者體驗**

   * 在提交過程中提供視覺反饋、防止重複提交，讓 UI 更具響應性。

2. **簡化提交狀態管理**

   * 不需手動管理 `isSubmitting`、`loading` 等狀態變數，useFormStatus 提供集中化狀態資訊。

3. **支援新型態表單流程（例如 React Server Actions）**

   * 在 React 最新版本中，表單提交可能由伺服器函式處理，useFormStatus 為該流程提供支援。

4. **增強元件可重用性**

   * 提交按鈕、上傳欄位、狀態提示等可以透過 useFormStatus 抽象為通用元件。

5. **降低錯誤與重複提交風險**

   * 使用 `pending` 屬性可以防止使用者在提交時重複點擊、產生重複請求。

---

[1]: https://react.dev/reference/react-dom/hooks/useFormStatus?utm_source=chatgpt.com "useFormStatus - React"
[2]: https://blog.logrocket.com/understanding-react-useformstate-useformstatus-hooks/?utm_source=chatgpt.com "Understanding React's useFormState and useFormStatus Hooks"
[3]: https://github.com/facebook/react/issues/27980?utm_source=chatgpt.com "useFormStatus only works from within the scope of the form it relates to"
