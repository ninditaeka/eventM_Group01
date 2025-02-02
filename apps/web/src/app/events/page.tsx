'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { getEventList } from '@/services/event';

const ITEMS_PER_PAGE = 6;
const CATEGORIES = [
  'All',
  'sport',
  'festival',
  'food & drink',
  'conference',
  'concert',
];

const EventList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allEvents, setAllEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Read category from URL query params
  const categoryFromQuery = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);

  // Fetch events when category or page changes
  useEffect(() => {
    getEvents(selectedCategory);
  }, [selectedCategory]);

  const getEvents = async (category: string) => {
    // const eventsData = await getEventList(
    //   category === 'All' ? undefined : category,
    // );
    const queryParams = category === 'All' ? undefined : category;
    const eventsData = await getEventList(queryParams);
    setAllEvents(eventsData.data);
  };

  // Function to update query params when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category === 'All') {
      router.push('/events', { scroll: false });
    } else {
      router.push(`/events?category=${category}`, { scroll: false });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(allEvents?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = allEvents?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <article className="m-2 px-4">
      <div className="w-full mb-8 text-center bg-red-400 rounded-lg z-10 py-28 items-center justify-center relative">
        <h1 className="text-5xl font-bold text-white">Events</h1>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <div className="flex border-b border-gray-300">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 text-sm font-medium border-b-2 transition-all duration-300 ${
                selectedCategory === category
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-row-1 gap-16 mt-16 m-2">
        {paginatedEvents?.map((item: any, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2"
          >
            <Link
              href={'/event-details/' + item.id}
              className="col-span-4 h-full rounded-xl overflow-hidden"
            >
              <img
                src={`data:image/png;base64,${item?.image}`}
                alt="image"
                width={718}
                height={404}
                className="aspect-[4/3] h-full w-full rounded-xl object-center object-cover group-hover:scale-110 transition-all ease duration-300"
              />
            </Link>
            <div className="flex flex-col w-full m-2 px-4">
              <Link
                href={'/event-details/' + item.id}
                className="inline-block my-1"
              >
                <h2 className="font-semibold capitalize text-base sm:text-lg">
                  <span className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                    {item.title}
                  </span>
                </h2>
              </Link>
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

      {/* Pagination */}
      <nav aria-label="Page navigation" className="flex justify-end my-16 mx-4">
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
    </article>
  );
};

export default EventList;
