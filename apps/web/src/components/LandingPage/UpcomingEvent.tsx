'use client';

import React from 'react';
import Gambar2 from '../../../public/Sporting Activities Image1.jpeg';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getEventList } from '@/services/event';

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const eventsData = await getEventList();
    setEvents(eventsData.slice(0, 3));
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold text-red-400 capitalize text-2xl md:text-4xl text-center">
        Upcoming Event
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-row-1 gap-16 mt-16 m-2">
        {events.map((item: any, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2 "
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
                <h2 className=" font-semibold capitalize text-base sm:text-lg">
                  <span
                    className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
              [background-size] duration-500"
                  >
                    {item.title}
                  </span>
                </h2>
              </Link>
              <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-2">
                {item.description}
              </span>
              <span className=" capitalize text-dark/50 font-medium text-sm sm:text-base mt-4">
                {item.price === 0
                  ? 'Free'
                  : `IDR ${item.price.toLocaleString()}`}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="events"
        className="w-fit mt-10 ml-auto font-medium text-base md:text-lg p-2 bg-red-400 border hover:bg-red-500 rounded-lg shadow text-center text-white"
      >
        view all
      </Link>
    </section>
  );
};

export default UpcomingEvent;
