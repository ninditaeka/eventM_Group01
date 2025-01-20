'use client';

import React from 'react';
import Gambar1 from '../../../public/audience-1853662_640 6.svg';
import Link from 'next/link';
import Image from 'next/image';

const UpcomingEvent = () => {
  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold text-red-400 capitalize text-2xl md:text-4xl text-center">
        Upcoming Event
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-row-1 gap-16 mt-16">
        <div className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2 ">
          <Link
            href={'/#'}
            className="col-span-4 h-full rounded-xl overflow-hidden"
          >
            <Image
              src={Gambar1}
              alt="image"
              width={718}
              height={404}
              className="aspect-[4/3] h-full w-full object-center object-cover group-hover:scale-105 transition-all ease duration-300"
            />
          </Link>
          <div className="flex flex-col w-full mt-2">
            <Link href={'/#'} className="inline-block my-1">
              <h2 className=" font-semibold capitalize text-base sm:text-lg">
                <span
                  className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
              [background-size] duration-500"
                >
                  Music Fest 2025
                </span>
              </h2>
            </Link>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-3">
              A grand music festival featuring top bands and solo artists from
              around the world.
            </span>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-4">
              IDR 1,500,000
            </span>
          </div>
        </div>
        <div className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2 ">
          <Link
            href={'/#'}
            className="col-span-4 h-full rounded-xl overflow-hidden"
          >
            <Image
              src={Gambar1}
              alt="image"
              width={718}
              height={404}
              className="aspect-[4/3] h-full w-full object-center object-cover group-hover:scale-105 transition-all ease duration-300"
            />
          </Link>
          <div className="flex flex-col w-full mt-2">
            <Link href={'/'} className="inline-block my-1">
              <h2 className=" font-semibold capitalize text-base sm:text-lg">
                <span
                  className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
              [background-size] duration-500"
                >
                  Music Fest 2025
                </span>
              </h2>
            </Link>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-3">
              A grand music festival featuring top bands and solo artists from
              around the world.
            </span>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-4">
              IDR 1,500,000
            </span>
          </div>
        </div>
        <div className="group flex flex-col items-center text-dark shadow-md shadow-red-300 rounded-lg p-2 ">
          <Link
            href={'/'}
            className="col-span-4 h-full rounded-xl overflow-hidden"
          >
            <Image
              src={Gambar1}
              alt="image"
              width={718}
              height={404}
              className="aspect-[4/3] h-full w-full object-center object-cover group-hover:scale-105 transition-all ease duration-300"
            />
          </Link>
          <div className="flex flex-col w-full mt-2">
            <Link href={'/'} className="inline-block my-1">
              <h2 className=" font-semibold capitalize text-base sm:text-lg">
                <span
                  className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
              [background-size] duration-500"
                >
                  Music Fest 2025
                </span>
              </h2>
            </Link>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-3">
              A grand music festival featuring top bands and solo artists from
              around the world.
            </span>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-4">
              IDR 1,500,000
            </span>
          </div>
        </div>
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
