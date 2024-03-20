"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import { ProposalCard } from "../components/ProposalCard";

export default function PathPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const proposedGrants = [
    {
      title: "Well Project",
      location: "Bayelsa, Nigeria",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      owner: "John Doe",
    },
    {
      title: "Well Project",
      location: "Bayelsa, Nigeria",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      owner: "John Doe",
    },
    {
      title: "Well Project",
      location: "Bayelsa, Nigeria",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      owner: "John Doe",
    },
    {
      title: "Well Project",
      location: "Bayelsa, Nigeria",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      owner: "John Doe",
    },
    {
      title: "Well Project",
      location: "Bayelsa, Nigeria",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      owner: "John Doe",
    },
  ];

  return (
    <div className="w-full h-full px-4 py-24 flex flex-col items-center justify-center gap-5">
      <div className="w-full">
        <h1 className="font-semibold text-xl mb-1">
          {title ? title : "Proposed Grants"}
        </h1>
        {/* <p className="text-xs font-light">This step is optional!</p> */}
      </div>
      <div className="flex flex-col gap-5 items-center w-full">
        {proposedGrants.map((item, index) => {
          return (
            <ProposalCard
              key={index}
              title={item.title}
              description={item.description}
              location={item.location}
              owner={item.owner}
            />
          );
        })}
      </div>
      <div className="fixed bottom-0 py-4 font-extralight text-xs bg-[#ffffff90] backdrop-blur-2xl w-full flex flex-col items-center gap-3">
        <Button
          className="w-5/6 text-green-500 border border-green-500 text-lg"
          size="large"
        >
          Write a Proposal
        </Button>
        <p>
          powered by <b>impact stream</b>
        </p>
      </div>
    </div>
  );
}
