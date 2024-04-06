import React, { InputHTMLAttributes } from "react";

interface FormTextProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  rows: number;
  label: string;
  helperText?: string;
}

export const FormText = ({
  rows,
  label,
  helperText,
  ...props
}: FormTextProps) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={props.id}
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        rows={rows}
        {...props}
      ></textarea>
      <p className="text-xs text-gray-500 mt-2" id={`${props.id}-helper-text`}>
        {helperText}
      </p>
    </div>
  );
};
