import { createContext, useState, useContext, useEffect } from "react";

// 建立 context
const ThemeContext = createContext();

// 提供 provider
export const ThemeProvider = ({ children }) => {
  // 取得系統偏好作為預設
  const getDefaultTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getDefaultTheme);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 每次 theme 改變時，更新 <html> class
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自訂 hook 方便使用
export const useTheme = () => useContext(ThemeContext);
