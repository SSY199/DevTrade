import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true);

  // Load initial state
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-open");
    if (saved !== null) setOpen(saved === "true");
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem("sidebar-open", open);
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
