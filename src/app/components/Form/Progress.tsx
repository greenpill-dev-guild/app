import { CheckIcon } from "lucide-react";
import React from "react";

interface FormProgressProps {
  currentStep: number;
  steps: string[];
}

export const FormProgress = ({ currentStep, steps }: FormProgressProps) => {
  return (
    <ul className="relative flex flex-row gap-x-2">
      {steps.map((step, index) => (
        <li
          key={step}
          className="flex flex-col justify-center items-center flex-1 group"
        >
          <div className="inline-flex items-center text-sm align-middle">
            <span
              className={`
                relative grid place-items-center w-9 h-9 font-medium rounded-full 
                transition-colors ease-in-out duration-300
                ${
                  currentStep > index + 1
                    ? "bg-teal-500"
                    : currentStep === index + 1
                      ? "bg-teal-500 text-white before:absolute before:-inset-1 before:bg-teal-200 before:rounded-full before:w-13 before:h-13 before:z-[-1] before:m-auto"
                      : "bg-slate-200 text-black"
                }
              `}
            >
              {currentStep > index + 1 ? (
                <CheckIcon className="w-5 h-5 text-white" />
              ) : (
                index + 1
              )}
            </span>
            <div
              className={`${currentStep > index + 1 ? "bg-teal-400" : "bg-slate-400"} ms-2 w-full h-px flex-1 group-last:hidden`}
            ></div>
          </div>
          <div className="mt-3">
            <span className={`block font-medium text-lg text-teal-600`}>
              {step}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
