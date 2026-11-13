// src/components/SubjectItem.tsx
import { Icon } from '@iconify/react';

interface SubjectItemProps {
    index: number;
    subject: string;
    group: string;
    onDelete?: () => void;
}

function SubjectItem({ index, subject, group, onDelete }: SubjectItemProps) {
    return (
        <div className="flex items-center gap-4">
            <span className="w-8 text-center text-xl font-bold text-background">{index}.</span>

            <div className="flex-1 rounded-2xl border-[0.1875rem] border-solid border-[#A98B5F] bg-background px-4 py-1 text-center text-primary shadow-[0.25rem_0.25rem_0_#4A0E0F]">
                <p className="text-lg font-bold leading-tight">{subject}</p>
                <p className="text-sm leading-tight">{group}</p>
            </div>

            <button
                type="button"
                onClick={onDelete}
                aria-label="საგნის წაშლა"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-background text-[#1a1a1a] transition-all duration-150 hover:opacity-90 active:scale-95"
            >
                <Icon icon="mdi:trash-can-outline" className="h-6 w-6" />
            </button>
        </div>
    );
}

export default SubjectItem;
