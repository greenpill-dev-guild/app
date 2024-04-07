import React from "react";

interface FormProgressProps {
  currentStep: number;
  steps: string[];
}

export const FormProgress = ({ currentStep, steps }: FormProgressProps) => {
  return (
    <ul className="relative flex flex-row gap-x-2">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col justify-center flex-1 group">
          <div className="w-full inline-flex items-center text-sm align-middle">
            <span className="grid place-items-center w-8 h-8 bg-gray-300 font-medium text-gray-800 rounded-full">
              {currentStep >= index + 1 ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                index + 1
              )}
            </span>
            <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
          </div>
          <div className="mt-3">
            <span className="block font-medium text-gray-800">{step}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
