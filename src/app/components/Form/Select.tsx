import React from "react";
import Select from "react-tailwindcss-select";
import { SelectProps } from "react-tailwindcss-select/dist/components/type";

import { XIcon } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps extends SelectProps {
  label: string;
  placeholder: string;
  selected: SelectOption[];
  onRemove: (value: string) => void;
  helperText?: string;
}

export const FormSelect = ({
  label,
  selected,
  onRemove,
  helperText,
  ...props
}: FormSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-600 mb-2">
        {label}
      </label>
      {selected.length > 0 &&
        selected.map((option) => (
          <div
            key={option.value}
            className="border border-slate-400 rounded leading-8 text-xs px-2 font-bold inline-block mb-3"
          >
            <input type="hidden" value={option.value} />
            <div className="flex">
              {option?.label}
              <XIcon
                onClick={() => onRemove(option.value)}
                className="h-3 ml-2 mt-2.5 cursor-pointer"
              />
            </div>
          </div>
        ))}
      {props.options.length > 0 && (
        <>
          <Select {...props} primaryColor={"blue"} value={null} />
          <p className="text-sm center italic mt-6">{helperText}</p>
        </>
      )}
    </div>
  );
};
