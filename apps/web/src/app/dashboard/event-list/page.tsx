'use client';
import 'flowbite';

import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EventList() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: 'Ninditaa',
    role: 'event_organizer',
    // role: 'participant',
  });
  return (
    <div>
      <NavbarDashboard name={userInfo.name} />
      <SideBarDashboard role={userInfo.role} />
      <div className="p-4 sm:ml-64">
        <div className=" mt-20 md:text-3xl text-xl font-bold flex flex-row">
          Event List
        </div>
        <div>
          <div className="relative mt-12 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white bg-rose-400 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Event Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b  text-black dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  text-black whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 ">Java Jazz Festival 2025</td>
                  <td className="px-6 py-4">IDR 500.000</td>
                  <td className="px-6 py-4">14 February 2025</td>
                  <td className="px-6 py-4 ">
                    <a
                      href="#"
                      className="px-6 py-4  font-medium text-center text-rose-600 dark:text-rose-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="px-6 py-4  font-medium text-center text-rose-600 dark:text-rose-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b   text-black dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  text-black whitespace-nowrap dark:text-white"
                  >
                    2
                  </th>
                  <td className="px-6 py-4 ">World Yoga Festival</td>
                  <td className="px-6 py-4  ">IDR 350.000</td>
                  <td className="px-6 py-4 ">3 March 2025</td>
                  <td className="px-6 py-4 ">
                    <a
                      href="#"
                      className="px-6 py-4  font-medium text-center text-rose-600 dark:text-rose-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="px-6 py-4  font-medium text-center text-rose-600 dark:text-rose-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
                <tr className="bg-white  text-black  dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-4 ">Borobudur Half Marathon 2025</td>
                  <td className="px-6 py-4 ">IDR 800.000</td>
                  <td className="px-6 py-4 ">25 June 2025</td>
                  <td className="px-6 py-4 ">
                    <a
                      href="#"
                      className="px-6 py-4  font-medium text-center text-rose-600 dark:text-rose-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="px-6 py-4  font-medium text-center text-rose-600 dark:text-rose-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className=" flex justify-end mt-16">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
