import ThemeToggleButton from "./ThemeToggleButton";
import { NavLink } from "react-router-dom";

interface IHeader {
  hideThemeToggle?: boolean;
}

const Header: React.FC<IHeader> = ({ hideThemeToggle = false }) => {
  return (
    <header className="p-4 shadow-md flex items-center blue:bg-blue-800 blue:text-blueTheme-text pink:bg-pink-200 pink:text-pinkTheme-text">
      <h1 className="text-sm lg:text-2xl font-bold flex-1 justify-center">
        🍩 Chomp-A-Donut
      </h1>

      <nav className="text-xs lg:text-lg p-4 flex space-x-6 justify-center blue:text-blueTheme-text pink:text-pinkTheme-text">
        {[
          { href: "/", title: "Home" },
          { href: "/list", title: "Donut List" },
          { href: "/company/info", title: "Company Info" },
        ].map((link) => (
          <NavLink
            key={link.title}
            to={link.href}
            end={link.href === "/"}
            className={({ isActive }) =>
              isActive
                ? "blue:border-text-blueTheme-text pink: border-text-pinkTheme-text border-b-2 font-semibold"
                : "hover:border-b-2"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-1 justify-end">
        {!hideThemeToggle ? (
          <ThemeToggleButton />
        ) : (
          <div className="w-full" aria-hidden="true"></div>
        )}
      </div>
    </header>
  );
};

export default Header;
