import { useState, useEffect, useRef, useMemo, useCallback, useId, useTransition } from "react";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import '../App.css'

function TodoList() {
  const inputRef = useRef(null);
  const inputId = useId();

  const [isPending, startTransition] = useTransition();

  // 只有在元件第一次渲染時才讀取 localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  // const handleAddTodo = () => {
  //   if (!newTodo.trim()) return;
  //   setTodos([...todos, { text: newTodo, done: false }]);
  //   setNewTodo(""); // 清空輸入框
  // };

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    // 使用 startTransition 延遲更新，保持 UI 流暢
    startTransition(() => {
      setTodos(prev => [...prev, { text: newTodo, done: false }]);
    });

    setNewTodo("");
  };

  // const handleRemoveTodo = (indexToRemove) => {
  //   setTodos(todos.filter((_, index) => index !== indexToRemove));
  // };

  const handleRemoveTodo = useCallback(
    (indexToRemove) => {
      setTodos((prev) => prev.filter((_, index) => index !== indexToRemove));
    },
    [] // 無依賴，函式只建立一次
  );

  const toggleTodo = (indexToToggle) => {
    setTodos(
      todos.map((todo, index) =>
        index === indexToToggle ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 用於副作用：當 todos 更新時同步 localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const incompleteCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return (
    <>
      <ThemeSwitcher />
      <h1>React ToDoList</h1>
      <div>{incompleteCount}</div>

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
      {/* <div>{newTodo}</div> */}
      {isPending && <p>Loading...</p>}
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
            {/* <button onClick={() => handleRemoveTodo(index)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
