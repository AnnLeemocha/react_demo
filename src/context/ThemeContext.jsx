import { createContext, useState, useContext } from "react";

// 建立 context
const ThemeContext = createContext();

// 提供 provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 自訂 hook 方便使用
export const useTheme = () => useContext(ThemeContext);
