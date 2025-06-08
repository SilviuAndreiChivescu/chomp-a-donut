import { useTheme } from "@context/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer px-4 py-2 rounded border text-xs lg:text-lg blue:border-text-blueTheme-text pink:border-text-pinkTheme-text"
      aria-label="Toggle theme"
    >
      Switch to {theme === "blue" ? "Pink" : "Blue"}
    </button>
  );
};

export default ThemeToggleButton;
