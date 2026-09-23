import { ImageOff } from "lucide-react";

const ComplaintImageCard = ({ complaint }) => {
  if (!complaint?.imageUrl) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-canvas px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
          <ImageOff size={22} aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-700">No image attached</p>
        <p className="mt-1 text-xs text-slate-500">
          This complaint was submitted without a photo.
        </p>
      </div>
    );
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-soft-sm">
      <div className="bg-canvas">
        <img
          src={complaint.imageUrl}
          alt={complaint.title || "Complaint evidence"}
          className="mx-auto max-h-[420px] w-full object-contain lg:max-h-[480px]"
        />
      </div>
      <figcaption className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
        Evidence submitted with this complaint
      </figcaption>
    </figure>
  );
};

export default ComplaintImageCard;
