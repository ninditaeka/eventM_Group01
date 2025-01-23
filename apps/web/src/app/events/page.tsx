'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Gambar1 from '../../../public/audience-1853662_640 6.svg';
import Link from 'next/link';
import Gambar2 from '../../../public/Sporting Activities Image1.jpeg';
import { getEventList } from '@/services/event';

const ITEMS_PER_PAGE = 6;

const EventList = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getEvents = async () => {
    const eventsData = await getEventList();
    setAllEvents(eventsData);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const totalPages = Math.ceil(allEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = allEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <article className="m-2 px-4">
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full z-10 flex flex-col py-28 items-center justify-center absolute">
          <h1 className="inline-block mt-16 md:mt-24 font-bold capitalize text-white text-2xl md:text-6xl leading-normal relative w-5/6">
            EVENTS
          </h1>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
        <Image
          src={Gambar1}
          alt="image"
          width={718}
          height={404}
          className="aspect-square h-full w-full object-center object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-row-1 gap-16 mt-16 m-2">
        {paginatedEvents.map((item: any, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2"
          >
            <Link
              href={'/event-details/' + item.id}
              className="col-span-4 h-full rounded-xl overflow-hidden"
            >
              <Image
                src={Gambar2}
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
                  <span
                    className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
                    group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
                    [background-size] duration-500"
                  >
                    {item.title}
                  </span>
                </h2>
              </Link>
              <span className="capitalize text-dark/50 font-light text-sm sm:text-base mt-2">
                {item.description}
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

// 'use client';

// import Image from 'next/image';
// import React from 'react';
// import Gambar1 from '../../../public/audience-1853662_640 6.svg';
// import Link from 'next/link';
// import Gambar2 from '../../../public/Sporting Activities Image1.jpeg';
// import { useState, useEffect } from 'react';
// import { getEventList } from '@/services/event';

// const EventList = () => {
//   const [events, setEvents] = useState([]);

//   const getEvents = async () => {
//     const eventsData = await getEventList();
//     setEvents(eventsData);
//   };

//   useEffect(() => {
//     getEvents();
//   }, []);

//   return (
//     <article className="m-2 px-4">
//       <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
//         <div className="w-full z-10 flex flex-col py-28 items-center justify-center absolute">
//           <h1 className="inline-block mt-16 md:mt-24 font-bold capitalize text-white text-2xl md:text-6xl leading-normal relative w-5/6">
//             EVENTS
//           </h1>
//         </div>
//         <div className=" absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
//         <Image
//           src={Gambar1}
//           alt="image"
//           width={718}
//           height={404}
//           className="aspect-square h-full w-full object-center object-cover rounded-lg"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-row-1 gap-16 mt-16 m-2">
//         {events.map((item: any, index) => (
//           <div
//             key={index}
//             className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2 "
//           >
//             <Link
//               href={'/event-details/' + item.id}
//               className="col-span-4 h-full rounded-xl overflow-hidden"
//             >
//               <Image
//                 src={Gambar2}
//                 alt="image"
//                 width={718}
//                 height={404}
//                 className="aspect-[4/3] h-full w-full rounded-xl object-center object-cover group-hover:scale-110 transition-all ease duration-300"
//               />
//             </Link>
//             <div className="flex flex-col w-full m-2 px-4">
//               <Link
//                 href={'/event-details/' + item.id}
//                 className="inline-block my-1"
//               >
//                 <h2 className=" font-semibold capitalize text-base sm:text-lg">
//                   <span
//                     className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
//               group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
//               [background-size] duration-500"
//                   >
//                     {item.title}
//                   </span>
//                 </h2>
//               </Link>
//               <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-2">
//                 {item.description}
//               </span>
//               <span className=" capitalize text-dark/50 font-medium text-sm sm:text-base mt-4">
//                 {item.price === 0
//                   ? 'Free'
//                   : `IDR ${item.price.toLocaleString()}`}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <nav
//         aria-label="Page navigation example"
//         className="flex justify-end my-16 mx-4"
//       >
//         <ul className="inline-flex -space-x-px text-base h-10">
//           <li>
//             <a
//               href="#"
//               className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//             >
//               Previous
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//             >
//               1
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//             >
//               2
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               aria-current="page"
//               className="flex items-center justify-center px-4 h-10 text-red-500 border border-gray-300 bg-red-50 hover:bg-red-100 hover:text-red-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//             >
//               3
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               aria-current="page"
//               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
//             >
//               4
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               aria-current="page"
//               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
//             >
//               5
//             </a>
//           </li>

//           <li>
//             <a
//               href="#"
//               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//             >
//               Next
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </article>
//   );
// };

// export default EventList;
