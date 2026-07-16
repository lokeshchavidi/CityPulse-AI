import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

import Button from "@/components/common/Button/Button";
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
      validationErrors.description = "Description cannot exceed 1000 characters.";
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
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Complaint</h1>

        <p className="mt-2 text-slate-600">
          Report civic issues by providing accurate details and location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">
            Complaint Information
          </h2>

          <div className="space-y-6">
            <Input
              label="Complaint Title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Large pothole on Main Road"
              error={errors.title}
            />

            <Textarea
              label="Description"
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue clearly..."
              error={errors.description}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <MapPin size={22} />
            Location
          </h2>

          <ComplaintLocationPicker
            value={formData}
            onLocationChange={handleLocationChange}
          />

          {errors.location && (
            <p className="mt-3 text-sm text-red-600">{errors.location}</p>
          )}

          <div className="mt-6">
            <Input
              label="Address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Selected address"
              error={errors.address}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Upload Evidence</h2>

          <ComplaintImageUpload
            file={formData.image}
            onFileChange={handleImageChange}
          />

          {errors.image && (
            <p className="mt-3 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={submitting}
            leftIcon={<Send size={18} />}
          >
            Submit Complaint
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
