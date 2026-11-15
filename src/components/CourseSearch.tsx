import React from 'react';
import { Icon } from '@iconify/react';

interface CourseSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (query: string) => void;
}

function CourseSearch({
    placeholder = 'ძებნა...',
    className = '',
    onSearch,
    ...props
}: CourseSearchProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(e.currentTarget.value);
        }
        props.onKeyDown?.(e);
    };

    return (
        <div className={`relative w-full max-w-[820px] mx-auto ${className}`}>
            <div className="flex items-center gap-3 w-full bg-background border-[3px] border-primary rounded-full px-5 md:px-6 py-2 md:py-2.5 shadow-xs transition-all focus-within:shadow-md">
                <Icon icon="mdi:magnify" className="text-primary size-6 md:size-7 shrink-0" />
                <input
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-base md:text-lg text-[#1a1a1a] placeholder:text-[#3a2010]/70 font-medium"
                    {...props}
                />
            </div>
        </div>
    );
}

export default CourseSearch;
