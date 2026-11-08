import { useState } from 'react';
import ChoosePlatformBanner from '@/components/ChoosePlatformBanner';
import MainModal from '@/components/MainModal';
import ChooseSubjectButton from '@/components/ChooseSubjectButton';

function ChoosePlatform() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const demoCourses = [
        { id: 1, name: 'საგანი', lecturer: 'დავით კურცხალია' },
        { id: 2, name: 'საგანი', lecturer: 'დავით კურცხალია' },
        { id: 3, name: 'საგანი', lecturer: 'დავით კურცხალია' },
    ];

    return (
        <>
            <main className="bg-background min-h-screen">
                <ChoosePlatformBanner />
                <div className="flex justify-center my-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    >
                        მოდალის გახსნა
                    </button>
                </div>
                {/* Main Modal */}
                <MainModal
                    title="აირჩიე საგანი"
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    child={
                        <div className="flex flex-col gap-4">
                            {demoCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between bg-[#FDEACC] border-[2.5px] border-[#9c784e] rounded-2xl px-6 py-4 shadow-sm"
                                >
                                    <span className="font-bold text-lg text-[#3a2010]">
                                        {course.name}
                                    </span>
                                    <span className="font-bold text-base text-[#3a2010]">
                                        {course.lecturer}
                                    </span>
                                    <button
                                        type="button"
                                        className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all shadow cursor-pointer text-sm"
                                    >
                                        აირჩიე
                                    </button>
                                </div>
                            ))}
                        </div>
                    }
                />
                <div className="mx-auto my-8 flex w-full max-w-[400px] justify-center rounded-[20px] border-8 border-solid border-[#4A0E0F] bg-[#6E2627] p-6">
                    <ChooseSubjectButton
                        onClick={() => {
                            console.log('working');
                        }}
                    />
                </div>
            </main>
        </>
    );
}

export default ChoosePlatform;
