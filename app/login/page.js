'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const { setAuth } = useAuthStore();

    const handleWeChatLogin = async () => {
        try {
            setLoading(true);
            // Check if we want mock mode via query param or just default
            const mock = searchParams.get('mock');
            const { data } = await api.get('/auth/wechat/login');

            // If mock mode is returned or requested
            if (data.url.includes('mock=true') || mock === 'true') {
                // If the backend returned a local URL, we can just go there.
                // But for mock flow, we might want to just hit the callback directly if we are lazy, 
                // but let's follow the flow: redirect to the URL provided by backend.
                window.location.href = data.url;
            } else {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Login failed', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Use WeChat to access all features
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <button
                        onClick={handleWeChatLogin}
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                        {loading ? 'Redirecting...' : 'Login with WeChat'}
                    </button>

                    {/* Dev helper for Mock Login */}
                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400">Dev Mode: Backend defaults to Mock Auth if env var is set.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
