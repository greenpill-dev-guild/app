"use client";
import { useRouter } from "next/navigation";
import { Path } from "../components/Path";

const paths = [
  {
    title: "Community",
    subtitle: "Your information will not be shared with the",
  },
  {
    title: "Donor",
    subtitle: "Your information will not be shared with the",
  },
  {
    title: "Admin",
    subtitle: "Your information will not be shared with the",
  },
];

export default function PathPage() {
  const router = useRouter();

  const selectPath = (title) => {
    router.push("/pathform?selectedPath=" + title);
  };

  return (
    <div className="w-full h-full px-4 py-10 flex flex-col items-center gap-10">
      <div className="w-full">
        <h1 className="font-semibold text-xl mb-1">Choose your Path</h1>
        <p className="text-xs font-light">
          Kindly select your path to proceed further!
        </p>
      </div>
      <div className="w-full rounded-3xl bg-white flex flex-col gap-5 px-4 py-6">
        {paths.map((item, index) => {
          return (
            <Path
              handleClick={() => selectPath(item.title)}
              key={index}
              title={item.title}
              subtitle={item.subtitle}
            />
          );
        })}
      </div>
      <p className="absolute bottom-0 pb-4 font-extralight text-xs">
        powered by <b>impact stream</b>
      </p>
    </div>
  );
}
