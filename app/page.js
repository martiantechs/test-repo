'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function Dashboard() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const { data } = await api.get('/shows');
        setShows(data);
      } catch (error) {
        console.error('Failed to fetch shows', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading shows...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shows.map((show) => (
          <Link key={show.id} href={`/shows/${show.id}`} className="group">
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200">
              <div className="relative h-48 w-full">
                <img
                  src={show.cover_image}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                  {show.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {show.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
