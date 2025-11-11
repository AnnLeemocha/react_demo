import { ThemeToggle } from "../components/theme/ThemeToggle";
import { TodoList } from "../modules/todolist/TodoList";

export default function Page() {
  return (
    <div>
      <h1 className="mb-4">📝 備忘錄</h1>
      <ThemeToggle />
      <TodoList />
    </div>
  );
}
