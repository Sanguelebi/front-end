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
            className="bg-primary text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
            დაამატე საგანი
        </button>
    );
}

export default ChooseSubjectButton;
