'use client';
import Chart from 'react-apexcharts';
import { Card } from 'flowbite-react';
import { useState } from 'react';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';

import { Dropdown } from 'flowbite-react';
import Link from 'next/link';

export default function MyList() {
  const [userInfo, setUserInfo] = useState({
    name: 'Ninditaa',
    // role: 'event_organizer',
    role: 'participant',
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <NavbarDashboard name={userInfo.name} />
      <SideBarDashboard role={userInfo.role} />
      <div className="p-6 sm:ml-64 mt-16">
        <h2 className="text-2xl font-bold mb-4">My Events</h2>

        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="min-w-full bg-white">
            <thead className="bg-red-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  ORDER_ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-gray-700">#0123</td>
                <td className="px-6 py-4 text-gray-700">Dita Aulia</td>
                <td className="px-6 py-4 text-gray-700">Music Festival 2025</td>
                <td className="px-6 py-4 text-gray-700">28 Jan 2025</td>
                <td className="px-6 py-4 text-gray-700">Ended</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">#0213</td>
                <td className="px-6 py-4 text-gray-700">Dita Aulia</td>
                <td className="px-6 py-4 text-gray-700">World Yoga Festival</td>
                <td className="px-6 py-4 text-gray-700">23 Feb 2025</td>
                <td className="px-6 py-4 text-gray-700">Soon</td>
              </tr>
              <tr>
                <td className="px-6 py-4 h-12"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
