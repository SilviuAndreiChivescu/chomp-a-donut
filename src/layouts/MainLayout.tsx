import Header from "@components/Header";
import { useTheme } from "@context/ThemeContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div
      data-theme={theme}
      className="min-h-screen blue:bg-blueTheme blue:text-white pink:bg-pinkTheme pink:text-black"
    >
      <Header />
      <main className="max-w-4xl mx-auto mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
