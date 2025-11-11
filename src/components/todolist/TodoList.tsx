import { useState, useEffect } from "react";
import type { Item, newItem } from "./types";
import { TodoItem } from "./TodoItem";
import { TodoModal } from "./TodoModal";

const sampleList: Item[] = [
    { id: "1", title: "買牛奶", time: "2025-10-01T10:00", completed: false },
    { id: "2", title: "完成報告", time: "2025-10-03T14:00", completed: false },
    { id: "3", title: "寄信給老師", time: "2025-09-30T09:00", completed: false },
    { id: "4", title: "打掃房間", time: "2025-10-02T16:00", completed: false },
    { id: "5", title: "運動 30 分鐘", time: "2025-09-29T18:00", completed: false },
];

// ---------- localStorage 工具 ----------
function getTodos(): Item[] {
    const str = localStorage.getItem("todos");
    if (!str) return sampleList;
    try {
        return JSON.parse(str) as Item[];
    } catch {
        return sampleList;
    }
}

function saveTodos(list: Item[]) {
    localStorage.setItem("todos", JSON.stringify(list));
}

// ---------- 主組件 ----------
export function TodoList() {
    const [todos, setTodos] = useState<Item[]>(getTodos);
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<Item | null>(null);

    // todos 一變更就儲存至 localStorage
    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    // search + sort
    const filteredTodos = todos
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) =>
            sortAsc
                ? a.time.localeCompare(b.time)
                : b.time.localeCompare(a.time)
        );

    function handleAddOrEdit(data: newItem, editId?: string) {
        if (editId) {
            // 修改
            setTodos((prev) =>
                prev.map((t) => (t.id === editId ? { ...t, ...data } : t))
            );
        } else {
            // 新增
            const newItem: Item = {
                id: Date.now().toString(),
                title: data.title,
                time: data.time,
                completed: false,
            };
            setTodos((prev) => [...prev, newItem]);
        }
    }

    function handleDelete(id: string) {
        if (confirm("確定要刪除嗎？"))
            setTodos((prev) => prev.filter((t) => t.id !== id));
    }

    return (
        <>
            <input
                type="text"
                placeholder="搜尋..."
                className="block w-full my-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="mb-2.5 flex justify-between">
                <button onClick={() => setSortAsc((prev) => !prev)}>排序: {sortAsc ? "升序" : "降序"}</button>
                <button
                    onClick={() => {
                        setEditItem(null);
                        setIsModalOpen(true);
                    }}>
                    新增
                </button>
            </div>
            <div className="text-start">
                <p className="mb-1">待辦清單：({todos.filter((t) => !t.completed).length}/{todos.length})</p>
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        item={todo}
                        onEdit={(item) => {
                            setEditItem(item);
                            setIsModalOpen(true);
                        }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <TodoModal
                open={isModalOpen}
                // type={editItem ? "EDIT" : "ADD"}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleAddOrEdit}
                editItem={editItem}
            />
        </>
    );
}