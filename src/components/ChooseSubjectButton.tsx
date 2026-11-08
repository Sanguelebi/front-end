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
            className="w-full max-w-[280px] rounded-2xl border-[3px] border-solid border-background bg-transparent px-6 py-0.5 text-base font-normal text-background cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150"
        >
            დაამატე საგანი
        </button>
    );
}

export default ChooseSubjectButton;
