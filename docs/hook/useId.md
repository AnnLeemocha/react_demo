# useId：穩定唯一 ID 生成

> 讓函式元件能生成「跨渲染穩定且唯一的 ID」，適合用於表單元素、ARIA 屬性及列表 key。

---

## 用途說明

在 React 中，很多情況需要唯一的識別值，例如：

* `<input>` 與 `<label>` 的 `id` 與 `htmlFor`
* 可存取的 DOM 元素 ID
* ARIA 屬性（`aria-labelledby`、`aria-describedby`）
* 用於 key 的補助（非 list 遍歷 key）

`useId` 可以在元件每次渲染時生成 **穩定且唯一的 ID**：

* 在伺服器端渲染（SSR）與客戶端渲染（CSR）中保持一致
* 不需要手動生成 `uuid` 或類似函式
* 適合配合多個相同元件生成唯一 ID

---

## 語法說明

```jsx
const id = useId();
```

### 語法解析：

* **回傳值 `id`**

  * 唯一且穩定，跨渲染不會改變
  * 可以直接用於元素 `id` 或組合成複合 ID，例如 `labelId = id + "-label"`

* **特性**：

  * 每次渲染生成不同 ID，但同一個元件實例 ID 穩定
  * 與 SSR 兼容，避免 Hydration mismatch

---

## 使用範例

### 範例一：input 與 label 配合

```jsx
import { useId } from "react";

function InputField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>姓名：</label>
      <input id={id} type="text" placeholder="輸入姓名" />
    </div>
  );
}

export default InputField;
```

說明：

* `label` 與 `input` 共享同一個唯一 ID
* 不需要手動生成或硬編寫 ID
* SSR 與 CSR 渲染一致，不會出現 Hydration mismatch

---

### 範例二：生成多個複合 ID

```jsx
import { useId } from "react";

function Form() {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-username`}>帳號：</label>
      <input id={`${id}-username`} placeholder="帳號" />
      
      <label htmlFor={`${id}-email`}>Email：</label>
      <input id={`${id}-email`} placeholder="Email" />
    </div>
  );
}

export default Form;
```

說明：

* 使用 `${id}-suffix` 生成多個相關元素 ID
* 確保每個表單元素有唯一標識，方便無障礙設計與測試

---

## 使用時機

1. **表單元素 ID**

   * label 與 input 配對，避免硬編寫重複 ID。

2. **ARIA 屬性**

   * `aria-labelledby`、`aria-describedby` 等需要唯一 ID 的無障礙屬性。

3. **多個相同元件渲染**

   * 列表或動態元件需要獨立且穩定的 ID。

4. **SSR 與 CSR 一致性**

   * 保證伺服器渲染與客戶端渲染的 ID 相同，避免 Hydration mismatch。

---

### 避免濫用的注意事項

* **不要用 useId 當作列表 key**

  * key 最好使用資料本身的唯一屬性（如 id），useId 是生成元件實例唯一 ID，不保證資料級唯一性。

* **不適合頻繁更新的狀態**

  * useId 是穩定的初始值，不能依賴其變化來做計算或副作用。

* **避免在副作用依賴中使用**

  * 不要將 useId 作為 useEffect 或 useMemo 的依賴，因為其值在元件生命週期內不變。

---

## 實作題目

**題目：表單元件多個欄位**

**需求：**

1. 建立一個表單，包含「帳號」與「密碼」欄位。
2. 使用 useId 生成 input 與 label 對應 ID。
3. 保證多次渲染或多個表單元件實例的 ID 不衝突。

**範例答案：**

```jsx
import { useId } from "react";

function LoginForm() {
  const id = useId();

  return (
    <form>
      <div>
        <label htmlFor={`${id}-username`}>帳號：</label>
        <input id={`${id}-username`} placeholder="帳號" />
      </div>
      <div>
        <label htmlFor={`${id}-password`}>密碼：</label>
        <input id={`${id}-password`} type="password" placeholder="密碼" />
      </div>
      <button type="submit">登入</button>
    </form>
  );
}

export default LoginForm;
```

說明：

* 每個 `LoginForm` 元件實例生成不同的 ID
* label 與 input 對應正確
* 適合重複渲染多個表單或欄位元件

---

## 為什麼重要

1. **生成穩定且唯一 ID**

   * 避免手動生成重複或硬編寫 ID 的錯誤。

2. **支援 SSR 與 CSR**

   * 避免 Hydration mismatch，對伺服器渲染友好。

3. **方便無障礙設計（ARIA）**

   * 確保 label、input、輔助說明等對應唯一，符合 WCAG 標準。

4. **簡化表單管理**

   * 多個表單欄位或元件實例可以安全生成唯一 ID，程式碼更乾淨可維護。

5. **避免濫用**

   * 不用於列表 key 或頻繁更新的狀態，專注於生成元件實例唯一 ID。

---
