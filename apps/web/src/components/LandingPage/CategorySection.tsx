'use client';

import React from 'react';
import { MdSportsScore } from 'react-icons/md';
import { PiConfettiBold } from 'react-icons/pi';
import { IoFastFoodOutline } from 'react-icons/io5';

const CategorySection = () => {
  return (
    <section className="w-full mt-16 sm:mt-24 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-red-400 text-center ">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-row-1 gap-16 mt-16 mx-8">
        <div className="w-40 h-40 p-6 bg-white border border-gray-200 hover:border-red-400 rounded-lg shadow items-center ">
          <svg
            className="w-7 h-7 font text-black my-5 mx-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
            />
          </svg>

          <a href="#">
            <h5 className="mb-2 text-lg font-light tracking-tight text-gray-900 dark:text-white text-center">
              Conference
            </h5>
          </a>
        </div>
        <div className="w-40 h-40 p-6 bg-white border border-gray-200 hover:border-red-400 rounded-lg shadow items-center ">
          <svg
            className="w-7 h-7 font text-black my-5 mx-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z"
            />
          </svg>

          <a href="#">
            <h5 className="mb-2 text-lg font-light tracking-tight text-gray-900 dark:text-white text-center">
              Festival
            </h5>
          </a>
        </div>
        <div className="w-40 h-40 p-6 bg-white border border-gray-200 hover:border-red-400 rounded-lg shadow items-center ">
          <MdSportsScore className="w-7 h-7 font text-black my-5 mx-10" />

          <a href="#">
            <h5 className="mb-2 text-lg font-light tracking-tight text-gray-900 dark:text-white text-center">
              Sport
            </h5>
          </a>
        </div>
        <div className="w-40 h-40 p-6 bg-white border border-gray-200 hover:border-red-400 rounded-lg shadow items-center ">
          <PiConfettiBold className="w-7 h-7 font text-black my-5 mx-10" />

          <a href="#">
            <h5 className="mb-2 text-lg font-light tracking-tight text-gray-900 dark:text-white text-center">
              Concert
            </h5>
          </a>
        </div>
        <div className="w-40 h-40 p-6 bg-white border border-gray-200 hover:border-red-400 rounded-lg shadow items-center ">
          <IoFastFoodOutline className="w-7 h-7 font text-black my-5 mx-10" />

          <a href="#">
            <h5 className="mb-2 text-lg font-light tracking-tight text-gray-900 dark:text-white text-center">
              Food and Drink
            </h5>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
