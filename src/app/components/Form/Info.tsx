import React from "react";

interface FormInfoProps {
  title: string;
  info: string;
  variant: "primary" | "secondary" | "tertiary";
}

const variants = {
  primary: "bg-blue-100 text-blue-700",
  secondary: "bg-green-100 text-green-700",
  tertiary: "bg-yellow-100 text-yellow-700",
};

export const FormInfo = ({ title, info, variant, ...props }: FormInfoProps) => {
  const variantClasses = variants[variant];

  return (
    <div
      className={`${variantClasses} p-4 rounded-lg mb-4 min-h-36`}
      {...props}
    >
      <h3 className="text-lg font-bold text-slate-600">{title}</h3>
      <p className="text-sm text-slate-400">{info}</p>
    </div>
  );
};
