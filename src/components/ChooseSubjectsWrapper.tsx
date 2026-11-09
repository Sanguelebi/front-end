import type { ReactNode } from 'react';

interface ChooseSubjectsWrapperProps {
    children: ReactNode;
}

function ChooseSubjectsWrapper({ children }: ChooseSubjectsWrapperProps) {
    return (
        <div className="mx-auto flex h-[4.625rem] w-full max-w-[24.875rem] items-center justify-center rounded-[1.25rem] border-4 border-solid border-[#4A0E0F] bg-[#6E2627]">
            {children}
        </div>
    );
}

export default ChooseSubjectsWrapper;
