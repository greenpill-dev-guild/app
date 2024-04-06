"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { HomeIcon, PlusCircleIcon, UserCircleIcon } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  if (
    pathname.includes("proposals") ||
    pathname.includes("profile") ||
    pathname.includes("create")
  ) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 py-3 px-4 sm:px-6 lg:px-8 flex justify-around items-center">
        <Link
          href="/proposals"
          className="flex flex-col items-center text-gray-400 hover:text-white py-2 focus:outline-none focus:text-white"
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-sm mt-1">{t("link1")}</span>
        </Link>

        <Link
          href="/create/proposal"
          className="flex flex-col items-center text-gray-400 hover:text-white py-2 focus:outline-none focus:text-white"
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="text-sm mt-1">{t("link2")}</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center text-gray-400 hover:text-white py-2 focus:outline-none focus:text-white"
        >
          <UserCircleIcon className="h-6 w-6" />
          <span className="text-sm mt-1">{t("link3")}</span>
        </Link>
      </div>
    );
  }

  return null;
};
