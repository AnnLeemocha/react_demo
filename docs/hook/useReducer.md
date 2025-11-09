# useReducer：管理複雜狀態與邏輯

> 讓函式元件能使用「Reducer 模式」管理複雜或多步驟狀態更新，類似 Redux 的設計思路。

---

## 用途說明

在 React 中，`useState` 適合管理簡單或單一狀態，但當狀態變得複雜：

* 涉及多個相互依賴的屬性
* 更新邏輯需要根據不同操作類型決定
* 狀態更新包含多個步驟或條件

這時使用 `useReducer` 可以讓狀態管理更清晰、更可預測。

特點：

* 將狀態更新邏輯集中在 **reducer 函式**
* 支援多種操作類型（action types）
* 狀態更新為純函式（pure function），便於測試與維護

---

## 語法說明

```jsx
const [state, dispatch] = useReducer(reducer, initialState, init?);
```

### 語法解析：

* **`reducer(state, action)`**

  * 接收當前狀態與 action，返回新狀態。
  * `action` 通常是物件 `{ type: "ACTION_TYPE", payload: ... }`。

* **`initialState`**

  * 狀態初始值。

* **`init`（可選）**

  * 延遲初始化函式，只在第一次渲染時呼叫。

* **回傳值**

  * `state`：目前狀態
  * `dispatch`：派發 action 的函式，用於觸發狀態更新

---

## 使用範例

### 範例一：計數器

```jsx
import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>重置</button>
    </div>
  );
}

export default Counter;
```

說明：

* 將計數邏輯集中在 reducer 函式中。
* dispatch 的 action type 决定狀態更新行為。

---

### 範例二：表單管理

```jsx
import { useReducer } from "react";

const initialState = { username: "", email: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input
        value={state.username}
        onChange={e => dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })}
        placeholder="Username"
      />
      <input
        value={state.email}
        onChange={e => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
        placeholder="Email"
      />
      <button onClick={() => dispatch({ type: "RESET" })}>重置</button>
      <p>Username: {state.username}</p>
      <p>Email: {state.email}</p>
    </div>
  );
}

export default Form;
```

說明：

* 適合管理多個相關欄位或複雜表單狀態。
* reducer 集中管理更新邏輯，程式可讀性高。

---

## 使用時機

1. **複雜或多屬性狀態**

   * 多個互相關聯的狀態變化，例如表單、計算器或遊戲狀態。

2. **依據動作類型更新狀態**

   * 狀態更新邏輯依賴 action type 決定，避免多個 setState 混亂。

3. **可測試與可維護**

   * 將更新邏輯集中在 reducer 函式，便於單元測試。

4. **與 useContext 搭配**

   * 將 reducer 與 context 結合，建立簡易全域狀態管理。

---

### 避免濫用的注意事項

* **不要把簡單狀態也用 useReducer**

  * 單一數值或簡單布林值，使用 useState 更簡單易讀。

* **避免過度拆分 action**

  * 過多 action type 可能讓 reducer 過於複雜，維護困難。

* **避免不必要的深層副作用**

  * reducer 應保持純函式，避免在 reducer 中直接操作 DOM 或 API。
  * 副作用應該放在 useEffect 中處理。

* **不要用 useReducer 替代全域狀態管理工具**

  * 對於大型應用，多個 reducer 與 Context 結合管理全域狀態時，要注意性能與結構清晰度。

---

## 實作題目

**題目：Todo List with useReducer**

**需求：**

1. Todo 包含 `id`、`text`、`done`。
2. 可以新增、切換完成狀態、刪除 todo。
3. 使用 `useReducer` 管理整個 todo 狀態。

**範例答案：**

```jsx
import { useReducer } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TODO", text });
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="新增 todo" />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span onClick={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: "REMOVE_TODO", id: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

---

## 為什麼重要

1. **管理複雜狀態**

   * 適合多屬性、多條件更新的狀態管理，比 useState 更清晰。

2. **集中狀態更新邏輯**

   * reducer 函式將所有狀態更新行為集中，程式可讀性高、易測試。

3. **搭配 Context 建立簡易全域狀態**

   * 可以模擬簡單 Redux，支援大型應用狀態管理。

4. **保持純函式**

   * reducer 不含副作用，狀態更新可預測，符合 React 原則。

5. **可擴展性高**

   * 適合多人協作、程式規模逐漸變大時使用。

---
