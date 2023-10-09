import { useState } from 'react';
import Sidebar from './Sidebar';
import Logo from './Logo';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Layout() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="block md:flex h-screen">
            <Navbar />
            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />

            <div className="md:flex">
                <div className="p-4 md:hidden flex justify-between">
                    <Logo className={'w-24'} />
                    <button onClick={() => setShowSidebar(true)}>
                        <AiOutlineMenu className="w-6 h-6" />
                    </button>
                </div>
                <div className=" bg-bgGray shareLayout">
                    <div className="bg-whiteColor p-5 hidden md:block">
                        <h1 className="text-center text-3xl">Dashboard</h1>
                    </div>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
