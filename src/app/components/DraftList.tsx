import { IDraftListProps } from "@/app/types";
import { useRouter } from "next/navigation";

export const DraftList = ({ drafts }: IDraftListProps) => {
    const router = useRouter();

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-8"
    >
      {drafts.map((draft) => (
        <li
          key={draft.id}
          className="overflow-hidden underline text-blue-600"
          onClick={
            () => {
                router.push(`/grants/write/${draft.id}`);
              }
          }
        >
          {draft.title}
        </li>
      ))}
    </ul>
  );
};
