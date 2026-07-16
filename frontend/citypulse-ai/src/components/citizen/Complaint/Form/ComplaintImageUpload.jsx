import { ImagePlus, Upload, X } from "lucide-react";

const ComplaintImageUpload = ({ file, onFileChange }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    onFileChange(selectedFile);
  };

  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="complaint-image"
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 transition hover:border-blue-500 hover:bg-blue-50"
      >
        <ImagePlus size={48} className="mb-4 text-slate-500" />

        <p className="text-lg font-semibold text-slate-700">
          Upload Complaint Image
        </p>

        <p className="mt-2 text-sm text-slate-500">
          JPG, PNG or JPEG (Max 10 MB)
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white">
          <Upload size={18} />
          Choose Image
        </div>

        <input
          id="complaint-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">
          <div>
            <p className="font-medium text-slate-800">{file.name}</p>

            <p className="text-sm text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplaintImageUpload;
