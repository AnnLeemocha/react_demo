import { ThemeProvider, useTheme } from "./context/ThemeContext";
import TodoList from "./pages/TodoList";
// import "./App.css"

function App() {
  // const { theme } = useTheme();
  return (
    <ThemeProvider>
      {/* <div className={theme}> */}
      <TodoList />
      {/* </div> */}
    </ThemeProvider>
  );
}

export default App;
