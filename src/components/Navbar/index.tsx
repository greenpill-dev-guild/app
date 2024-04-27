"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { HomeIcon, PlusCircleIcon, UserCircleIcon } from "lucide-react";

const linkClasses =
  "flex-1 flex flex-col items-center text-slate-800 hover:text-teal-700 py-2 focus:outline-none focus:text-teal-700";

export const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  if (
    pathname.includes("proposals") ||
    pathname.includes("profile") ||
    pathname.includes("create")
  ) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[4.5rem] shadow-sm bg-slate-50 font-medium border-t border-slate-100 rounded-t-md py-3 px-4 flex justify-around items-center w-full">
        <Link
          href="/proposals"
          className={`${linkClasses} ${pathname.includes("proposals") && "text-teal-800"}`}
        >
          <HomeIcon className="h-6 w-6" />
          <span className=" mt-1">{t("link1")}</span>
        </Link>
        <Link
          href="/create/proposal"
          className={`${linkClasses} ${pathname.includes("create") && "text-teal-800"}`}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className=" mt-1">{t("link2")}</span>
        </Link>
        <Link
          href="/profile"
          className={`${linkClasses} ${pathname.includes("profile") && "text-teal-800"}`}
        >
          <UserCircleIcon className="h-6 w-6" />
          <span className=" mt-1">{t("link3")}</span>
        </Link>
      </div>
    );
  }

  return null;
};
