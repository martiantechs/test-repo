'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';

export default function StarRating({ initialRating, onRate, readOnly = false }) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readOnly}
                    onClick={() => onRate(star)}
                    onMouseEnter={() => !readOnly && setHoverRating(star)}
                    onMouseLeave={() => !readOnly && setHoverRating(0)}
                    className={clsx(
                        'focus:outline-none transition-colors duration-150',
                        readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
                    )}
                >
                    <Star
                        className={clsx(
                            'w-6 h-6',
                            (hoverRating || initialRating) >= star
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                        )}
                    />
                </button>
            ))}
        </div>
    );
}
