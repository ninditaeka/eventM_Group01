// import Image from 'next/image';
// import React from 'react';
// import Gambar1 from '../../../public/audience-1853662_640 6.svg';

// export default async function page() {
//   return (
//     <main className="px-4">
//       <div className=" text-center relative w-full h-[70vh] bg-dark">
//         <div className="w-full z-10 flex flex-col py-48 md:py-36 lg:py-52 items-center justify-center absolute">
//           <form className="h-full w-72 sm:w-1/2 lg:w-1/3">
//             <label
//               htmlFor="default-search"
//               className="mb-2 text-sm font-medium text-gray-900 sr-only"
//             >
//               Search
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="search"
//                 id="default-search"
//                 className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
//                 placeholder="Search Event, Location"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="text-white absolute end-2.5 bottom-2.5 bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2"
//               >
//                 Search
//               </button>
//             </div>
//           </form>
//         </div>
//         <div className=" absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
//         <Image
//           src={Gambar1}
//           alt="image"
//           width={718}
//           height={404}
//           className="aspect-square md:aspect-auto h-[70vh] w-full object-center object-cover rounded-lg"
//         />
//       </div>
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Gambar1 from '../../../public/audience-1853662_640 6.svg';
import { searchEvents } from '../../services/event';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // New state to track search attempts

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true); // Mark search as attempted

    try {
      const data = await searchEvents(query);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-4">
      {/* Search Bar */}
      <div className="text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full z-10 flex flex-col py-48 md:py-36 lg:py-52 items-center justify-center absolute">
          <form
            className="h-full w-72 sm:w-1/2 lg:w-1/3"
            onSubmit={handleSearch}
          >
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search Event, Location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
        <Image
          src={Gambar1}
          alt="image"
          width={718}
          height={404}
          className="aspect-square md:aspect-auto h-[70vh] w-full object-center object-cover rounded-lg"
        />
      </div>

      {/* Search Results */}
      <div className="mt-8">
        {error && <p className="text-center text-red-500">{error}</p>}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {hasSearched && results.length === 0 && !loading && (
          <p className="text-center text-gray-500">No events found.</p>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-16 m-2">
            {results.map((item: any, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2"
              >
                <a
                  href={`/event-details/${item.id}`}
                  className="col-span-4 h-full rounded-xl overflow-hidden"
                >
                  <Image
                    src={item.image || Gambar1}
                    alt={item.title}
                    width={718}
                    height={404}
                    className="aspect-[4/3] h-full w-full rounded-xl object-center object-cover group-hover:scale-110 transition-all ease duration-300"
                  />
                </a>
                <div className="flex flex-col w-full m-2 px-4">
                  <a
                    href={`/event-details/${item.id}`}
                    className="inline-block my-1"
                  >
                    <h2 className="font-semibold capitalize text-base sm:text-lg">
                      <span
                        className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
                        group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
                        [background-size] duration-500"
                      >
                        {item.title}
                      </span>
                    </h2>
                  </a>
                  <span className="capitalize text-dark/50 font-light text-sm sm:text-base mt-2">
                    {item.location}
                  </span>
                  <span className="capitalize text-dark/50 font-light text-sm sm:text-base mt-2">
                    {new Date(item.date).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="capitalize text-dark/50 font-medium text-sm sm:text-base mt-4">
                    {item.price === 0
                      ? 'Free'
                      : `IDR ${item.price.toLocaleString()}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
