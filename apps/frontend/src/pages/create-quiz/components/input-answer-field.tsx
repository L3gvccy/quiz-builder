import React from "react";

interface InputAnswerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const InputAnswerField = ({ value, onChange }: InputAnswerFieldProps) => {
  return (
    <div className="mt-5">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Correct text answer
      </label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter correct answer"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
      />
    </div>
  );
};

export default InputAnswerField;
