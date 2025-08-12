'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600">ShowRate</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    {user.avatar_url ? (
                                        <img
                                            src={user.avatar_url}
                                            alt={user.nickname}
                                            className="h-8 w-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <User className="h-5 w-5 text-indigo-600" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700">{user.nickname}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login with WeChat
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
