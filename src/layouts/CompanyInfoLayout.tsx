import Header from "@components/Header";
import { Outlet } from "react-router-dom";

const CompanyInfoLayout = () => {
  return (
    <div className="min-h-screen bg-blueTheme text-white">
      <Header hideThemeToggle />

      <main className="max-w-4xl mx-auto mt-8 flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export { CompanyInfoLayout };
