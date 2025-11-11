interface TodoItemProps {
  item: TodoItem;
  onEdit: (item: TodoItem) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ item, onEdit, onDelete }: TodoItemProps) {
  return (
    // <div style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}>
    <div className="px-2 py-2 flex items-center justify-between min-w-md gap-2 border border-gray-300 dark:border-gray-500 rounded hover:bg-sky-100 dark:hover:bg-sky-900 cursor-pointer">
      <div>
        <div className="text-lg font-bold">{item.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {item.time}
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <button onClick={() => onEdit(item)}>修改</button>
        <button onClick={() => onDelete(item.id)}>刪除</button>
      </div>
    </div>
  );
}
