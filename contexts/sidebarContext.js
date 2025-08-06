"use client";
import { createContext, useContext, useState } from "react";

// Create context
const SidebarContext = createContext();

// Export hook
export default function useSidebarMenu() {
  return useContext(SidebarContext);
}

// Provider
export function SidebarProvider({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  // open conversation handler
  const handleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ openSidebar, handleOpenSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
