import { Icon } from '@iconify/react';

interface CourseCardProps {
    title: string;
    instructor: string;
    category: string;
    image: string;
    onClick?: () => void;
}

function CourseCard({ title, instructor, category, image, onClick }: CourseCardProps) {
    return (
        <div className="flex flex-col gap-2 cursor-pointer group w-full max-w-xs" onClick={onClick}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex flex-col gap-0.5 px-0.5">
                <h3 className="text-[#1a1a1a] font-semibold text-sm leading-snug line-clamp-2">
                    {title}
                </h3>

                <div className="flex items-center gap-1.5 text-primary text-xs font-medium">
                    <Icon icon="mdi:account" className="text-primary w-3.5 h-3.5 shrink-0" />
                    <span>{instructor}</span>
                </div>

                <span className="text-[#888] text-xs">{category}</span>
            </div>
        </div>
    );
}

export default CourseCard;
