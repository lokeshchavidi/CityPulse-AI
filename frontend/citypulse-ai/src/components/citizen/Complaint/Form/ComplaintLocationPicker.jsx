import { useEffect, useState } from "react";
import { LocateFixed } from "lucide-react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Button from "@/components/common/Button/Button";
import configureLeafletDefaultIcon from "@/config/leaflet";
import mapUtils from "@/utils/mapUtils";

configureLeafletDefaultIcon();

const DEFAULT_POSITION = [17.385, 78.4867]; // Hyderabad

const LocationMarker = ({ position, onLocationSelected }) => {
  useMapEvents({
    async click(event) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;

      const address =
        (await mapUtils.reverseGeocode(latitude, longitude)) ?? "";

      onLocationSelected({
        latitude,
        longitude,
        address,
      });
    },
  });

  if (!position) return null;

  return <Marker position={position} />;
};

const ComplaintLocationPicker = ({ value, onLocationChange }) => {
  const [position, setPosition] = useState(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (value.latitude && value.longitude) {
      setPosition([value.latitude, value.longitude]);
    }
  }, [value.latitude, value.longitude]);

  const handleLocationSelected = ({ latitude, longitude, address }) => {
    setPosition([latitude, longitude]);

    onLocationChange({
      latitude,
      longitude,
      address,
    });
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (geoPosition) => {
        const { latitude, longitude } = geoPosition.coords;
        const address =
          (await mapUtils.reverseGeocode(latitude, longitude)) ?? "";

        handleLocationSelected({ latitude, longitude, address });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const formatCoord = (coord) =>
    typeof coord === "number" ? coord.toFixed(6) : "—";

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <MapContainer
          center={position ?? DEFAULT_POSITION}
          zoom={13}
          scrollWheelZoom
          className="h-64 w-full sm:h-80 lg:h-[380px]"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker
            position={position}
            onLocationSelected={handleLocationSelected}
          />
        </MapContainer>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          loading={locating}
          leftIcon={<LocateFixed size={16} aria-hidden="true" />}
          onClick={useCurrentLocation}
          className="w-full sm:w-auto"
        >
          Use my current location
        </Button>

        <p className="text-xs leading-relaxed text-slate-500 sm:max-w-xs sm:text-right">
          Click the map to drop a pin. Address fills automatically and can be
          edited below.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-canvas px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Latitude
          </p>
          <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
            {formatCoord(value.latitude)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-canvas px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Longitude
          </p>
          <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
            {formatCoord(value.longitude)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintLocationPicker;
