// 全域型別定義，免 import
// 需在 tsconfig.json 的 include 範圍內

interface TodoItem {
  title: string;
  time: string;
  id: string;
  completed: boolean;
}
