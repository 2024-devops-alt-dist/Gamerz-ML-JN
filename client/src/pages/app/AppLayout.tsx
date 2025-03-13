import { JSX, useState } from "react";
import Sidebar from "../../components/navigation/app/Sidebar";
import Drawer from "../../components/navigation/app/Drawer";
import { Outlet } from "react-router";

export default function AppLayout(): JSX.Element {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar toggleDrawer={toggleDrawer} />
                <Drawer isOpen={isDrawerOpen} />
                <main className="flex-1 w-full">
                    <Outlet />
                </main>
            </div>
        </>
    )
}