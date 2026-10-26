import { useState } from 'react';

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
    <div className="w-full max-w-lg mx-auto">
      {/* Carousel Viewport */}
      <div className="relative overflow-hidden rounded-xl h-64 shadow-md bg-gray-900">
        {/* Sliding Track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative flex items-center justify-center text-white text-2xl font-bold"
            >
              <img
                src={slide.photoURL}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <p className="relative z-10 px-4 text-center drop-shadow-md">{slide.title}</p>
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white px-3 py-1.5 rounded-full transition"
        >
          ❮
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white px-3 py-1.5 rounded-full transition"
        >
          ❯
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIdx(index)}
              className={`h-2 rounded-full transition-all ${
                activeIdx === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;
