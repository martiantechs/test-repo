'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import StarRating from '@/components/StarRating';

export default function ShowDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuthStore();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const { data } = await api.get(`/shows/${id}`);
                setShow(data);
            } catch (error) {
                console.error('Failed to fetch show', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchShow();
        }
    }, [id, user]); // Re-fetch if user logs in to get user ratings

    const handleRate = async (episodeId, score) => {
        if (!user) {
            router.push('/login');
            return;
        }

        // Optimistic Update
        const previousShow = { ...show };
        const updatedEpisodes = show.episodes.map((ep) => {
            if (ep.id === episodeId) {
                return { ...ep, user_rating: score };
            }
            return ep;
        });
        setShow({ ...show, episodes: updatedEpisodes });

        try {
            await api.post('/rate', { episode_id: episodeId, score });
            // Optionally re-fetch to get updated average
            const { data } = await api.get(`/shows/${id}`);
            setShow(data);
        } catch (error) {
            console.error('Failed to rate', error);
            // Revert optimistic update
            setShow(previousShow);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!show) return <div className="text-center py-10">Show not found</div>;

    return (
        <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            className="h-48 w-full object-cover md:w-48"
                            src={show.cover_image}
                            alt={show.title}
                        />
                    </div>
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900">{show.title}</h1>
                        <p className="mt-2 text-gray-500">{show.description}</p>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Episodes</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {show.episodes.map((episode) => (
                        <li key={episode.id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-indigo-600 truncate">
                                        {episode.episode_number}. {episode.title}
                                    </h3>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <span className="mr-4">Avg Rating: {episode.average_rating} / 5</span>
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                                    <span className="text-xs text-gray-400 mb-1">
                                        {user ? 'Your Rating' : 'Login to Rate'}
                                    </span>
                                    <StarRating
                                        initialRating={episode.user_rating || 0}
                                        onRate={(score) => handleRate(episode.id, score)}
                                        readOnly={false}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
