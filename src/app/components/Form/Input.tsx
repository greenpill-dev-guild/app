import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export const FormInput = ({
  label,
  helperText,
  className,
  ...props
}: FormInputProps) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-bold text-slate-600">{label}</h3>
      <input
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        {...props}
      />
      <label
        htmlFor={props.id}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {props.placeholder}
      </label>
      <input
        {...props}
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        aria-describedby="input-helper-text"
      />
      <p className="text-sm text-gray-500 mt-2" id="input-helper-text">
        {helperText}
      </p>
    </div>
  );
};
