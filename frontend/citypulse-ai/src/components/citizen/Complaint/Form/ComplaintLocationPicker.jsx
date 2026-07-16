import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import configureLeafletDefaultIcon from "@/config/leaflet";
import mapUtils from "@/utils/mapUtils";

configureLeafletDefaultIcon();

const DEFAULT_POSITION = [17.385, 78.4867]; // Hyderabad

const LocationMarker = ({ position, onLocationSelected }) => {
  useMapEvents({
    async click(event) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;

      const address = (await mapUtils.reverseGeocode(latitude, longitude)) ?? "";

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
        const address = (await mapUtils.reverseGeocode(latitude, longitude)) ?? "";

        handleLocationSelected({ latitude, longitude, address });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <MapContainer
          center={position ?? DEFAULT_POSITION}
          zoom={13}
          scrollWheelZoom
          className="h-64 w-full sm:h-80 lg:h-[420px]"
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

      <button
        type="button"
        onClick={useCurrentLocation}
        disabled={locating}
        className="text-sm font-semibold text-blue-800 hover:underline disabled:opacity-60"
      >
        {locating ? "Locating..." : "Use my current location"}
      </button>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">Latitude</p>

          <p className="mt-1 font-semibold">{value.latitude ?? "--"}</p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">Longitude</p>

          <p className="mt-1 font-semibold">{value.longitude ?? "--"}</p>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Click anywhere on the map to select the complaint location, or use
        your current location. The address is filled in automatically and
        can be edited below if needed.
      </p>
    </div>
  );
};

export default ComplaintLocationPicker;
