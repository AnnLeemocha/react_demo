import Content from "./components/layout";
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

export default App;
