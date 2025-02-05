'use client';

import { useState } from 'react';
import Image from 'next/image';
import Gambar1 from '../../../public/audience-1853662_640 6.svg';
import noResultImg from '../../../public/no-result.png';
import { searchEvents } from '../../services/event';

const ITEMS_PER_PAGE = 6;

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
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

      setResults(data?.data);
    } catch (err) {
      setError('Failed to fetch events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = results.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
          <div>
            <Image
              src={noResultImg}
              alt="No Search Result"
              className="w-64 mx-auto"
              width={718}
              height={404}
            />
            <p className="text-center text-gray-500">
              Sorry there are no event for this search. Please try another
              phrase.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="w-full mt-10 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
            <h2 className="w-full inline-block font-bold text-red-400 capitalize text-2xl md:text-2xl text-left mx-4">
              "{query}" Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-10 m-2">
              {paginatedEvents.map((item: any, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2"
                >
                  <a
                    href={`/event-details/${item.id}`}
                    className="col-span-4 h-full rounded-xl overflow-hidden"
                  >
                    <img
                      src={`data:image/png;base64,${item?.image}`}
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
            <nav
              aria-label="Page navigation"
              className="flex justify-end my-16 mx-4"
            >
              <ul className="inline-flex -space-x-px text-base h-10">
                <li>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => goToPage(index + 1)}
                      className={`flex items-center justify-center px-4 h-10 leading-tight ${
                        currentPage === index + 1
                          ? 'text-red-500 border border-gray-300 bg-red-50 hover:bg-red-100 hover:text-red-600'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </main>
  );
}
