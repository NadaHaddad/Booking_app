import { useState } from "react";
import Image from "../components/Image";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black text-white min-h-screen z-50 overflow-y-auto">
        <div className="p-8 flex flex-col items-center gap-4 max-w-3xl mx-auto">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index} className="w-full">
                <Image src={photo} alt="" className="w-full h-auto object-cover" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-2 rounded-3xl overflow-hidden h-[300px] sm:h-[400px] md:h-[700px]">
        <div className="relative">
          {place.photos?.[0] && (
            <div className="h-full">
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover w-full h-full"
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-2">
          {place.photos?.[1] && (
            <div className="h-full">
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover w-full h-full"
                src={place.photos[1]}
                alt=""
              />
            </div>
          )}
          {place.photos?.[2] && (
            <div className="h-full">
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover w-full h-full"
                src={place.photos[2]}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
