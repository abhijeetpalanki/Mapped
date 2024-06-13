"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import eventsData from "../historicalEvents";
import { useState } from "react";

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

  const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null>(null);
  const [favourites, setFavourites] = useState<number[]>(() => {
    const savedFavourites = localStorage.getItem("favourites");

    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  const handleFavouriteClick = (eventId: number) => {
    let updatedFavourites = favourites.filter((id) => id !== eventId);

    if (!favourites.includes(eventId)) {
      updatedFavourites = [eventId, ...updatedFavourites];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const handleFavouritedListItemClick = (eventId: number) => {
    const event = eventsData.find((event) => event.id === eventId);

    if (event) {
      setActiveEvent(event);
    }
  };

  return (
    <div className="p-8 w-full h-full flex gap-6">
      <div className="flex flex-col w-4/5 h-full">
        <div className="h-12"></div>

        <MapContainer
          center={defaultPosition}
          zoom={13}
          className="w-full h-full relative rounded-2xl border-2 border-[#363636]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {eventsData.map((event) => (
            <Marker
              key={event.id}
              position={event.position}
              icon={icon}
              eventHandlers={{
                click: () => {
                  setActiveEvent(event);
                },
              }}
            />
          ))}
          {activeEvent && (
            <Popup position={activeEvent.position}>
              {/* Popup Inner */}
              <div className="text-xl">
                {/* Title */}
                {/* i.pt-[0.15rem].items-start.text-2xl */}
                <h2 className="relative font-bold mb-2 flex items-center gap-2 text-[#6fcf97] after:absolute after:content-[''] after:w-[35%] after:h-[2px] after:bg-[#6fcf97] after:-bottom-[14px] after:left-0">
                  {activeEvent.title}
                </h2>
              </div>
              {/* Description */}
              <p className="text-white text-lg">{activeEvent.description}</p>
              <button
                className="font-semibold !text-[#6fcf97] flex gap-2 items-center"
                onClick={() => handleFavouriteClick(activeEvent.id)}
              >
                <span className="flex items-center text-lg gap-2">
                  {favourites.includes(activeEvent.id) ? (
                    <span>{fullStar} Unfavourite</span>
                  ) : (
                    <span>{fullStar} Favourite</span>
                  )}
                </span>
              </button>
            </Popup>
          )}
        </MapContainer>
      </div>

      {/* Favourited Events */}
      <div className="liked-events flex-1 py-4 px-8 rounded-2xl bg-[#262626] shadow-[0_0_15px_rgba(0,0,0,0.1)] border-2 border-[#363636] text-white overflow-y-auto">
        <h2 className="font-bold flex  items-center text-2xl mb-4 gap-1">
          <i className="fa-solid fa-star" style={{ color: "#fdc401" }}></i>
          Favourited Events
        </h2>
        <ul className="">
          {favourites
            .map((id) => {
              return eventsData.find((event) => event.id === id);
            })
            .map((event) => {
              return (
                <li
                  className="p-4 mb-4 rounded-lg bg-[#454545] shadow-[0_0_15px_rgba(0,0,0,0.1)] font-medium text-white cursor-pointer"
                  key={event?.id}
                  onClick={() =>
                    handleFavouritedListItemClick(event?.id as number)
                  }
                >
                  <h3>{event?.title}</h3>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MapsWrapper;
