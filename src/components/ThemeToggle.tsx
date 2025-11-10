import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>變更主題 ({theme})</button>
    )
}
