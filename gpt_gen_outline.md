# React ToDoList 教學大綱

## **1. 課程目標**

* 了解 React 核心概念與 Hook 使用方式
* 實作一個簡單的 ToDoList 專案
* 學會自訂 Hook、Context、以及 React 18 新 Hook（useId、useTransition）
* 熟悉前端狀態管理、效能優化與響應式 UI

---

## **2. 開發環境準備**

* Node.js & npm 安裝確認
* 使用 Vite 建立 React 專案

  ```bash
  npm create vite@latest my-todolist -- --template react
  cd my-todolist
  npm install
  npm run dev
  ```
* 專案結構介紹：

  ```
  my-todolist/
  ├─ index.html
  ├─ package.json
  ├─ src/
  │  ├─ main.jsx
  │  └─ App.jsx
  ```

---

## **3. React 基礎回顧**

* JSX 語法
* 元件概念（函式元件 vs class 元件）
* props 與 state 差異

---

## **4. 核心 Hook 教學**

### 4.1 useState

* 管理 todos、輸入文字、主題色
* 範例：

  ```jsx
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  ```

### 4.2 useEffect

* 讀取和寫入 localStorage
* 範例：

  ```jsx
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(saved);
  }, []);
  ```

### 4.3 useRef

* 聚焦輸入框
* 範例：

  ```jsx
  const inputRef = useRef(null);
  inputRef.current.focus();
  ```

### 4.4 useContext

* 建立 ThemeContext，跨元件傳遞主題色
* 範例：

  ```jsx
  const theme = useContext(ThemeContext);
  ```

### 4.5 useMemo

* 計算未完成 todos 數量，避免每次渲染重新計算
* 範例：

  ```jsx
  const incompleteCount = useMemo(() => todos.filter(t => !t.done).length, [todos]);
  ```

### 4.6 useCallback

* 記憶 addTodo / toggleTodo / removeTodo 函式，避免子元件重渲染
* 範例：

  ```jsx
  const addTodo = useCallback((text) => {...}, []);
  ```

---

## **5. React 18 新 Hook**

### 5.1 useId

* 為 label 與 input 生成唯一 ID
* 範例：

  ```jsx
  const id = useId();
  ```

### 5.2 useTransition

* 非同步操作，避免 UI 卡頓
* 範例：

  ```jsx
  const [isPending, startTransition] = useTransition();
  startTransition(() => addTodo(newTodo));
  ```

---

## **6. 自訂 Hook**

* 封裝 todos 的狀態與操作，提升程式可讀性
* 範例：

  ```jsx
  function useTodos() { ... }
  ```

---

## **7. UI 與事件處理**

* 新增、刪除、切換完成狀態
* 使用 flex 排版、響應式設計
* 綁定輸入框事件（Enter 鍵新增）

---

## **8. 專案整合**

* App.jsx 整合 ThemeContext、TodoList 元件
* 切換主題色範例（light/dark）

---

## **9. 小結與進階建議**

* 核心 Hook 使用總結
* useMemo / useCallback 的實際效益
* useTransition 在大型列表或慢速操作的優化
* 自訂 Hook 封裝模式

---

## **10. 延伸練習**

* 加入過濾功能（全部/已完成/未完成）
* 加入編輯功能
* 優化 localStorage 的存取
* 使用 CSS 模組或 Tailwind CSS 美化 UI
