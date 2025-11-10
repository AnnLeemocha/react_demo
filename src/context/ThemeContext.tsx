import { createContext, useContext, useEffect, useState } from 'react';


type Theme = 'light' | 'dark';
// type Theme = 'light' | 'dark' | 'blue' | 'green';
export const themes: Theme[] = ['light', 'dark'];
// const themes: Theme[] = ['light', 'dark', 'blue', 'green'];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // 可選，切換到下一個模式
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  // 初始化主題
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
      applyThemeClass(storedTheme);
    } else {
      // 系統偏好只有 light/dark
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme: Theme = prefersDark ? 'dark' : 'light';
      setThemeState(initialTheme);
      applyThemeClass(initialTheme);
    }
  }, []);

  // 實際修改 <html> class
  const applyThemeClass = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark'); // 先清除舊 class
    // root.classList.remove('light', 'dark', 'blue', 'green'); // 先清除舊 class
    root.classList.add(theme);
  };

  // 切換到指定模式
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyThemeClass(newTheme);
  };

  // 可選：循環切換模式
  const toggleTheme = () => {
    // const themes: Theme[] = ['light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme 必須在 ThemeProvider 內使用');
  return context;
};
