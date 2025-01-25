import Image from 'next/image';
import React from 'react';
import Gambar1 from '../../../public/audience-1853662_640 6.svg';

export default async function page() {
  return (
    <main className="px-4">
      <div className=" text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full z-10 flex flex-col py-48 md:py-36 lg:py-52 items-center justify-center absolute">
          <form className="h-full w-72 sm:w-1/2 lg:w-1/3">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search Event, Location"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className=" absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
        <Image
          src={Gambar1}
          alt="image"
          width={718}
          height={404}
          className="aspect-square md:aspect-auto h-[70vh] w-full object-center object-cover rounded-lg"
        />
      </div>
    </main>
  );
}
