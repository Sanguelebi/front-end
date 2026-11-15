import type { ReactNode } from 'react';

interface ChooseSubjectsWrapperProps {
    children: ReactNode;
}

function ChooseSubjectsWrapper({ children }: ChooseSubjectsWrapperProps) {
    return (
        <div className="mx-auto flex w-full max-w-[24.875rem] flex-col items-center justify-center gap-4 rounded-[1.25rem] border-4 border-solid border-[#4A0E0F] bg-[#6E2627] p-4">
            {children}
        </div>
    );
}

export default ChooseSubjectsWrapper;
