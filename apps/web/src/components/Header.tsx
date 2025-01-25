'use client';

import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
  const [click, setClick] = useState(false);

  const toggle = () => {
    setClick(!click);
  };
  return (
    <div className="w-full p-4 px-5 md:px-10 flex items-center justify-between h-16 bg-white shadow-md z-50 fixed">
      <h3 className={'text-red-400 font-extrabold text-base md:text-2xl'}>
        EventBuzz
      </h3>
      <button
        className="inline-block right-1/2 translate-x-1/2 sm:hidden px-3 z-50"
        onClick={toggle}
      >
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span
              className="absolute top-0 right-2 bg-black inline-block w-full h-0.5 bg-dark rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? 'rotate(-45deg) translateY(0)'
                  : 'rotate(0deg) translateY(6px)',
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 right-2 bg-black inline-block w-full h-0.5 bg-dark rounded transition-all ease duration-200 "
              style={{
                opacity: click ? 0 : 1,
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 right-2 bg-black inline-block w-full h-0.5 bg-dark rounded transition-all ease duration-200 "
              style={{
                transform: click
                  ? 'rotate(45deg) translateY(0)'
                  : 'rotate(0deg) translateY(-6px)',
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>

      <nav
        className="w-full md:w-max px-6 sm:px-8 mt-12 font-medium capitalize items-center flex flex-col                       sm:hidden
      fixed top-6 right-1/2 translate-x-1/2 bg-white shadow-sm z-50 transition-all ease-out duration-300"
        style={{
          top: click ? '1rem' : '-15rem',
        }}
      >
        <Link
          href="/"
          className="text-sm md:text-lg p-2 w-full hover:scale-110 transition ease duration-200 text-center"
        >
          Home
        </Link>
        <Link
          href="/events"
          className="text-sm md:text-lg p-2 hover:scale-110 transition-all ease duration-200"
        >
          Events
        </Link>
        <Link
          href="/categories"
          className="text-sm md:text-lg p-2 hover:scale-110 transition-all ease duration-200"
        >
          Help Center
        </Link>
        <Link
          href="/login"
          className="text-sm md:text-lg p-2 hover:scale-110 transition-all ease duration-200"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-sm md:text-lg p-2 hover:scale-110 transition-all ease duration-200"
        >
          Register
        </Link>
      </nav>

      <nav
        className="w-max py-3 px-8 font-medium capitalize items-center hidden sm:flex
      fixed right-1/2 translate-x-1/2 z-50"
      >
        <Link
          href="/"
          className="mx-4 lg:mx-10 font-semibold hover:scale-110 transition-all ease duration-200"
        >
          Home
        </Link>
        <Link
          href="/events"
          className="mx-4 lg:mx-10 font-semibold hover:scale-110 transition-all ease duration-200"
        >
          Events
        </Link>
        <Link
          href="/categories"
          className="mx-4 lg:mx-10 font-semibold hover:scale-110 transition-all ease duration-200"
        >
          Help Center
        </Link>
      </nav>
      <div className="hidden sm:flex items-center">
        <Link
          href="/login"
          className="mx-1 hover:bg-red-500 bg-red-400 py-2 px-3 text-xs md:text-base font-semibold rounded-lg text-white"
        >
          Log In
        </Link>
        <Link
          href="/register"
          className="mx-1 hover:bg-red-500 bg-red-400 py-2 px-3 text-xs md:text-base font-semibold rounded-lg text-white"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
