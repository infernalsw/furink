import Image from "next/image";
import { useState } from "react";

export default function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <header className="w-full bg-gray-800 text-white">
            {/* Top Bar */}
            <div className="flex justify-between items-center py-2 px-4">
                <h1 className="text-lg font-bold">fur.ink</h1>

                {/* Right Section: User Profile and Settings */}
                <div className="flex items-center space-x-4">
                    {/* Dark/Light Mode Toggle */}
                    <button className="p-1">
                        <Image src="/path/to/dark-light-toggle-icon.png" alt="Toggle Mode" width={20} height={20} />
                    </button>

                    {/* User Avatar */}
                    <div className="relative">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center space-x-2">
                            <Image src="/images/avatar.png" alt="User Avatar" width={28} height={28} className="rounded-full" />
                            <span className="text-sm">kathleen dog ✨</span>
                        </button>

                        {/* Sidebar */}
                        {sidebarOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
                                <div className="p-4">
                                    <div className="flex items-center space-x-2">
                                        <Image src="/images/avatar" alt="User Avatar" width={28} height={28} className="rounded-full" />
                                        <div>
                                            <p className="font-bold text-sm">kathleen dog ✨</p>
                                            <p className="text-xs">@kaylen.dog</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <a href="/account" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
                                            <span>Account</span>
                                        </a>
                                        <a href="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
                                            <span>Settings</span>
                                        </a>
                                        <a href="/logout" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
                                            <span>Log out</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
