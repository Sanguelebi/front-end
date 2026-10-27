import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="bg-(--color-background) border-[2.5px] border-[#1a1a1a] rounded-2xl px-5 pt-3 pb-4 flex flex-col gap-1.5 w-full box-border">
      <label
        htmlFor={id}
        className="text-sm text-[#888] font-medium leading-none select-none"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="bg-transparent border-none outline-none text-[17px] text-[#1a1a1a] font-normal w-full p-0 leading-snug"
      />
    </div>
  );
};

export default Input;
