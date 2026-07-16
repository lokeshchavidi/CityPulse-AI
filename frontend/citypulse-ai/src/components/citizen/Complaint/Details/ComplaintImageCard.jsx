import SectionCard from "@/components/dashboard/SectionCard";

const ComplaintImageCard = ({ complaint }) => {
  if (!complaint?.imageUrl) return null;

  return (
    <SectionCard
      title="Complaint Image"
      subtitle="Image uploaded by the citizen."
    >
      <img
        src={complaint.imageUrl}
        alt={complaint.title}
        className="
          h-[320px]
          w-full
          rounded-xl
          border
          border-slate-200
          object-cover
          lg:h-[420px]
        "
      />
    </SectionCard>
  );
};

export default ComplaintImageCard;
