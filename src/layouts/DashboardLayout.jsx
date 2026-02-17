import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Target, Activity, FileStack, User, Menu, X, Bell, FileSearch, History } from 'lucide-react';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'JD Analyzer', href: '/dashboard/analysis', icon: FileSearch },
        { name: 'View History', href: '/dashboard/history', icon: History },
        { name: 'Practice', href: '/dashboard/practice', icon: Target },
        { name: 'Assessments', href: '/dashboard/assessments', icon: Activity },
        { name: 'Resources', href: '/dashboard/resources', icon: FileStack },
        { name: 'Profile', href: '/dashboard/profile', icon: User },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
            {/* Sidebar for desktop */}
            <aside className="hidden lg:flex lg:flex-shrink-0 lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 bg-white">
                <div className="flex items-center justify-center p-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-gray-900 tracking-tight">Placement Prep</span>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto px-4 py-6">
                    <nav className="space-y-1">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-indigo-50 text-[hsl(245,58%,51%)]'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="h-8 w-8 rounded-full bg-[hsl(245,58%,51%)] text-white flex items-center justify-center font-bold">JD</div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">John Doe</p>
                            <p className="text-xs text-gray-500">Student</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition duration-300 translate-x-0">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4 mb-5">
                                <span className="text-xl font-bold">Placement Prep</span>
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive
                                                ? 'bg-indigo-50 text-[hsl(245,58%,51%)]'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="-ml-2 mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <span className="font-bold text-gray-900">Placement Prep</span>
                    <div className="h-8 w-8 rounded-full bg-[hsl(245,58%,51%)] text-white flex items-center justify-center text-sm">JD</div>
                </div>

                {/* Desktop Header */}
                <header className="hidden lg:flex bg-white h-16 border-b border-gray-200 items-center justify-between px-8 shadow-sm">
                    <h1 className="text-lg font-semibold text-gray-800">Placement Preparation Platform</h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        </button>
                    </div>
                </header>

                {/* Content Outlet */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
