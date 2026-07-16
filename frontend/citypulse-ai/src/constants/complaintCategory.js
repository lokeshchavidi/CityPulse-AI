/**
 * Mirrors the backend's ComplaintCategory enum. Categories are assigned by
 * AI analysis (see AIAnalysisResponse.category) — citizens don't pick one
 * when filing a complaint.
 */
export const COMPLAINT_CATEGORY_LABELS = {
  ROADS_AND_INFRASTRUCTURE: "Roads & Infrastructure",
  GARBAGE_AND_SANITATION: "Garbage & Sanitation",
  DRAINAGE_AND_SEWAGE: "Drainage & Sewage",
  WATER_SUPPLY: "Water Supply",
  ELECTRICITY_AND_STREETLIGHTS: "Electricity & Streetlights",
  TRAFFIC_AND_TRANSPORT: "Traffic & Transport",
  PUBLIC_PROPERTY_DAMAGE: "Public Property Damage",
  ENVIRONMENTAL_ISSUES: "Environmental Issues",
  ILLEGAL_ACTIVITY: "Illegal Activity",
  ANIMAL_RELATED: "Animal Related",
  FIRE_AND_EMERGENCY: "Fire & Emergency",
  FLOODING: "Flooding",
  HEALTH_AND_HYGIENE: "Health & Hygiene",
  PARKS_AND_RECREATION: "Parks & Recreation",
  ENCROACHMENT: "Encroachment",
  OTHER: "Other",
};

export const getCategoryLabel = (category) =>
  COMPLAINT_CATEGORY_LABELS[category] ?? category ?? "Uncategorized";

export default COMPLAINT_CATEGORY_LABELS;
