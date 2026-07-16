import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/**
 * Vite bundles Leaflet's default marker images with hashed filenames, which
 * breaks Leaflet's built-in icon path lookup. This re-registers the default
 * marker icon with the correctly bundled asset URLs. Import this once
 * (e.g. from the location picker) before rendering any <MapContainer>.
 */
const configureLeafletDefaultIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
};

export default configureLeafletDefaultIcon;
