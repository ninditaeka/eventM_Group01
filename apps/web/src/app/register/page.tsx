'use client';

import Image from 'next/image';
import Link from 'next/link';

// import Image from 'next/image';
// import styles from './page.module.css';

export default function Register() {
  return (
    <div className="flex px-2 md:px-10 md:mt-20 md:flex-row py-28 md:py-16">
      <div className="md:px-56 flex-col px-10 md:mt-10 mt-10">
        <h1 className="text-pink-600 font-extrabold text-2xl md:text-2xl">
          EventBuzz
        </h1>
        <h1 className="text-black md:mt-10 mt-6 text-4xl font-extrabold md:text-4xl">
          Register
        </h1>

        <form className=" md:w-auto w-72 mt-10 ">
          <div className="mb-5">
            <input
              type="firstName"
              id="firstName"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
              placeholder="First Name"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="lastName"
              id="lastName"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="role"
              id="role"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
              placeholder="Role"
              required
            />
          </div>
          <div className="flex items-start mb-5"></div>

          <button
            type="submit"
            className="text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Submit
          </button>
        </form>

        <div className="mt-4 md:mt-4  md:mb-8  mb-2 text-xs ">
          Have account?
          <Link
            className="mt-6 md:mt-8 text-xs font-extrabold text-pink-600  hover:underline"
            href={'/login'}
          >
            {' '}
            Log in
          </Link>
        </div>
      </div>
      <div className=" flex flex-row md:w-1/2  invisible md:visible md:justify-end">
        <Image
          className="rounded-lg   shadow-xl dark:shadow-gray-800"
          width={900}
          height={1200}
          src="/register.jpg"
          alt="register"
        />
      </div>
    </div>
    // <div className="md:px-10 flex flex-col">
    //   <div className="px-5 md:px-96 mt-12 p-4 flex  md:flex-col flex-row">
    //     <h3 className="text-pink-600 font-extrabold text-xl md:text-2xl">
    //       EventBuzz
    //     </h3>

    //     <h1 className="text-black text-4xl font-extrabold md:text-4xl">
    //       Log in
    //     </h1>
    //     <h2 className="mt-6 md:mt-8 text-xs font-extrabold px-6 text-pink-600  hover:underline">
    //       Sign Up
    //     </h2>
    //   </div>
    //   <div className="flex px-6 ">
    //     <form className=" w-auto mt-10 ">
    //       <div className="mb-5">
    //         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
    //           placeholder="youremail@gmail.com"
    //           required
    //         />
    //       </div>
    //       <div className="mb-5">
    //         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
    //           required
    //         />
    //       </div>
    //       <div className="flex items-start mb-5"></div>
    //       <button
    //         type="submit"
    //         className="text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
    //       >
    //         Log in
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}
