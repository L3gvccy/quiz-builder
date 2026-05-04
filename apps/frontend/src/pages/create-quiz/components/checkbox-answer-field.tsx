import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { AnswerOption } from "../types";

interface CheckboxOptionsFieldProps {
  options: AnswerOption[];
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
  onOptionTextChange: (optionIndex: number, value: string) => void;
  onOptionCorrectChange: (optionIndex: number, checked: boolean) => void;
}

const CheckboxOptionsField = ({
  options,
  onAddOption,
  onRemoveOption,
  onOptionTextChange,
  onOptionCorrectChange,
}: CheckboxOptionsFieldProps) => {
  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-700">Answer options</p>

        <button
          type="button"
          onClick={onAddOption}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-100"
        >
          <Plus size={16} />
          Add option
        </button>
      </div>

      <div className="space-y-3">
        {options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className="grid gap-3 md:grid-cols-[1fr_auto_auto]"
          >
            <input
              value={option.text}
              onChange={(event) =>
                onOptionTextChange(optionIndex, event.target.value)
              }
              placeholder={`Option ${optionIndex + 1}`}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
            />

            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-violet-300">
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(event) =>
                  onOptionCorrectChange(optionIndex, event.target.checked)
                }
                className="accent-violet-600"
              />
              Correct
            </label>

            {options.length > 2 && (
              <button
                type="button"
                onClick={() => onRemoveOption(optionIndex)}
                className="inline-flex items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-red-500 transition hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxOptionsField;
