import React from "react";

type ButtonVariant = "primary" | "background";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-background",
  background: "bg-background text-primary",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`font-bold text-lg px-16 py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
