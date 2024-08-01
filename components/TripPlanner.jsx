'use client'

import React from "react";
import { useEffect, useRef } from "react";


const render = (status) => {
  if (status === Status.LOADING) return <p>Loading...</p>;
  if (status === Status.FAILURE) return <p>Error loading maps</p>;
  return null;
};

  export default function TripPlanner() {


     const ref = useRef(null);

  useEffect(() => {
    let autocomplete;
    if (ref.current && !autocomplete) {
      autocomplete = new window.google.maps.places.Autocomplete(ref.current);
      autocomplete.setFields(["address_components", "geometry", "name"]);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          onPlaceSelected(place);
        } else {
          console.log("No details available for input: '" + place.name + "'");
        }
      });
    }
  }, [ref]);

  return <input ref={ref} type="text" placeholder="Search places" />;
};
function GooglePlacesAutocomplete() {
  const handlePlaceSelect = (place) => {
    console.log(place);
  };

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} render={render}>
      <div className="flex flex-col ">
        <div className="flex flex-row flex-wrap">
          <button className="inline-flex  mx-2 my-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-lg">
            ONE WAY
          </button>
          <button className="inline-flex mx-2  my-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-md text-lg">
            ROUND TRIP
          </button>
          <button className="inline-flex mx-2 my-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-md text-lg">
            LOCAL
          </button>
          <button className="inline-flex mx-2 my-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-md text-lg">
            AIRPORT
          </button>
        </div>
        <div className="flex flex-col ">
          <div className="relative ml-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <label
              htmlFor="hero-field"
              className="leading-7 text-sm text-gray-600">
              PICK UP
            </label>
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              onPlaceSelected={handlePlaceSelect}
              className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative ml-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <label
              htmlFor="hero-field"
              className="leading-7 text-sm text-gray-600">
              DESTINATION
            </label>
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative ml-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <label
              htmlFor="hero-field"
              className="leading-7 text-sm text-gray-600">
              PICK UP DATE
            </label>
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative ml-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <label
              htmlFor="hero-field"
              className="leading-7 text-sm text-gray-600">
              RETURN DATE
            </label>
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative ml-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <label
              htmlFor="hero-field"
              className="leading-7 text-sm text-gray-600">
              PICK UP TIME
            </label>
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="flex justify-center py-2">
          <button className="inline-flex mx-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-md text-lg">
            EXPLORE CABS
          </button>
        </div>
      </div>
    </Wrapper>
  );
  }
