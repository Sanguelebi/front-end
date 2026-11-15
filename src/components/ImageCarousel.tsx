import { useState } from 'react';
import { Icon } from '@iconify/react';

interface CarouselCard {
    title: string;
    photoURL: string;
}

function ImageCarousel() {
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const slides: CarouselCard[] = [
        {
            title: 'ყველა',
            photoURL:
                'https://connect-assets.prosple.com/cdn/ff/mPo4ez0v5hrH_fVdkUUvyGvXttXoYjo6krpOYKbTfmI/1567121991/public/styles/scale_890_no_upsize/public/2019-08/feature-article-how-to-study-effectively-at-uni-838x484-2019.png?itok=4yLjlYah',
        },
        {
            title: 'კომპიუტერული მეცნიერება',
            photoURL:
                'https://www.salesforce.com/blog/wp-content/uploads/sites/2/2024/12/Best-Practices-for-Maintaining-Government-Site-Reliability.png',
        },
        {
            title: 'ფსიქოლოგია',
            photoURL: 'https://i.pinimg.com/736x/c2/a4/a8/c2a4a847e0ba5bfe07aef970b752defe.jpg',
        },
        {
            title: 'ბიზნესი',
            photoURL:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ew0FnCNZq_w3AeGqb_IaOOb5Ozk29_4K-kEUEtoH8EjytgDBCCYILOw&s=10',
        },
    ];

    const prev = () => setActiveIdx((i) => (i === 0 ? slides.length - 1 : i - 1));
    const next = () => setActiveIdx((i) => (i === slides.length - 1 ? 0 : i + 1));

    return (
        <div className="w-full max-w-[1240px] mx-auto">
            {/* Carousel Viewport */}
            <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] h-[240px] sm:h-[340px] md:h-[420px] lg:h-[460px] shadow-xl bg-gray-900">
                {/* Sliding Track */}
                <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeIdx * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="w-full h-full flex-shrink-0 relative flex items-center justify-center"
                        >
                            <img
                                src={slide.photoURL}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/25" />

                            {/* Frosted Glass Title Pill */}
                            <div className="relative z-10 w-[75%] max-w-2xl px-6 md:px-14 py-3 md:py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center">
                                <h3 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-md text-center">
                                    {slide.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Left navigation arrow tab */}
                <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/35 hover:bg-black/55 text-white/80 hover:text-white w-9 md:w-11 h-16 md:h-20 rounded-xl backdrop-blur-xs transition flex items-center justify-center cursor-pointer"
                >
                    <Icon icon="mdi:chevron-left" className="size-7 md:size-9" />
                </button>

                {/* Right navigation arrow tab */}
                <button
                    onClick={next}
                    aria-label="Next slide"
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/35 hover:bg-black/55 text-white/80 hover:text-white w-9 md:w-11 h-16 md:h-20 rounded-xl backdrop-blur-xs transition flex items-center justify-center cursor-pointer"
                >
                    <Icon icon="mdi:chevron-right" className="size-7 md:size-9" />
                </button>
            </div>
        </div>
    );
}

export default ImageCarousel;
