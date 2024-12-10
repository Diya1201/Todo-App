import React, { createContext, useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size and set isMobile accordingly
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 768px is the breakpoint for mobile
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial state
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // If it's a mobile view, collapse the sidebar by default
        if (isMobile) {
            setExpanded(false);
        }
    }, [isMobile]);

    return (
        <aside className="h-screen">
            <nav className="h-full w-fit flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="/5234602.png"
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                        alt=""
                    />
                    <p className={`${!expanded && "invisible"}`}>Taskify</p>
                    <button
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        {expanded ? <LuChevronFirst /> : <LuChevronLast />}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
                <div className="border-t flex p-3">
                    <img
                        src="/initials-2-avatar-bpfull.png"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">Diya Sanghvi</h4>
                            <span className="text-xs text-gray-600">diyasanghvi1201@gmail.com</span>
                        </div>
                        <CiMenuKebab size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, to, alert }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                        isActive
                            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                            : "hover:bg-indigo-50 text-gray-600"
                    }`
                }
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
                    />
                )}
                {!expanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
                )}
            </NavLink>
        </li>
    );
}
