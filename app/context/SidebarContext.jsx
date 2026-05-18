'use client';
import { createContext, useContext, useState, useEffect } from 'react';
const SidebarContext = createContext(null);
export function SidebarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    // Restore desktop collapse preference
    useEffect(() => {
        try {
            const saved = localStorage.getItem('sidebar-collapsed');
            if (saved === 'true')
                setIsCollapsed(true);
        }
        catch { }
    }, []);
    // Lock body scroll on mobile drawer open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);
    function toggleMobile() {
        setIsOpen(v => !v);
    }
    function closeMobile() {
        setIsOpen(false);
    }
    function toggleDesktop() {
        setIsCollapsed(v => {
            const next = !v;
            try {
                localStorage.setItem('sidebar-collapsed', String(next));
            }
            catch { }
            return next;
        });
    }
    return (<SidebarContext.Provider value={{ isOpen, isCollapsed, toggleMobile, closeMobile, toggleDesktop }}>
      {children}
    </SidebarContext.Provider>);
}
export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx)
        throw new Error('useSidebar must be used inside <SidebarProvider>');
    return ctx;
}
