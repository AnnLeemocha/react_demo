# React ToDoList 完整教學手冊

## **前置準備**

### 安裝 Node.js 與 npm

1. 下載 Node.js（內含 npm）：[https://nodejs.org](https://nodejs.org)
2. 安裝完成後，確認版本：

```bash
node -v
npm -v
```

> 範例輸出：

```
v20.2.0
10.3.0
```

---

## **第一節：建立 React 專案**

### 目標

* 使用 Vite 建立 React 專案
* 熟悉專案結構

### 步驟 1：建立專案

```bash
npm create vite@latest my-todolist -- --template react
cd my-todolist
npm install
```

### 步驟 2：啟動開發伺服器

```bash
npm run dev
```

> 打開瀏覽器訪問 `http://localhost:5173/`，會看到 Vite 的 React 範例頁面

### 專案結構介紹

```
my-todolist/
├─ index.html
├─ package.json
├─ src/
│  ├─ main.jsx        # React 入口
│  └─ App.jsx         # 主元件
```

---

## **第二節：建立 ToDoList UI**

### 目標

* 建立基本 UI
* 用狀態管理輸入欄位和列表

### 步驟 1：App.jsx 初始化

```jsx
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <h1>React ToDoList</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="輸入待辦事項"
      />
      <button>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

### 步驟 2：理解 `useState`

* **useState** 是 React 核心 Hook，用於在函式元件中建立「狀態」
* **用途**：

  1. 儲存使用者輸入
  2. 儲存待辦列表
* **驗證**：

  * 在 `input` 中輸入文字，`newTodo` 的值會跟著更新
  * 尚未點擊 Add，列表不會改變

---

## **第三節：新增待辦項目**

### 目標

* 完成「新增待辦」功能
* 使用 Hook 更新狀態

### 步驟 1：新增 `handleAddTodo` 函式

```jsx
const handleAddTodo = () => {
  if (!newTodo.trim()) return;
  setTodos([...todos, newTodo]);
  setNewTodo(""); // 清空輸入框
};
```

### 步驟 2：綁定按鈕事件

```jsx
<button onClick={handleAddTodo}>Add</button>
```

### 步驟 3：驗證

* 輸入文字 → 點擊 Add → 列表更新
* `useState` 讓 React 自動重新渲染

---

## **第四節：刪除待辦項目**

### 目標

* 讓使用者能刪除待辦

### 步驟 1：新增刪除函式

```jsx
const handleRemoveTodo = (indexToRemove) => {
  setTodos(todos.filter((_, index) => index !== indexToRemove));
};
```

### 步驟 2：綁定到列表

```jsx
<ul>
  {todos.map((todo, index) => (
    <li key={index}>
      {todo} <button onClick={() => handleRemoveTodo(index)}>Delete</button>
    </li>
  ))}
</ul>
```

### 步驟 3：驗證

* 點擊 Delete → 該待辦消失
* `filter` 與 `setTodos` 搭配，React 重新渲染列表

---

## **第五節：標記完成與未完成**

### 目標

* 讓待辦可以「切換完成狀態」
* 使用物件存放 todo 與 done 屬性

### 步驟 1：更新資料結構

```jsx
setTodos([...todos, { text: newTodo, done: false }]);
```

### 步驟 2：新增切換完成函式

```jsx
const toggleTodo = (indexToToggle) => {
  setTodos(
    todos.map((todo, index) =>
      index === indexToToggle ? { ...todo, done: !todo.done } : todo
    )
  );
};
```

### 步驟 3：更新列表渲染

```jsx
<ul>
  {todos.map((todo, index) => (
    <li key={index}>
      <span
        onClick={() => toggleTodo(index)}
        style={{ textDecoration: todo.done ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button onClick={() => handleRemoveTodo(index)}>Delete</button>
    </li>
  ))}
</ul>
```

### 步驟 4：驗證

* 點擊文字 → 標記完成或取消
* `done` 狀態透過 `useState` 更新

---

這樣我們就完成了**核心功能**：新增、刪除、切換完成狀態。

接下來的章節可以依序：

1. **使用 useEffect 保存 localStorage**
2. **加入 useRef 聚焦輸入框**
3. **建立 ThemeContext 與 useContext**
4. **使用 useMemo / useCallback 優化**
5. **示範 useId / useTransition**
6. **自訂 Hook 封裝 todos 操作**
7. **美化 UI 與響應式設計**

---

## **第六節：使用 useEffect 保存 localStorage**

### 目標

* 當待辦列表更新時，自動保存到 localStorage
* 頁面重新整理時，仍保留待辦資料

### 步驟 1：載入 useEffect

```jsx
import { useState, useEffect } from "react";
```

### 步驟 2：初始化 todos 從 localStorage

```jsx
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
});
```

> 這裡使用 **lazy initialization**，只有在元件第一次渲染時才讀取 localStorage

### 步驟 3：使用 useEffect 保存

```jsx
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### 步驟 4：驗證

* 新增、刪除、切換完成狀態後刷新頁面，資料仍保留
* **useEffect** 用於副作用：當 todos 更新時同步 localStorage

---

## **第七節：使用 useRef 聚焦輸入框**

### 目標

* 自動聚焦在輸入欄位，提高使用者體驗

### 步驟 1：載入 useRef

```jsx
import { useState, useEffect, useRef } from "react";
```

### 步驟 2：建立 ref

```jsx
const inputRef = useRef(null);
```

### 步驟 3：新增自動聚焦

```jsx
useEffect(() => {
  inputRef.current.focus();
}, []);
```

> 這裡的空依賴陣列 `[]` 代表只在第一次渲染時執行

### 步驟 4：綁定到 input

```jsx
<input
  ref={inputRef}
  type="text"
  value={newTodo}
  onChange={(e) => setNewTodo(e.target.value)}
  placeholder="輸入待辦事項"
/>
```

### 步驟 5：驗證

* 網頁載入後，輸入框自動聚焦
* 點擊 Add 後，輸入框仍可持續輸入

---

這兩個章節完成後，ToDoList 就具備：

1. 永久保存資料
2. 改善輸入體驗

---

## **第八節：建立 ThemeContext 與 useContext**

### 目標

* 使用 React Context 在元件間共用主題（淺色 / 深色）
* 避免層層傳遞 props

### 步驟 1：建立 ThemeContext

```jsx
import { createContext, useState, useContext } from "react";

// 建立 context
const ThemeContext = createContext();

// 提供 provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自訂 hook 方便使用
export const useTheme = () => useContext(ThemeContext);
```

### 步驟 2：在 App 包裝 Provider

```jsx
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <TodoList />
    </ThemeProvider>
  );
}
```

### 步驟 3：在 TodoList 中使用

```jsx
import { useTheme } from "./ThemeContext";

const { theme, toggleTheme } = useTheme();

return (
  <div className={theme}>
    <button onClick={toggleTheme}>
      切換主題（目前：{theme}）
    </button>
    {/* 其他元件 */}
  </div>
);
```

### 步驟 4：驗證

* 點擊切換按鈕，`theme` 狀態改變
* 可根據 `theme` 改變樣式（例如背景顏色、文字顏色）

> **useContext** 用於讀取 Context，避免 props drilling

---

## **第九節：使用 useMemo / useCallback 優化**

### 目標

* 避免每次渲染都重新計算或重新建立函式
* 提升效能，尤其是大型列表或頻繁渲染的元件

### 步驟 1：useMemo 範例（計算未完成待辦數量）

```jsx
import { useMemo } from "react";

const incompleteCount = useMemo(() => {
  return todos.filter((todo) => !todo.completed).length;
}, [todos]);
```

> 只有當 `todos` 變化時才會重新計算

### 步驟 2：useCallback 範例（刪除函式）

```jsx
import { useCallback } from "react";

const handleDelete = useCallback(
  (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  },
  [] // 無依賴，函式只建立一次
);
```

> 對子元件傳遞函式時，避免每次渲染都重新建立

### 步驟 3：傳給子元件

```jsx
<TodoItem
  key={todo.id}
  todo={todo}
  onDelete={handleDelete}
/>
```

### 步驟 4：驗證

* 使用 React DevTools 查看是否重新渲染
* 刪除、切換完成狀態功能正常

---

這兩個章節完成後，ToDoList 已經包含：

1. **主題切換**（useContext + Context Provider）
2. **效能優化**（useMemo / useCallback）

---

## 第十二節：使用 `useId` 產生唯一 ID

### 目標

為表單元素或列表元素產生 **唯一 ID**，避免重複或手動管理。

### 步驟

1. **在 TodoList 中引入 `useId`**

```js
import { useState, useEffect, useRef, useId } from "react";
```

2. **產生唯一 ID**

```js
function TodoList() {
  const inputRef = useRef(null);
  const inputId = useId(); // 產生唯一 id
  ...
  return (
    <>
      <label htmlFor={inputId}>新增待辦事項：</label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="輸入待辦事項"
      />
      <button onClick={handleAddTodo}>Add</button>
    </>
  );
}
```

> 🔑 **重點**
>
> * `useId()` 適合用在表單、列表或其他需要唯一標識的元素
> * 自動生成可跨 SSR 與客戶端一致的 ID

3. **驗證**

   * 打開瀏覽器，檢查 input 的 `id` 是否唯一
   * label 點擊時，input 能正確聚焦

---

## 第十三節：使用 `useTransition` 優化大量資料渲染

### 目標

當資料量很大時，防止 UI 卡住，保持 **響應式操作**。

### 步驟

1. **引入 `useTransition`**

```js
import { useState, useEffect, useRef, useId, useTransition } from "react";
```

2. **使用範例：新增大量待辦時使用 Transition**

```js
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  
  const [isPending, startTransition] = useTransition();

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    
    // 使用 startTransition 延遲更新，保持 UI 流暢
    startTransition(() => {
      setTodos(prev => [...prev, { text: newTodo, done: false }]);
    });
    
    setNewTodo("");
  };

  return (
    <>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="輸入待辦事項"
      />
      <button onClick={handleAddTodo}>Add</button>
      {isPending && <p>Loading...</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```

> 🔑 **重點**
>
> * `useTransition` 可讓非緊急更新延遲渲染，避免 UI 阻塞
> * `isPending` 可用於顯示 loading 狀態
> * 適合大量資料或複雜運算

3. **驗證**

   * 嘗試一次加入大量待辦，例如 1000 筆
   * UI 保持流暢，且新增動作不會卡死

---

✅ 至此，ToDoList 範例已完整涵蓋：

* **6 大核心 Hook**
* `useRef`、`useId`、`useContext`、`useTransition`
* 自訂 Hook
* 本地儲存（localStorage）
* 主題切換
* 響應式表單與列表

---