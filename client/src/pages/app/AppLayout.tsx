import { JSX, useState } from "react";
import Sidebar from "../../components/navigation/app/Sidebar";
import Drawer from "../../components/navigation/app/Drawer";
import { Outlet } from "react-router";
import { ChatPage } from "./ChatPage.tsx";

export default function AppLayout(): JSX.Element {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isAdminPanelUserisOpen, setIsAdminPanelUserisOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const toggleAdminPanelUser = () => {
        setIsAdminPanelUserisOpen(!isAdminPanelUserisOpen);
    }

    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar toggleDrawer={toggleDrawer} toggleAdminPanelUser={toggleAdminPanelUser} />
                <Drawer isOpen={isDrawerOpen} isAdminPanelUserisOpen={isAdminPanelUserisOpen} />
                <main className="flex-1 w-full">
                    <Outlet />
                    <ChatPage />
                </main>
            </div>
        </>
    )
}