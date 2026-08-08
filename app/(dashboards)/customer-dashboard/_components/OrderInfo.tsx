export const OrderInfo = ({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f3f0]">
        <Icon className="h-4 w-4 text-[#3f7167]" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>

        {subValue && (
          <p className="mt-0.5 truncate text-xs text-slate-400">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
};