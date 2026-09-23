import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, FilePlus2, ImagePlus, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

import Button from "@/components/common/Button/Button";
import SectionCard from "@/components/dashboard/SectionCard";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";

import ComplaintImageUpload from "./ComplaintImageUpload";
import ComplaintLocationPicker from "./ComplaintLocationPicker";

import complaintService from "@/services/complaintService";

const ComplaintForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    latitude: null,
    longitude: null,
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleLocationChange = ({ latitude, longitude, address }) => {
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
      address,
    }));

    if (errors.location) {
      setErrors((prev) => ({ ...prev, location: "" }));
    }
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.title.trim()) {
      validationErrors.title = "Complaint title is required.";
    } else if (formData.title.length > 150) {
      validationErrors.title = "Title cannot exceed 150 characters.";
    }

    if (!formData.description.trim()) {
      validationErrors.description = "Complaint description is required.";
    } else if (formData.description.length > 1000) {
      validationErrors.description =
        "Description cannot exceed 1000 characters.";
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Address is required.";
    }

    if (formData.latitude === null || formData.longitude === null) {
      validationErrors.location = "Please select a location on the map.";
    }

    if (!formData.image) {
      validationErrors.image = "A photo of the issue is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("address", formData.address);
      payload.append("latitude", formData.latitude);
      payload.append("longitude", formData.longitude);
      payload.append("image", formData.image);

      const complaint = await complaintService.createComplaint(payload);

      toast.success("Complaint submitted successfully.");

      navigate(`/citizen/complaints/${complaint.complaintId}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to submit complaint. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
        <Link
          to="/citizen/dashboard"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand-800"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to dashboard
        </Link>

        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
            <FilePlus2 size={20} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Create complaint
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
              Describe the issue, pin its location, and attach a clear photo so
              the right department can act quickly.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Details + photo share a row; map stays full-width below (avoids tall/short gap) */}
        <div className="grid items-stretch gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <SectionCard
              title="Complaint details"
              subtitle="Keep the title short and the description specific."
              className="h-full"
            >
              <div className="space-y-5">
                <div>
                  <Input
                    label="Complaint title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Large pothole on Main Road"
                    error={errors.title}
                    maxLength={150}
                  />
                  <p className="mt-1.5 text-right text-xs text-slate-400">
                    {formData.title.length}/150
                  </p>
                </div>

                <div>
                  <Textarea
                    label="Description"
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what you saw, when it started, and any risks to the public..."
                    error={errors.description}
                    maxLength={1000}
                  />
                  <p className="mt-1.5 text-right text-xs text-slate-400">
                    {formData.description.length}/1000
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="h-full xl:col-span-2">
            <SectionCard
              title="Photo evidence"
              subtitle="A clear image helps verification."
              className="flex h-full flex-col"
              bodyClassName="flex flex-1 flex-col"
              action={
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <ImagePlus size={14} aria-hidden="true" />
                  Required
                </span>
              }
            >
              <ComplaintImageUpload
                file={formData.image}
                onFileChange={handleImageChange}
                fill
              />

              {errors.image && (
                <p className="mt-3 text-sm text-red-600">{errors.image}</p>
              )}
            </SectionCard>
          </div>
        </div>

        <SectionCard
          title="Location"
          subtitle="Click the map or use your current location."
          action={
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <MapPin size={14} aria-hidden="true" />
              Required
            </span>
          }
        >
          <ComplaintLocationPicker
            value={formData}
            onLocationChange={handleLocationChange}
          />

          {errors.location && (
            <p className="mt-3 text-sm text-red-600">{errors.location}</p>
          )}

          <div className="mt-5">
            <Input
              label="Address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Street, landmark, or area"
              error={errors.address}
            />
          </div>
        </SectionCard>

        <div className="flex flex-col-reverse gap-3 rounded-xl border border-slate-200 bg-surface p-4 shadow-soft-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            Your report is routed after AI classification and manager review.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/citizen/dashboard" className="w-full sm:w-auto">
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              loading={submitting}
              leftIcon={<Send size={18} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              Submit complaint
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
