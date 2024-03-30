"use client";
import { IMilestoneProps, IRow } from "@/app/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

export const MilestoneForm = ({ milestones, ...props }: IMilestoneProps) => {
  const [rows, setRows] = useState<IRow[]>([]);
  const t = useTranslations("Create Proposal");
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (rows.length === 0) {
      addRow();
    }
  }, [rows]);

  function addRow() {
    const random = Math.floor(Math.random() * 100000000);
    let key = "milestone-" + random;
    setRows([...rows, { key }]);
  }

  function removeRow(index: string) {
    if (index !== "default")
      setRows((current) => current.filter((_) => _.key !== index));
  }

  // add localized copy

  return (
    <fieldset>
      <p className="pb-6">{t("milestoneContext")}</p>
      {rows.map((row, index) => (
        <div key={row.key} className="flex mb-2">
          <div className="w-2/5">
            <label className="text-sm block">{t("title")}</label>
            <input
              {
                // @ts-ignore
                ...register(`milestones.${row.key}.title`)
              }
              className="border border-slate-300 rounded h-10 pl-2 mb-2"
              placeholder={t("title")}
            />
          </div>
          <div className="w-2/5">
            <label className="text-sm block pl-2">{t("budgetPlaceholder")}</label>
            {row.key !== "default" && (
              <input
                {
                  // @ts-ignore
                  ...register(`milestones.${row.key}.budget`)
                }
                className="border border-slate-300 rounded h-10 pl-2 mb-2 ml-2 w-full"
                placeholder={t("budgetPlaceholder")}
                type="number"
              />
            )}
            {row.key === "default" && (
              <input
                {
                  // @ts-ignore
                  ...register(`milestones.${row.key}.budget`)
                }
                className="border border-slate-300 rounded h-10 pl-2 mb-2 ml-2 w-full"
                placeholder={t("budgetPlaceholder")}
                type="number"
              />
            )}
          </div>
          {row.key !== "default" && (
            <XMarkIcon
              onClick={() => {
                unregister(`milestones.${row.key}.title`);
                unregister(`milestones.${row.key}.budget`);
                removeRow(row.key);
              }}
              className="h-6 ml-4 mt-7"
            />
          )}
        </div>
      ))}
      <p
        className="text-right underline mb-8 text-sky-600 mt-2 cursor-pointer"
        onClick={addRow}
      >
        Add Milestone
      </p>
    </fieldset>
  );
};
