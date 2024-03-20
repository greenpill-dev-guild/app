import Image from "next/image";
import React from "react";

export const ProposalCard = ({
  title,
  voices,
  location,
  description,
  owner,
}) => {
  return (
    <div className="w-full flex flex-col p-4 rounded-2xl bg-white gap-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">{title}</h1>
        <div>
          <span>{voices}</span>
          <Image src="/thumbprint.svg" width={20} height={20} alt="vote" />
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <Image src="/location.svg" width={20} height={20} alt="location" />
        <span className="text-xs font-light">{location}</span>
      </div>
      <p className="text-xs text-[#555]">{description}</p>
      <p className="text-xs text-blue-500 underline underline-offset-2">
        {owner}
      </p>
    </div>
  );
};
