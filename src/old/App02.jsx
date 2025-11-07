// App.jsx
import React, { useState, useEffect, useRef, useContext, useMemo, useCallback, useId, useTransition, createContext } from "react";
import './App.css'

// ===== Context: 主題色範例 =====
const ThemeContext = createContext("light");

// ===== 自訂 Hook =====
function useTodos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { todos, addTodo, toggleTodo, removeTodo };
}

// ===== TodoList Component =====
function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef(null); // 聚焦輸入框
  const id = useId(); // 唯一 id
  const theme = useContext(ThemeContext); // 主題色
  const [isPending, startTransition] = useTransition(); // 避免 UI 卡頓

  const incompleteCount = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    startTransition(() => {
      addTodo(newTodo.trim());
    });
    setNewTodo("");
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto", background: theme === "dark" ? "#333" : "#eee", color: theme === "dark" ? "#fff" : "#000", borderRadius: "8px" }}>
      <h2>My ToDoList</h2>
      <div>
        <label htmlFor={id}>New Todo: </label>
        <input
          id={id}
          ref={inputRef}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd} disabled={isPending}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0.5rem 0" }}>
            <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <div>
              <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p>未完成: {incompleteCount}</p>
    </div>
  );
}

// ===== App Component =====
export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} style={{ margin: "1rem" }}>
        切換主題
      </button>
      <TodoList />
    </ThemeContext.Provider>
  );
}
