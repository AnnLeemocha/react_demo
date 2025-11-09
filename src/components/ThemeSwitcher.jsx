import { useTheme } from "../context/ThemeContext";

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="theme-btn">
            {/* 切換主題 */}
            {theme}
        </button>
    )
}