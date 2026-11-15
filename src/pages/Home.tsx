import { useState, useMemo } from 'react';
import ImageCarousel from '@/components/ImageCarousel';
import CourseSearch from '@/components/CourseSearch';
import CourseCard from '@/components/CourseCard';
import { Icon } from '@iconify/react';

interface Course {
    id: number;
    title: string;
    instructor: string;
    category: string;
    image: string;
}

const INITIAL_COURSES: Course[] = [
    {
        id: 1,
        title: 'დაპროგრამების საფუძვლები',
        instructor: 'ლექტორის სახელი',
        category: 'პროფესიული',
        image: '/course.svg',
    },
    {
        id: 2,
        title: 'ალგორითმები',
        instructor: 'ლექტორის სახელი',
        category: 'პროფესიული',
        image: '/course.svg',
    },
    {
        id: 3,
        title: 'Python',
        instructor: 'ლექტორის სახელი',
        category: 'არჩევითი პროფესიული',
        image: '/course.svg',
    },
    {
        id: 4,
        title: 'ვებ დეველოპმენტი',
        instructor: 'ლექტორის სახელი',
        category: 'სავალდებულო',
        image: '/course.svg',
    },
    {
        id: 5,
        title: 'მონაცემთა ბაზები',
        instructor: 'ლექტორის სახელი',
        category: 'სავალდებულო',
        image: '/course.svg',
    },
    {
        id: 6,
        title: 'კომპიუტერული ქსელები',
        instructor: 'ლექტორის სახელი',
        category: 'არჩევითი',
        image: '/course.svg',
    },
    {
        id: 7,
        title: 'მობილური აპლიკაციები',
        instructor: 'ლექტორის სახელი',
        category: 'სავალდებულო',
        image: '/course.svg',
    },
    {
        id: 8,
        title: 'ხელოვნური ინტელექტი',
        instructor: 'ლექტორის სახელი',
        category: 'არჩევითი',
        image: '/course.svg',
    },
    {
        id: 9,
        title: 'კიბერუსაფრთხოება',
        instructor: 'ლექტორის სახელი',
        category: 'სავალდებულო',
        image: '/course.svg',
    },
];

function Home() {
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Reactive filtering based on search query
    const filteredCourses = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return INITIAL_COURSES;

        return INITIAL_COURSES.filter((course) => {
            return (
                course.title.toLowerCase().includes(query) ||
                course.instructor.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query)
            );
        });
    }, [searchQuery]);

    return (
        <main className="min-h-screen bg-background py-8 px-4 md:px-8 flex flex-col gap-8 md:gap-10">
            {/* Header / Carousel */}
            <ImageCarousel />

            {/* Reactive Search Bar */}
            <CourseSearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ძებნა..."
            />

            {/* Courses Grid */}
            <div className="w-full max-w-[1240px] mx-auto">
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                title={course.title}
                                instructor={course.instructor}
                                category={course.category}
                                image={course.image}
                                onClick={() => console.log('არჩეული კურსი:', course.title)}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State when no courses match */
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                        <Icon
                            icon="mdi:magnify-remove-outline"
                            className="size-16 text-primary/60"
                        />
                        <h3 className="text-2xl font-bold text-primary">კურსი ვერ მოიძებნა</h3>
                        <p className="text-gray-600">
                            მოთხოვნით „{searchQuery}“ შედეგი არ არის. სცადეთ სხვა საძიებო სიტყვა.
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-2 text-primary underline font-medium hover:opacity-80 cursor-pointer"
                        >
                            ძებნის გასუფთავება
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Home;
