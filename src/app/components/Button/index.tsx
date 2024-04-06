import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  label: string;
  style?: "solid" | "soft" | "outline" | "ghost";
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  Icon?: LucideIcon;
  onClick?: () => void;
}

const sizes = {
  small: "py-2 px-3",
  medium: "py-3 px-4",
  large: "p-4 sm:p-5",
};

const variantColors = {
  primary: "teal",
  secondary: "green",
  tertiary: "blue",
};

function generateStyles(variant: "primary" | "secondary" | "tertiary") {
  return {
    solid: `border-transparent bg-${variantColors[variant]}-500 text-white hover:bg-${variantColors[variant]}-600`,
    soft: `border-transparent bg-${variantColors[variant]}-100 text-${variantColors[variant]}-800 hover:bg-${variantColors[variant]}-200  dark:hover:bg-${variantColors[variant]}-900 dark:text-${variantColors[variant]}-500 dark:hover:text-${variantColors[variant]}-400`,
    outline: `border-${variantColors[variant]}-500 text-${variantColors[variant]}-500 hover:border-${variantColors[variant]}-400 hover:text-${variantColors[variant]}-400 `,
    ghost: `border-transparent text-${variantColors[variant]}-500 hover:bg-${variantColors[variant]}-100 hover:text-${variantColors[variant]}-800  dark:hover:bg-${variantColors[variant]}-800/30 dark:hover:text-${variantColors[variant]}-400`,
  };
}

export const Button = ({
  label,
  style = "solid",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  Icon,
  ...props
}: ButtonProps) => {
  const sizeClasses = sizes[size];
  const styleClasses = generateStyles(variant)[style];

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        ${sizeClasses} ${styleClasses} ${fullWidth ? "w-full" : ""}
        inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg
        border disabled:pointer-events-none disabled:opacity-50
      `}
      {...props}
    >
      {label}
      {Icon && <Icon className="flex-shrink-0 size-4" />}
      {loading && (
        <span
          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></span>
      )}
    </button>
  );
};
