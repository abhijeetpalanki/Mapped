"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import eventsData from "../historicalEvents";

export interface HistoricalEvent {
  id: number;
  title: string;
  description: string;
  position: [number, number];
  category: string;
}

const defaultPosition: [number, number] = [51.505, -0.09];

const emptyStar = <i className="fa-regular fa-star"></i>;
const fullStar = (
  <i
    className="fa-solid fa-star"
    style={{ color: "#fdc401", marginTop: "-3px" }}
  ></i>
);

const MapsWrapper = () => {
  const icon: Icon = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="p-8 w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="h-12"></div>

        <MapContainer
          center={defaultPosition}
          zoom={13}
          className="w-full h-full relative rounded-2xl border-2 border-[#363636]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {eventsData.map((event) => (
            <Marker key={event.id} position={event.position} icon={icon}>
              <Popup>
                {/* Popup Inner */}
                <div className="text-xl">
                  {/* Title */}
                  {/* i.pt-[0.15rem].items-start.text-2xl */}
                  <h2 className="relative font-bold mb-2 flex items-center gap-2 text-[#6fcf97] after:absolute after:content-[''] after:w-[35%] after:h-[2px] after:bg-[#6fcf97] after:-bottom-[14px] after:left-0">
                    {event.title}
                  </h2>
                </div>
                {/* Description */}
                <p className="text-white text-lg">{event.description}</p>
                <button className="font-semibold !text-[#6fcf97] flex gap-2 items-center">
                  <span className="flex items-center text-lg gap-2">
                    {emptyStar}
                    Favorite
                  </span>
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapsWrapper;
