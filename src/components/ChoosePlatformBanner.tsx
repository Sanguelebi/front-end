import type { SubjectType } from '@/models/api';

interface ChoosePlatformBannerProps {
    selectedType: SubjectType;
    onSelectType: (type: SubjectType) => void;
}

function ChoosePlatformBanner({ selectedType, onSelectType }: ChoosePlatformBannerProps) {
    return (
        <div className="relative text-center">
            <img className="w-full" src="/choose.svg" alt="choose" />

            <div className="w-full absolute top-[25%] left-0 translate-y-[-50%] text-center text-3xl md:text-6xl font-bold text-white mt-6 md:mt-10 px-4">
                <h1>საგნების არჩევის სივრცე</h1>
            </div>
            <div className="w-full absolute top-[30%] left-0 translate-y-[-50%] text-center text-lg md:text-2xl text-white mt-14 md:mt-20 px-4">
                <h3>თქვენი თავისუფალი არჩევანი</h3>
            </div>
            <div className="flex flex-row justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] gap-4 md:gap-7">
                <button
                    type="button"
                    onClick={() => onSelectType('free')}
                    className={`px-5 py-3 md:p-4 text-center border-2 border-white rounded-md font-semibold transition-all cursor-pointer ${
                        selectedType === 'free'
                            ? 'bg-white text-primary shadow-lg'
                            : 'bg-transparent text-white hover:bg-white/15'
                    }`}
                >
                    თავისუფალი კრედიტი
                </button>
                <button
                    type="button"
                    onClick={() => onSelectType('professional')}
                    className={`px-5 py-3 md:p-4 text-center border-2 border-white rounded-md font-semibold transition-all cursor-pointer ${
                        selectedType === 'professional'
                            ? 'bg-white text-primary shadow-lg'
                            : 'bg-transparent text-white hover:bg-white/15'
                    }`}
                >
                    პროფესიული არჩევითი
                </button>
            </div>
        </div>
    );
}

export default ChoosePlatformBanner;
