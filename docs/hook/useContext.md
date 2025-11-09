# useContext：跨元件共享狀態

> 讓函式元件能「輕鬆存取全域或父元件提供的資料」，避免繁瑣的 props 層層傳遞。

---

## 用途說明

在 React 中，狀態通常透過 props 往下傳遞（prop drilling）。
當元件層級很深，或多個元件都需要相同資料時，props 傳遞會變得繁瑣且難以維護。

`useContext` 提供了一種方式：

* 建立 **Context**，將資料放在上層元件。
* 子元件可以直接使用 `useContext` 讀取資料，無需逐層傳遞 props。

常見用途：

* 主題切換（Theme）
* 語言或國際化（i18n）
* 使用者認證資訊（Auth）
* 設定值或全域狀態共享

---

## 語法說明

### 建立 Context

```jsx
import { createContext } from "react";

const MyContext = createContext(defaultValue);
```

* **`defaultValue`**：當元件未被 Provider 包裹時使用的預設值。

### Provider 提供資料

```jsx
<MyContext.Provider value={value}>
  {/* 子元件 */}
</MyContext.Provider>
```

* **`value`**：要提供給子元件的資料，可為任何型別（物件、陣列、字串、函式等）。

### 子元件使用 Context

```jsx
import { useContext } from "react";

const value = useContext(MyContext);
```

* `useContext` 會返回 Provider 的 `value`。
* 當 `value` 改變時，使用該 context 的元件會重新渲染。

---

## 使用範例

### 範例一：主題切換

```jsx
import { createContext, useContext, useState } from "react";

// 建立 Context
const ThemeContext = createContext("light");

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>
      切換主題（目前：{theme}）
    </button>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff", minHeight: "100vh", padding: "1rem" }}>
        <h1>useContext 範例</h1>
        <ThemeSwitcher />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```

說明：

* `ThemeContext.Provider` 提供主題狀態與切換函式給子元件。
* 子元件透過 `useContext` 直接使用資料，無需透過 props 層層傳遞。

---

### 範例二：使用者認證資訊

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ user: null });

function UserProfile() {
  const { user } = useContext(AuthContext);
  return <p>登入使用者：{user ? user.name : "未登入"}</p>;
}

function App() {
  const [user, setUser] = useState({ name: "Alice" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <h1>useContext 認證範例</h1>
      <UserProfile />
    </AuthContext.Provider>
  );
}

export default App;
```

說明：

* 全域提供使用者資訊，子元件可以直接讀取。
* 避免 prop drilling，程式碼更簡潔。

---

## 使用時機

1. **跨多層元件共享資料**

   * 避免繁瑣的 props 傳遞。

2. **全域設定**

   * 主題、語言、驗證狀態、使用者偏好設定。

3. **提供函式或狀態給多個子元件**

   * 例如登入登出函式、切換主題函式。

4. **與 useState / useReducer 搭配**

   * 在 Provider 內管理狀態，子元件使用 `useContext` 讀取與操作。

好的，我幫你補充 **useContext 的使用時機**，特別加入 **避免濫用的注意事項**，讓筆記更完整：

---

### 避免濫用的注意事項

* **避免將所有狀態都放在 Context**

  * Context 適合共享全域或跨多層的資料，不適合放頻繁變動或單一元件專用的狀態。
  * 過多頻繁變動的 Context 會導致使用該 Context 的所有元件重新渲染，影響效能。

* **避免頻繁更新的資料**

  * 例如輸入框文字或動畫狀態，這類狀態變化頻繁，放在 Context 可能造成性能問題，建議使用 `useState` 或 `useRef` 管理局部狀態。

* **保持 Context 單一責任**

  * 每個 Context 儘量只管理一類型資料（例如 ThemeContext、AuthContext、LanguageContext），避免把大量不同資料集中在同一個 Context 中，降低維護難度。

* **慎用於大型應用的高頻渲染元件**

  * 若某個 Context 更新會觸發大量子元件重新渲染，考慮拆分 Context 或使用 `useMemo` / `React.memo` 優化效能。

* **不要把 Context 當作全域狀態管理替代品**

  * 對於大型複雜應用，可考慮 Redux、Zustand 等狀態管理方案，Context 適合小型或中型共享狀態。

---

## 實作題目

**題目：語言切換器**

**需求：**

1. 建立一個 LanguageContext，提供語言狀態（`"zh"` 或 `"en"`）。
2. 提供切換函式給子元件。
3. 子元件可以讀取語言並顯示對應文字。

**範例答案：**

```jsx
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext("zh");

function LanguageSwitcher() {
  const { lang, toggleLang } = useContext(LanguageContext);
  return (
    <button onClick={toggleLang}>
      切換語言（目前：{lang === "zh" ? "中文" : "English"}）
    </button>
  );
}

function Greeting() {
  const { lang } = useContext(LanguageContext);
  return <p>{lang === "zh" ? "你好！" : "Hello!"}</p>;
}

function App() {
  const [lang, setLang] = useState("zh");
  const toggleLang = () => setLang(prev => (prev === "zh" ? "en" : "zh"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      <Greeting />
      <LanguageSwitcher />
    </LanguageContext.Provider>
  );
}

export default App;
```

說明：

* `LanguageContext.Provider` 提供語言狀態與切換函式。
* 子元件直接透過 `useContext` 使用資料。
* 省去多層 props 傳遞。

---

## 為什麼重要

1. **簡化跨層資料共享**

   * 避免 prop drilling，提升程式可維護性。

2. **與狀態管理結合**

   * 可搭配 `useState` 或 `useReducer` 建立簡單全域狀態管理。

3. **增強元件可重用性**

   * 子元件不依賴 props 層層傳遞，而是直接讀取 Context。

4. **配合 React 18 並發渲染**

   * Context 更新會觸發使用該 Context 的元件重新渲染，React 18 可保證渲染一致性。

5. **提高程式結構清晰度**

   * 將全域或共享資料集中管理，程式邏輯更清楚。

---