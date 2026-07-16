import EmptyIllustration from "@/assets/illustrations/empty-state.svg";

const EmptyState = ({
  title = "No Data Available",
  description = "Nothing to display right now.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img src={EmptyIllustration} alt="Empty" className="w-64 max-w-full" />

      <h2 className="mt-6 text-2xl font-semibold text-slate-900">{title}</h2>

      <p className="mt-3 max-w-md text-slate-500">{description}</p>
    </div>
  );
};

export default EmptyState;
