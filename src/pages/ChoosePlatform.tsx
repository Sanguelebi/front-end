import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import ChoosePlatformBanner from '@/components/ChoosePlatformBanner';
import CourseCard from '@/components/CourseCard';
import MainModal from '@/components/MainModal';
import { getStudentChoosableSubjects } from '@/services/subjectService';
import {
    addStudentPriority,
    deleteStudentPriority,
    getStudentAllowance,
    getStudentPriorities,
} from '@/services/priorityService';
import type {
    ChoosableSubjectResponse,
    StudentPriority,
    StudentSubjectAllowance,
    Subject,
    SubjectGroup,
    SubjectType,
} from '@/models/api';

const DAY_NAMES: Record<number, string> = {
    1: 'ორშაბათი',
    2: 'სამშაბათი',
    3: 'ოთხშაბათი',
    4: 'ხუთშაბათი',
    5: 'პარასკევი',
    6: 'შაბათი',
    7: 'კვირა',
};

const MAX_PRIORITIES_PER_SLOT = 3;

function getPriorityLabel(priority: number): string {
    switch (priority) {
        case 1:
            return 'ძირითადი არჩევანი';
        case 2:
            return 'სარეზერვო #1';
        case 3:
            return 'სარეზერვო #2';
        default:
            return `პრიორიტეტი #${priority}`;
    }
}

function ChoosePlatform() {
    const [selectedType, setSelectedType] = useState<SubjectType>('free');
    const [priorities, setPriorities] = useState<StudentPriority[]>([]);
    const [choosableSubjects, setChoosableSubjects] = useState<ChoosableSubjectResponse[]>([]);
    const [allowance, setAllowance] = useState<StudentSubjectAllowance | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 2-step modal state:
    // Step 1: addingSlotId !== null && activeSubject === null -> Subject cards modal
    // Step 2: addingSlotId !== null && activeSubject !== null -> Subject groups modal
    const [addingSlotId, setAddingSlotId] = useState<number | null>(null);
    const [activeSubject, setActiveSubject] = useState<ChoosableSubjectResponse | null>(null);
    const [modalError, setModalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const loadData = useCallback(async (type: SubjectType) => {
        setIsLoading(true);
        setError(null);

        try {
            const [priorityList, choosableList, allowanceData] = await Promise.all([
                getStudentPriorities(),
                getStudentChoosableSubjects(type),
                getStudentAllowance(),
            ]);

            setPriorities(priorityList);
            setChoosableSubjects(choosableList);
            setAllowance(allowanceData);
        } catch {
            setError('მონაცემების ჩატვირთვა ვერ მოხერხდა.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData(selectedType);
    }, [selectedType, loadData]);

    const filteredPriorities = useMemo(
        () => priorities.filter((p) => p.subject_type === selectedType),
        [priorities, selectedType]
    );

    const groupLookup = useMemo(() => {
        const map = new Map<number, { subject: Subject; group: SubjectGroup }>();
        for (const item of choosableSubjects) {
            for (const group of item.subjectGroups) {
                map.set(group.ID, { subject: item.subjectData, group });
            }
        }
        return map;
    }, [choosableSubjects]);

    const chosenGroupIds = useMemo(
        () => new Set<number>(priorities.map((p) => p.subject_group_id)),
        [priorities]
    );

    const slotIds = useMemo(() => {
        const freeAllowance = allowance?.free_subject_allowance ?? 1;
        const profAllowance = allowance?.professional_subject_allowance ?? 1;

        const baseSlotId = selectedType === 'free' ? 1 : freeAllowance + 1;
        const count = Math.max(selectedType === 'free' ? freeAllowance : profAllowance, 1);

        const expected = Array.from({ length: count }, (_, idx) => baseSlotId + idx);
        const existing = filteredPriorities.map((p) => p.slot_id);

        return Array.from(new Set([...expected, ...existing])).sort((a, b) => a - b);
    }, [allowance, selectedType, filteredPriorities]);

    const slotTitlePrefix =
        selectedType === 'free' ? 'თავისუფალი არჩევანი' : 'პროფესიული არჩევანი';

    const categoryLabel =
        selectedType === 'free' ? 'თავისუფალი კრედიტი' : 'პროფესიული არჩევითი';

    const openAddModal = (slotId: number) => {
        setAddingSlotId(slotId);
        setActiveSubject(null);
        setModalError(null);
    };

    const closeModals = () => {
        setAddingSlotId(null);
        setActiveSubject(null);
        setModalError(null);
    };

    const handleSelectGroup = async (groupId: number) => {
        if (addingSlotId === null) return;
        setModalError(null);
        setIsSubmitting(true);

        try {
            await addStudentPriority({
                subject_group_id: groupId,
                slot_id: addingSlotId,
                subject_type: selectedType,
            });
            const updated = await getStudentPriorities();
            setPriorities(updated);
            closeModals();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const apiErr = err.response?.data?.error as string | undefined;
                setModalError(apiErr || 'პრიორიტეტის დამატება ვერ მოხერხდა.');
            } else {
                setModalError('პრიორიტეტის დამატება ვერ მოხერხდა.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePriority = async (priorityId: number) => {
        setDeletingId(priorityId);
        try {
            await deleteStudentPriority(priorityId);
            const updated = await getStudentPriorities();
            setPriorities(updated);
        } catch {
            setError('პრიორიტეტის წაშლა ვერ მოხერხდა.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className="bg-background min-h-screen pb-16">
            <ChoosePlatformBanner
                selectedType={selectedType}
                onSelectType={(type) => {
                    closeModals();
                    setSelectedType(type);
                }}
            />

            <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 mt-10 flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary">
                            ჩემი პრიორიტეტების სია — {categoryLabel}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            თითოეულ სლოტში შეგიძლიათ აირჩიოთ მაქსიმუმ {MAX_PRIORITIES_PER_SLOT}{' '}
                            პრიორიტეტი
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-primary">
                        <Icon icon="mdi:loading" className="size-12 animate-spin" />
                        <p className="font-medium text-lg">პრიორიტეტები იტვირთება...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                        <Icon icon="mdi:alert-circle-outline" className="size-14 text-red-600/80" />
                        <p className="text-red-700 font-medium">{error}</p>
                        <button
                            type="button"
                            onClick={() => loadData(selectedType)}
                            className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 cursor-pointer"
                        >
                            თავიდან ცდა
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {slotIds.map((slotId, index) => {
                            const slotItems = filteredPriorities
                                .filter((p) => p.slot_id === slotId)
                                .sort((a, b) => a.priority - b.priority);
                            const canAdd = slotItems.length < MAX_PRIORITIES_PER_SLOT;
                            const slotLabel = `${slotTitlePrefix} #${index + 1}`;

                            return (
                                <section
                                    key={slotId}
                                    className="bg-white/60 border-2 border-primary/20 rounded-3xl p-6 shadow-sm flex flex-col gap-4"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/15 pb-3">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-primary">
                                                {slotLabel}
                                            </h3>
                                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                                                {slotItems.length} / {MAX_PRIORITIES_PER_SLOT}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={!canAdd}
                                            onClick={() => openAddModal(slotId)}
                                            className="flex items-center gap-1.5 bg-primary text-white font-semibold px-5 py-2 rounded-full hover:opacity-90 disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer text-sm shadow"
                                        >
                                            <Icon icon="mdi:plus" className="size-4" />
                                            დამატება
                                        </button>
                                    </div>

                                    {slotItems.length > 0 ? (
                                        <div className="flex flex-col gap-3">
                                            {slotItems.map((item) => {
                                                const info = groupLookup.get(item.subject_group_id);
                                                const subjectName =
                                                    info?.subject.Name ??
                                                    `საგნის ჯგუფი #${item.subject_group_id}`;
                                                const groupNo = info?.group.GroupNo;
                                                const lecturerName = info?.group.Lecturer
                                                    ? `${info.group.Lecturer.FirstName} ${info.group.Lecturer.LastName}`
                                                    : null;
                                                const schedule = info?.group
                                                    ? `${DAY_NAMES[info.group.Day] ?? `დღე ${info.group.Day}`} · ${info.group.From} - ${info.group.To}`
                                                    : null;

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FDEACC] border-[2px] border-[#9c784e] rounded-2xl px-5 py-4 shadow-sm"
                                                    >
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                                                    {getPriorityLabel(item.priority)}
                                                                </span>
                                                                {item.confirm && (
                                                                    <span className="bg-green-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                                                        დადასტურებულია
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h4 className="font-bold text-lg text-[#3a2010]">
                                                                {subjectName}
                                                                {groupNo !== undefined &&
                                                                    ` — ჯგუფი #${groupNo}`}
                                                            </h4>
                                                            {(lecturerName || schedule) && (
                                                                <p className="text-sm text-[#3a2010]/80">
                                                                    {[lecturerName, schedule]
                                                                        .filter(Boolean)
                                                                        .join(' · ')}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            disabled={deletingId === item.id}
                                                            onClick={() =>
                                                                handleDeletePriority(item.id)
                                                            }
                                                            className="flex items-center justify-center gap-1.5 bg-red-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-700 disabled:opacity-50 transition cursor-pointer text-sm shrink-0"
                                                        >
                                                            <Icon
                                                                icon="mdi:trash-can-outline"
                                                                className="size-4"
                                                            />
                                                            {deletingId === item.id
                                                                ? 'იშლება...'
                                                                : 'წაშლა'}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3 text-gray-600">
                                            <Icon
                                                icon="mdi:book-plus-outline"
                                                className="size-10 text-primary/50"
                                            />
                                            <p className="text-sm">
                                                ამ სლოტში საგანი ჯერ არ არის არჩეული.
                                            </p>
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal 1: Choosable Subject Cards */}
            <MainModal
                title={`აირჩიე საგანი (${slotTitlePrefix} #${addingSlotId !== null ? slotIds.indexOf(addingSlotId) + 1 : ''})`}
                isOpen={addingSlotId !== null && activeSubject === null}
                onClose={closeModals}
                child={
                    choosableSubjects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {choosableSubjects.map((item) => {
                                const { subjectData, subjectGroups } = item;
                                return (
                                    <CourseCard
                                        key={subjectData.ID}
                                        title={subjectData.Name}
                                        instructor={`${subjectData.Credit} კრედიტი · ${subjectGroups.length} ჯგუფი`}
                                        category={categoryLabel}
                                        image="/course.svg"
                                        onClick={() => {
                                            setModalError(null);
                                            setActiveSubject(item);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                            <Icon icon="akar-icons:clock" className="text-primary size-20" />
                            <p className="text-lg text-primary font-medium">
                                თქვენთვის ასარჩევი საგანი ვერ მოიძებნა...
                            </p>
                        </div>
                    )
                }
            />

            {/* Modal 2: Groups for Selected Subject */}
            <MainModal
                title={activeSubject?.subjectData.Name ?? 'აირჩიე ჯგუფი'}
                isOpen={addingSlotId !== null && activeSubject !== null}
                onClose={closeModals}
                child={
                    <div className="flex flex-col gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setModalError(null);
                                setActiveSubject(null);
                            }}
                            className="self-start flex items-center gap-1 text-primary font-semibold hover:underline cursor-pointer text-sm"
                        >
                            <Icon icon="mdi:arrow-left" className="size-4" />
                            საგნებზე დაბრუნება
                        </button>

                        {modalError && (
                            <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2.5 rounded-xl text-sm font-medium">
                                {modalError}
                            </div>
                        )}

                        {activeSubject && activeSubject.subjectGroups.length > 0 ? (
                            activeSubject.subjectGroups.map((group) => {
                                const lecturerName = group.Lecturer
                                    ? `${group.Lecturer.FirstName} ${group.Lecturer.LastName}`
                                    : 'ლექტორი მითითებული არ არის';
                                const dayName = DAY_NAMES[group.Day] ?? `დღე ${group.Day}`;
                                const lectureTypeLabel =
                                    group.LectureType === 'seminar' ? 'სემინარი' : 'ლექცია';
                                const alreadyChosen = chosenGroupIds.has(group.ID);

                                return (
                                    <div
                                        key={group.ID}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FDEACC] border-[2.5px] border-[#9c784e] rounded-2xl px-6 py-4 shadow-sm"
                                    >
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-lg text-[#3a2010]">
                                                ჯგუფი #{group.GroupNo} ({lectureTypeLabel})
                                            </span>
                                            <span className="text-sm text-[#3a2010]/80">
                                                {dayName} · {group.From} - {group.To}
                                            </span>
                                        </div>

                                        <span className="font-bold text-base text-[#3a2010]">
                                            {lecturerName}
                                        </span>

                                        <button
                                            type="button"
                                            disabled={isSubmitting || alreadyChosen}
                                            onClick={() => handleSelectGroup(group.ID)}
                                            className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all shadow cursor-pointer text-sm shrink-0"
                                        >
                                            {alreadyChosen
                                                ? 'არჩეულია'
                                                : isSubmitting
                                                  ? 'ემატება...'
                                                  : 'აირჩიე'}
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-600 py-4">
                                ამ საგნისთვის ჯგუფები ჯერ არ არის დამატებული.
                            </p>
                        )}
                    </div>
                }
            />
        </main>
    );
}

export default ChoosePlatform;
