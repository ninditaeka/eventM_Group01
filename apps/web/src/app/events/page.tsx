'use client';

import Image from 'next/image';
import React from 'react';
import Gambar1 from '../../../public/audience-1853662_640 6.svg';
import Link from 'next/link';
import Gambar2 from '../../../public/Sporting Activities Image1.jpeg';

const EventList = () => {
  return (
    <article className="m-2 px-4">
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full z-10 flex flex-col py-28 items-center justify-center absolute">
          <h1 className="inline-block mt-16 md:mt-24 font-bold capitalize text-white text-2xl md:text-6xl leading-normal relative w-5/6">
            EVENTS
          </h1>
        </div>
        <div className=" absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
        <Image
          src={Gambar1}
          alt="image"
          width={718}
          height={404}
          className="aspect-square h-full w-full object-center object-cover rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-row-1 gap-16 mt-16 m-2">
        <div className="group flex flex-col items-center text-dark shadow-md shadow-pink-300 rounded-lg p-2 ">
          <Link
            href={'/event-details/id'}
            className="col-span-4 h-full rounded-xl overflow-hidden"
          >
            <Image
              src={Gambar2}
              alt="image"
              width={718}
              height={404}
              className="aspect-[4/3] h-full w-full object-center object-cover group-hover:scale-110 transition-all ease duration-300"
            />
          </Link>
          <div className="flex flex-col w-full mt-2">
            <Link href={'/event-details/id'} className="inline-block my-1">
              <h2 className=" font-semibold capitalize text-base sm:text-lg">
                <span
                  className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-
              [background-size] duration-500"
                >
                  World Yoga Championship
                </span>
              </h2>
            </Link>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-2">
              The World Yoga Championship is a global event that celebrates the
              art and discipline of yoga.
            </span>
            <span className=" capitalize text-dark/50 font-light text-sm sm:text-base mt-4">
              IDR 1,200,000
            </span>
          </div>
        </div>
        <div className="group flex flex-col items-center text-dark shadow-md shadow-pink-300 rounded-lg p-2 ">
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
        <div className="group flex flex-col items-center text-dark shadow-md shadow-pink-300 rounded-lg p-2 ">
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
        <div className="group flex flex-col items-center text-dark shadow-md shadow-pink-300 rounded-lg p-2 ">
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
        <div className="group flex flex-col items-center text-dark shadow-md shadow-pink-300 rounded-lg p-2 ">
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
        <div className="group flex flex-col items-center text-dark shadow-md shadow-pink-300 rounded-lg p-2 ">
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
      <nav
        aria-label="Page navigation example"
        className="flex justify-end my-16 mx-4"
      >
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </article>
  );
};

export default EventList;
