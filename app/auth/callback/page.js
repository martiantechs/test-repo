'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuth } = useAuthStore();
    const processedRef = useRef(false);

    useEffect(() => {
        const code = searchParams.get('code');
        const mock = searchParams.get('mock');

        if (processedRef.current) return;

        const login = async () => {
            processedRef.current = true;
            try {
                let response;
                if (mock === 'true') {
                    response = await api.get('/auth/mock');
                } else if (code) {
                    response = await api.get(`/auth/wechat/callback?code=${code}`);
                } else {
                    // No code, redirect to login
                    router.push('/login');
                    return;
                }

                const { access_token, user } = response.data;
                setAuth(access_token, user);
                router.push('/');
            } catch (error) {
                console.error('Auth callback failed', error);
                router.push('/login?error=auth_failed');
            }
        };

        login();
    }, [router, searchParams, setAuth]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Authenticating...</h2>
                <p className="text-gray-500">Please wait while we log you in.</p>
            </div>
        </div>
    );
}
