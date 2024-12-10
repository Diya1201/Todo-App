import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { MdDashboard, MdSettings } from "react-icons/md";
import { FaListAlt, FaStar } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { Outlet } from "react-router-dom"; // Allows nested routing

export default function Main({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar>
        <SidebarItem icon={<MdDashboard size={20} />} text="Dashboard" to="/" active />
        <SidebarItem icon={<FaListAlt size={20} />} text="Status" to="/status" />
        <SidebarItem icon={<FaStar size={20} />} text="Important" to="/important" />
        <hr className="my-3" />
        <SidebarItem icon={<MdSettings size={20} />} text="Settings" to="/settings" />
        <SidebarItem icon={<IoMdHelpCircle size={20} />} text="Help" to="/help" />
      </Sidebar>
      
      {/* Routed Content */}
      <div className="flex-1 p-6">
        {children || <Outlet />} {/* Renders the current route's content */}
      </div>
    </div>
  );
}
