import { useTheme } from "../context/ThemeContext";


export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            切換主題（目前：{theme}）
        </button>
    )
}