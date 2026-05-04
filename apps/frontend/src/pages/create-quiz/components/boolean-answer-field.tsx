interface BooleanAnswerFieldProps {
  questionIndex: number;
  value: "true" | "false";
  onChange: (questionIndex: number, value: "true" | "false") => void;
}

const BooleanAnswerField = ({
  questionIndex,
  value,
  onChange,
}: BooleanAnswerFieldProps) => {
  return (
    <div className="mt-5">
      <p className="mb-3 text-sm font-medium text-slate-700">Correct answer</p>

      <div className="flex flex-wrap gap-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-violet-300">
          <input
            type="radio"
            name={`boolean-${questionIndex}`}
            checked={value === "true"}
            onChange={() => onChange(questionIndex, "true")}
            className="accent-violet-600"
          />
          True
        </label>

        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-violet-300">
          <input
            type="radio"
            name={`boolean-${questionIndex}`}
            checked={value === "false"}
            onChange={() => onChange(questionIndex, "false")}
            className="accent-violet-600"
          />
          False
        </label>
      </div>
    </div>
  );
};

export default BooleanAnswerField;
