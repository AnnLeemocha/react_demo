// VITE
export const IS_DIV = import.meta.env.MODE === "development" ? true : false;

export const DEFAULT_LIST: TodoItem[] = [
    { id: "1", title: "買牛奶", time: "2025-10-01T10:00", completed: false },
    { id: "2", title: "完成報告", time: "2025-10-03T14:00", completed: false },
    { id: "3", title: "寄信給老師", time: "2025-09-30T09:00", completed: false },
    { id: "4", title: "打掃房間", time: "2025-10-02T16:00", completed: false },
    {
        id: "5",
        title: "運動 30 分鐘",
        time: "2025-09-29T18:00",
        completed: false,
    },
];