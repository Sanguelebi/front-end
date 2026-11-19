import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageCarousel from '@/components/ImageCarousel';
import CourseSearch from '@/components/CourseSearch';
import CourseCard from '@/components/CourseCard';
import { Icon } from '@iconify/react';
import {
    getFaculties,
    getStudentChoosableSubjects,
    getSubjects,
} from '@/services/subjectService';
import type { Faculty, Subject, SubjectType } from '@/models/api';
import type { RootState } from '@/store/store';

const PAGE_SIZE = 9;

function parseCategoryParam(raw: string | null): '' | SubjectType {
    if (raw === 'professional' || raw === 'free') return raw;
    return '';
}

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = parseCategoryParam(searchParams.get('category'));
    const user = useSelector((state: RootState) => state.user);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');
    const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [choosableSubjects, setChoosableSubjects] = useState<Subject[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Debounce search input to avoid excessive API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery.trim());
            setPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Load faculties once for category labels and filtering
    useEffect(() => {
        let cancelled = false;

        getFaculties()
            .then((data) => {
                if (!cancelled) {
                    setFaculties(data ?? []);
                }
            })
            .catch(() => {
                // Non-fatal: subjects can still render without faculty labels
            });

        return () => {
            cancelled = true;
        };
    }, []);

    // Load subjects depending on whether a student category filter is active
    useEffect(() => {
        let cancelled = false;

        if (activeCategory) {
            if (user.id === -1) {
                setChoosableSubjects([]);
                setIsLoading(false);
                setError(null);
                return;
            }

            setIsLoading(true);
            setError(null);

            getStudentChoosableSubjects(activeCategory)
                .then((items) => {
                    if (cancelled) return;
                    setChoosableSubjects(items.map((item) => item.subjectData));
                    setHasMore(false);
                })
                .catch(() => {
                    if (cancelled) return;
                    setError('კატეგორიის მიხედვით საგნების ჩატვირთვა ვერ მოხერხდა.');
                })
                .finally(() => {
                    if (!cancelled) setIsLoading(false);
                });

            return () => {
                cancelled = true;
            };
        }

        const isFirstPage = page === 1;
        if (isFirstPage) {
            setIsLoading(true);
        } else {
            setIsLoadingMore(true);
        }
        setError(null);

        getSubjects({
            name: debouncedQuery || undefined,
            faculty: selectedFacultyId || undefined,
            page,
            page_size: PAGE_SIZE,
        })
            .then((data) => {
                if (cancelled) return;
                const incoming = data.subjects ?? [];
                setSubjects((prev) => (isFirstPage ? incoming : [...prev, ...incoming]));
                setHasMore(Boolean(data.has_more));
            })
            .catch(() => {
                if (cancelled) return;
                setError('საგნების ჩატვირთვა ვერ მოხერხდა. შეამოწმეთ სერვერთან კავშირი.');
            })
            .finally(() => {
                if (cancelled) return;
                setIsLoading(false);
                setIsLoadingMore(false);
            });

        return () => {
            cancelled = true;
        };
    }, [activeCategory, user.id, debouncedQuery, selectedFacultyId, page]);

    const facultyMap = useMemo(() => {
        return new Map<number, Faculty>(faculties.map((f) => [f.ID, f]));
    }, [faculties]);

    // Filter choosable subjects client-side when a student category is active
    const visibleSubjects = useMemo(() => {
        if (!activeCategory) return subjects;

        const q = debouncedQuery.toLowerCase();
        return choosableSubjects.filter((subj) => {
            if (selectedFacultyId && String(subj.FacultyID) !== selectedFacultyId) {
                return false;
            }
            if (q && !subj.Name.toLowerCase().includes(q)) {
                return false;
            }
            return true;
        });
    }, [activeCategory, subjects, choosableSubjects, debouncedQuery, selectedFacultyId]);

    const handleFacultyChange = (facultyId: string) => {
        setSelectedFacultyId(facultyId);
        setPage(1);
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setDebouncedQuery('');
        setSelectedFacultyId('');
        setPage(1);
        if (activeCategory) {
            setSearchParams({});
        }
    };

    const activeCategoryTitle =
        activeCategory === 'professional'
            ? 'პროფესიული ასარჩევი საგნები'
            : activeCategory === 'free'
              ? 'თავისუფალი კრედიტის საგნები'
              : null;

    return (
        <main className="min-h-screen bg-background py-8 px-4 md:px-8 flex flex-col gap-8 md:gap-10">
            {/* Header / Carousel */}
            <ImageCarousel />

            {/* Search Bar & Faculty Filter */}
            <div className="flex flex-col gap-4 items-center w-full max-w-[1240px] mx-auto">
                <CourseSearch
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ძებნა..."
                />

                {activeCategoryTitle && (
                    <div className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                        <span>კატეგორია: {activeCategoryTitle}</span>
                        <button
                            type="button"
                            onClick={() => setSearchParams({})}
                            className="hover:opacity-70 cursor-pointer"
                            aria-label="კატეგორიის ფილტრის მოხსნა"
                        >
                            <Icon icon="mdi:close-circle" className="size-4" />
                        </button>
                    </div>
                )}

                {faculties.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleFacultyChange('')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                                selectedFacultyId === ''
                                    ? 'bg-primary text-white'
                                    : 'bg-white/70 text-[#3a2010] hover:bg-white'
                            }`}
                        >
                            ყველა ფაკულტეტი
                        </button>
                        {faculties.map((faculty) => {
                            const idStr = String(faculty.ID);
                            const active = selectedFacultyId === idStr;
                            return (
                                <button
                                    key={faculty.ID}
                                    type="button"
                                    onClick={() => handleFacultyChange(idStr)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                                        active
                                            ? 'bg-primary text-white'
                                            : 'bg-white/70 text-[#3a2010] hover:bg-white'
                                    }`}
                                >
                                    {faculty.Name}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Courses Grid */}
            <div className="w-full max-w-[1240px] mx-auto">
                {activeCategory && user.id === -1 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                        <Icon icon="mdi:lock-outline" className="size-14 text-primary/70" />
                        <h3 className="text-xl font-bold text-primary">
                            საჭიროა ავტორიზაცია
                        </h3>
                        <p className="text-gray-600 max-w-md">
                            სტუდენტის კატეგორიების („{activeCategoryTitle}“) სანახავად გთხოვთ შეხვიდეთ
                            თქვენს ანგარიშში.
                        </p>
                        <Link
                            to="/login"
                            className="px-6 py-2 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition"
                        >
                            შესვლა
                        </Link>
                    </div>
                ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-primary">
                        <Icon icon="mdi:loading" className="size-10 animate-spin" />
                        <p className="font-medium">საგნები იტვირთება...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                        <Icon icon="mdi:alert-circle-outline" className="size-14 text-red-600/80" />
                        <p className="text-red-700 font-medium">{error}</p>
                        <button
                            type="button"
                            onClick={() => setPage(1)}
                            className="mt-1 px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 cursor-pointer"
                        >
                            თავიდან ცდა
                        </button>
                    </div>
                ) : visibleSubjects.length > 0 ? (
                    <div className="flex flex-col items-center gap-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                            {visibleSubjects.map((subject) => {
                                const facultyName =
                                    facultyMap.get(subject.FacultyID)?.Name ?? 'საგანი';
                                return (
                                    <CourseCard
                                        key={subject.ID}
                                        title={subject.Name}
                                        instructor={`${subject.Credit} კრედიტი`}
                                        category={facultyName}
                                        image="/course.svg"
                                        onClick={() => console.log('არჩეული საგანი:', subject)}
                                    />
                                );
                            })}
                        </div>

                        {!activeCategory && hasMore && (
                            <button
                                type="button"
                                disabled={isLoadingMore}
                                onClick={() => setPage((prev) => prev + 1)}
                                className="px-8 py-2.5 rounded-full bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer"
                            >
                                {isLoadingMore ? 'იტვირთება...' : 'მეტის ჩვენება'}
                            </button>
                        )}
                    </div>
                ) : (
                    /* Empty State when no courses match */
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                        <Icon
                            icon="mdi:magnify-remove-outline"
                            className="size-16 text-primary/60"
                        />
                        <h3 className="text-2xl font-bold text-primary">საგანი ვერ მოიძებნა</h3>
                        <p className="text-gray-600">
                            {debouncedQuery
                                ? `მოთხოვნით „${debouncedQuery}“ შედეგი არ არის. სცადეთ სხვა საძიებო სიტყვა.`
                                : 'ამ ფილტრით საგნები არ მოიძებნა.'}
                        </p>
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="mt-2 text-primary underline font-medium hover:opacity-80 cursor-pointer"
                        >
                            ფილტრის გასუფთავება
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Home;
