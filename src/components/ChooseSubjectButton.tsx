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
            className="w-full py-3 text-lg font-bold text-background border-2 border-solid border-background rounded-2xl cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150"
        >
            დაამატე საგანი!
        </button>
    );
}

export default ChooseSubjectButton;
