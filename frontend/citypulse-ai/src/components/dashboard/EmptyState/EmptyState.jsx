import LightPlate from "@/components/common/LightPlate";
import EmptyIllustration from "@/assets/illustrations/empty-state.svg";

const EmptyState = ({
  title = "No data available",
  description = "Nothing to display right now.",
  action = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <LightPlate padding="md" rounded="rounded-2xl">
        <img
          src={EmptyIllustration}
          alt=""
          className="w-48 max-w-full opacity-90"
          draggable={false}
        />
      </LightPlate>

      <h2 className="mt-5 text-lg font-semibold text-slate-900">{title}</h2>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
