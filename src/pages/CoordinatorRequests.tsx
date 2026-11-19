import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import {
    getCoordinatorStudentPriorities,
    toggleConfirmSubject,
} from '@/services/coordinatorService';
import type { StudentPriority } from '@/models/api';

type TabType = 'confirmed' | 'unconfirmed';

interface StudentGroup {
    studentId: number;
    slots: {
        slotId: number;
        subjectType: StudentPriority['subject_type'];
        items: StudentPriority[];
    }[];
}

function CoordinatorRequests() {
    const [priorities, setPriorities] = useState<StudentPriority[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('unconfirmed');
    const [openStudentId, setOpenStudentId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<number | null>(null);

    const loadPriorities = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getCoordinatorStudentPriorities();
            setPriorities(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const apiErr = err.response?.data?.error as string | undefined;
                setError(apiErr || 'სტუდენტების არჩევანის ჩატვირთვა ვერ მოხერხდა.');
            } else {
                setError('სტუდენტების არჩევანის ჩატვირთვა ვერ მოხერხდა.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPriorities();
    }, [loadPriorities]);

    const handleToggleConfirm = async (priorityId: number) => {
        setTogglingId(priorityId);
        setActionError(null);
        try {
            await toggleConfirmSubject(priorityId);
            const updated = await getCoordinatorStudentPriorities();
            setPriorities(updated);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const apiErr = err.response?.data?.error as string | undefined;
                setActionError(apiErr || 'სტატუსის შეცვლა ვერ მოხერხდა.');
            } else {
                setActionError('სტატუსის შეცვლა ვერ მოხერხდა.');
            }
        } finally {
            setTogglingId(null);
        }
    };

    const toggleStudentAccordion = (studentId: number) => {
        setOpenStudentId((prev) => (prev === studentId ? null : studentId));
    };

    const studentGroups: StudentGroup[] = useMemo(() => {
        const wantConfirmed = activeTab === 'confirmed';
        const filtered = priorities.filter((p) => p.confirm === wantConfirmed);

        const byStudent = new Map<number, StudentPriority[]>();
        for (const item of filtered) {
            const list = byStudent.get(item.student_id) ?? [];
            list.push(item);
            byStudent.set(item.student_id, list);
        }

        const result: StudentGroup[] = [];
        for (const [studentId, items] of byStudent.entries()) {
            const bySlot = new Map<number, StudentPriority[]>();
            for (const item of items) {
                const slotList = bySlot.get(item.slot_id) ?? [];
                slotList.push(item);
                bySlot.set(item.slot_id, slotList);
            }

            const slots = Array.from(bySlot.entries())
                .sort(([a], [b]) => a - b)
                .map(([slotId, slotItems]) => ({
                    slotId,
                    subjectType: slotItems[0].subject_type,
                    items: [...slotItems].sort((a, b) => a.priority - b.priority),
                }));

            result.push({ studentId, slots });
        }

        return result.sort((a, b) => a.studentId - b.studentId);
    }, [priorities, activeTab]);

    const statusLabel = activeTab === 'confirmed' ? 'დადასტურებული' : 'დაუდასტურებელი';

    return (
        <main className="min-h-screen bg-background py-10 px-4 md:px-8">
            <div className="w-full max-w-[900px] mx-auto flex flex-col items-center gap-8">
                {/* Two Pill Tabs: დადასტურებული / დაუდასტურებელი */}
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <button
                        type="button"
                        onClick={() => setActiveTab('confirmed')}
                        className={`px-8 py-2.5 rounded-full font-bold text-base transition cursor-pointer ${
                            activeTab === 'confirmed'
                                ? 'bg-primary text-background shadow-md'
                                : 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10'
                        }`}
                    >
                        დადასტურებული
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('unconfirmed')}
                        className={`px-8 py-2.5 rounded-full font-bold text-base transition cursor-pointer ${
                            activeTab === 'unconfirmed'
                                ? 'bg-primary text-background shadow-md'
                                : 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10'
                        }`}
                    >
                        დაუდასტურებელი
                    </button>
                </div>

                {actionError && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-2xl text-sm font-medium flex items-center justify-between">
                        <span>{actionError}</span>
                        <button
                            type="button"
                            onClick={() => setActionError(null)}
                            className="hover:opacity-70 cursor-pointer"
                        >
                            <Icon icon="mdi:close" className="size-4" />
                        </button>
                    </div>
                )}

                {/* Main Primary Container */}
                <div className="w-full bg-primary rounded-3xl p-5 md:p-8 shadow-xl flex flex-col gap-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-14 gap-3 text-background">
                            <Icon icon="mdi:loading" className="size-10 animate-spin" />
                            <p className="font-medium">მონაცემები იტვირთება...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center gap-3 text-background">
                            <Icon icon="mdi:alert-circle-outline" className="size-12" />
                            <p className="font-medium">{error}</p>
                            <button
                                type="button"
                                onClick={loadPriorities}
                                className="px-5 py-2 rounded-full bg-background text-primary text-sm font-bold hover:opacity-90 cursor-pointer"
                            >
                                თავიდან ცდა
                            </button>
                        </div>
                    ) : studentGroups.length === 0 ? (
                        <div className="py-12 text-center text-background/90 font-medium">
                            {activeTab === 'confirmed'
                                ? 'დადასტურებული მოთხოვნები ჯერ არ არის.'
                                : 'დაუდასტურებელი მოთხოვნები არ არის.'}
                        </div>
                    ) : (
                        studentGroups.map((student) => {
                            const isExpanded = openStudentId === student.studentId;

                            return (
                                <div key={student.studentId} className="flex flex-col">
                                    {/* Student Accordion Header Pill */}
                                    <button
                                        type="button"
                                        aria-expanded={isExpanded}
                                        onClick={() => toggleStudentAccordion(student.studentId)}
                                        className="w-full bg-background rounded-full px-6 py-3 flex items-center justify-between gap-4 text-primary font-bold shadow-sm hover:opacity-95 transition cursor-pointer z-10"
                                    >
                                        <span className="text-base md:text-lg">
                                            სტუდენტი #{student.studentId}
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <span className="text-sm md:text-base font-bold">
                                                {statusLabel}
                                            </span>
                                            <Icon
                                                icon={isExpanded ? 'mdi:play' : 'mdi:menu-down'}
                                                className="size-6 text-primary transition-transform"
                                            />
                                        </div>
                                    </button>

                                    {/* Expanded Student Slots */}
                                    {isExpanded && (
                                        <div className="border-2 border-t-0 border-background rounded-b-3xl mx-2 px-4 pt-7 pb-5 md:px-6 -mt-3 flex flex-col gap-5">
                                            {student.slots.map((slot, slotIdx) => {
                                                const slotTypeLabel =
                                                    slot.subjectType === 'free'
                                                        ? 'თავისუფალი საგანი'
                                                        : 'პროფესიული საგანი';

                                                return (
                                                    <div
                                                        key={slot.slotId}
                                                        className="flex flex-col gap-2.5"
                                                    >
                                                        <h3 className="text-background font-bold text-base md:text-lg px-2">
                                                            {slotIdx + 1}. {slotTypeLabel}
                                                        </h3>

                                                        <div className="flex flex-col gap-2.5">
                                                            {slot.items.map((item) => {
                                                                const isBusy =
                                                                    togglingId === item.id;
                                                                return (
                                                                    <div
                                                                        key={item.id}
                                                                        className="bg-background rounded-full px-5 py-2 flex flex-wrap items-center justify-between gap-3 text-primary shadow-sm"
                                                                    >
                                                                        <span className="font-semibold text-sm md:text-base min-w-[140px]">
                                                                            პრიორიტეტი #
                                                                            {item.priority}
                                                                        </span>

                                                                        <span className="text-sm font-medium">
                                                                            ჯგუფი #
                                                                            {item.subject_group_id}
                                                                        </span>

                                                                        <button
                                                                            type="button"
                                                                            disabled={isBusy}
                                                                            onClick={() =>
                                                                                handleToggleConfirm(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className="border-2 border-primary text-primary rounded-full px-5 py-1 text-xs md:text-sm font-bold hover:bg-primary hover:text-background disabled:opacity-50 transition cursor-pointer"
                                                                        >
                                                                            {isBusy
                                                                                ? '...'
                                                                                : item.confirm
                                                                                  ? 'გაუქმება'
                                                                                  : 'დადასტურება'}
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </main>
    );
}

export default CoordinatorRequests;
