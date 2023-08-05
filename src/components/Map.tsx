"use client";

import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";

const Map = () => {
  const [coord, setCoord] = useState<LatLngExpression>([-10.533773, -46.62529]);
  const [marks, setMarks] = useState<any[]>([]);
  const [photosModal, setPhotosModal] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchMarks() {
      const response = await fetch("/api/instagram/locations");
      const data = await response.json();
      console.log("data: ", data);
      setMarks(data.locations);
    }
    fetchMarks();
  }, []);

  const IconMarker = new Icon({
    iconUrl: MarkerIcon.src,
    iconRetinaUrl: MarkerIcon.src,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    shadowUrl: MarkerShadow.src,
    shadowSize: [41, 41],
  });

  const handleMarkerClick = async (event: any) => {
    const marker = event.target;
    const position = marker.getLatLng(); // This is a LatLng object
    const lat = position.lat;
    const lng = position.lng;

    const response = await fetch(
      `/api/instagram/photos/location?lat=${lat}&lng=${lng}`
    );
    const data = await response.json();
    setPhotosModal(data.photos);
    console.log("data.photos: ", data.photos);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Detalhes do Marcador
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {photosModal.length &&
                        photosModal.map((photo) => {
                          return photo.carousel_media.map((media: any) => {
                            return (
                              <div key={media.id}>
                                <Image
                                  className="h-auto max-w-full rounded-lg"
                                  src={media.local_url}
                                  alt=""
                                  width={media.original_width}
                                  height={media.original_height}
                                />
                              </div>
                            );
                          });
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MapContainer
        style={{
          height: "100vh",
          width: "100vw",
          zIndex: "1",
        }}
        center={coord}
        zoom={3.5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marks &&
          marks.map((mark, index) => (
            <Marker
              key={index}
              icon={IconMarker}
              position={[mark.lat, mark.lng]}
              eventHandlers={{ click: handleMarkerClick }}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
