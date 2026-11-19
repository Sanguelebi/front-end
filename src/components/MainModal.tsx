import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

interface MainModalProps {
    title: string;
    child?: React.ReactNode;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

function MainModal({ title, child, children, isOpen = true, onClose }: MainModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-[850px] bg-primary rounded-[45px] p-4 md:p-6 shadow-2xl transition-all">
                <div className="relative overflow-hidden rounded-[35px] bg-background px-6 pt-10 pb-8 md:px-12 md:pt-14 md:pb-12 shadow-inner">
                    {onClose && (
                        <button
                            onClick={onClose}
                            aria-label="დახურვა"
                            className="absolute top-0 right-0 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center bg-primary text-white font-bold text-2xl md:text-3xl rounded-bl-3xl transition-opacity hover:opacity-90 active:scale-95 cursor-pointer"
                        >
                            <Icon icon="mdi:close" className="size-7 md:size-8" />
                        </button>
                    )}

                    <h2 className="text-center font-bold text-3xl md:text-5xl text-primary mb-8 md:mb-10">
                        {title}
                    </h2>

                    <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-1">
                        {child ?? children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainModal;
