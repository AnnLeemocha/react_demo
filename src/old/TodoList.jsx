import React from 'react';

function ThemeSwitcher() {
  return (
    <button>切換模式</button>
  );
}

function TodoItem({ title, time }) {
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}>
      <strong>{title}</strong><br />
      <small>{time}</small>
      <div>
        <button>修改</button>
        <button>刪除</button>
      </div>
    </div>
  );
}

function TodoList() {
  const todos = [
    { id: 1, title: '買牛奶', time: '2025-10-01T10:00', completed: false },
    { id: 2, title: '完成報告', time: '2025-10-03T14:00', completed: false },
    { id: 3, title: '寄信給老師', time: '2025-09-30T09:00', completed: false },
    { id: 4, title: '打掃房間', time: '2025-10-02T16:00', completed: false },
    { id: 5, title: '運動 30 分鐘', time: '2025-09-29T18:00', completed: false },
  ];

  return (
    <div>
      <div>
        <input type="text" placeholder="搜尋..." />
        <button>排序: 時間升序</button>
        <button>新增</button>
      </div>
      <div>
        <p>待辦清單：(0/5)</p>
        {todos.map(todo => (
          <TodoItem key={todo.id} title={todo.title} time={todo.time} />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 16, fontFamily: 'Arial, sans-serif' }}>
      <h1>📝 備忘錄</h1>
      <ThemeSwitcher />
      <TodoList />
    </div>
  );
}
