import { ImagePlus, Upload, X } from "lucide-react";

const ComplaintImageUpload = ({ file, onFileChange, fill = false }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    onFileChange(selectedFile);
  };

  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <div className={`space-y-4 ${fill ? "flex h-full min-h-0 flex-1 flex-col" : ""}`}>
      <label
        htmlFor="complaint-image"
        className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-canvas px-6 py-10 text-center transition hover:border-brand-500 hover:bg-brand-50/40 ${
          fill ? "min-h-[220px] flex-1" : ""
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-800 transition group-hover:bg-brand-100">
          <ImagePlus size={22} aria-hidden="true" />
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-800">
          Upload complaint photo
        </p>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          JPG or PNG, up to 10 MB
        </p>

        <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft-sm transition group-hover:bg-brand-800">
          <Upload size={16} aria-hidden="true" />
          Choose image
        </span>

        <input
          id="complaint-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {file.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB selected
            </p>
          </div>

          <button
            type="button"
            onClick={removeFile}
            aria-label="Remove selected image"
            className="shrink-0 rounded-lg p-2 text-red-600 transition hover:bg-red-100"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplaintImageUpload;
