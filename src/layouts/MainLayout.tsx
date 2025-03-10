import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navebar";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full">
          <Sidebar />
        </div>
        <main className="flex-1 p-6 overflow-auto bg-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
