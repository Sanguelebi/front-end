interface ChooseSubjectButtonProps {
    hide?: boolean;
    onClick?: () => void;
}

function ChooseSubjectButton({ hide = false, onClick }: ChooseSubjectButtonProps) {
    if (hide) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className="h-[124px] w-[668px] max-w-full rounded-[40px] border-8 border-solid border-background bg-transparent text-5xl font-normal text-background cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150"
        >
            დაამატე საგანი
        </button>
    );
}

export default ChooseSubjectButton;
