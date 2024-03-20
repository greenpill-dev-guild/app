import Image from "next/image";
import React from "react";

export const Path = ({ title, subtitle, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="w-full bg-[#fafafa] rounded-2xl flex flex-row items-center justify-start active:border border-green-500 gap-2 p-2"
    >
      <Image src="/path.svg" alt={title} width={30} height={30} />
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-md active:text-green-500">
          {title}
        </span>
        <span className="font-light text-xs"> {subtitle} </span>
      </div>
    </div>
  );
};
