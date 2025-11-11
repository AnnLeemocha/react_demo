// import React from 'react';
// import { useState } from 'react';
import { ThemeToggle } from "../components/theme/ThemeToggle";

interface Item {
    title: string;
    time: string;
    id?: string;
    completed?: boolean;
}

const sampleList: Item[] = [
    { id: "1", title: '買牛奶', time: '2025-10-01T10:00', completed: false },
    { id: "2", title: '完成報告', time: '2025-10-03T14:00', completed: false },
    { id: "3", title: '寄信給老師', time: '2025-09-30T09:00', completed: false },
    { id: "4", title: '打掃房間', time: '2025-10-02T16:00', completed: false },
    { id: "5", title: '運動 30 分鐘', time: '2025-09-29T18:00', completed: false },
];

function TodoItem() {
    const item = sampleList[0];
    return (
        // <div style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}>
        <div className="px-2 py-2 flex items-center justify-between min-w-md gap-2 border border-gray-300 dark:border-gray-500 rounded hover:bg-sky-100 dark:hover:bg-sky-900 cursor-pointer">
            <div>
                <div className="text-lg font-bold">{item.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{item.time}</div>
            </div>
            <div className="flex items-center justify-center gap-1.5">
                <button>修改</button>
                <button>刪除</button>
            </div>
        </div>
    );
}

function getTodos(): Item[] {
    let str = localStorage.getItem("todos");
    if (!str) {
        return sampleList
    }
    return JSON.parse(str) || []
}

function saveTodos(list: Item[]) {
    localStorage.setItem("todos", JSON.stringify(list));
}

function TodoList() {
    // const [todos, setTodos] = useState(getTodos());
    const todos = getTodos();

    return (
        <>
            <input type="text" placeholder="搜尋..." className="block w-full my-4" />
            <div className="mb-2.5 flex justify-between">
                <button>排序: 時間升序</button>
                <button>新增</button>
            </div>
            <div className="text-start">
                <p className="mb-1">待辦清單：({todos.filter((t) => !t.completed).length}/{todos.length})</p>
                {todos.map(todo => (
                    <TodoItem key={todo.id} />
                ))}
            </div>
            <TodoModal />
        </>
    );
}

function TodoModal() {
    let editItem: Item = {
        title: "測試修改",
        time: "2025-11-11T15:22"
    } as Item;

    let formItem: Item = {
        title: editItem?.title || "",
        time: editItem?.time || "",
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                        {editItem ? "修改待辦項目" : "新增待辦項目"}
                    </h2>
                    <button type="button" className="bg-transparent border-none text-2xl p-0">&times;</button>
                </div>
                <form className="text-start">
                    <label htmlFor="title" className="block text-md font-bold">標題</label>
                    <input id="title" type="text" placeholder="標題" className="w-full mt-1 mb-2" value={formItem.title} required />
                    <label htmlFor="time" className="block text-md font-bold">日期</label>
                    <input id="time" type="datetime-local" className="w-full mt-1 mb-2" value={formItem.time} required />
                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button">取消</button>
                        <button type="submit">確定</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        // <div style={{ maxWidth: 600, margin: 'auto', padding: 16, fontFamily: 'Arial, sans-serif' }}>
        <div >
            <h1 className="mb-4">📝 備忘錄 (靜態)</h1>
            <ThemeToggle />
            <TodoList />
        </div>
    );
}