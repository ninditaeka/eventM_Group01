'use client';

import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import profileData from '@/services/user';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  referralCode: string;
  points: number;
}

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    first_name: '',
    last_name: '',
    email: '',
    created_at: '',
    referralCode: '',
    points: 0,
  });

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const profile = await profileData();
    setProfile(profile?.data);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-red-400 border-b border-gray-200">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <a href="/" className="flex ms-2 md:me-24">
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white dark:text-white">
                    EventBuzz
                  </span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div>
                    <h1 className="text-white mr-8  font-bold text-xl">
                      {profile?.email}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <button
            onClick={toggleDropdown}
            className="absolute top-4 left-4 sm:hidden text-gray-900 dark:text-white"
          >
            {isOpen ? 'Close Menu' : 'Open Menu'}
          </button>

          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/profile"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="/profile/my-event"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    My Event
                  </span>
                </a>
              </li>
              <li></li>
              <li>
                <a
                  href="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="flex">
          <div className="w-full mx-auto p-6 sm:ml-64 mt-16">
            <h1 className="text-2xl font-bold border-b pb-3 mb-6">
              My Profile
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold">First name</label>
                <input
                  type="text"
                  value={profile?.first_name}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 mt-1"
                />
              </div>
              <div>
                <label className="font-semibold">Last name</label>
                <input
                  type="text"
                  value={profile?.last_name}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 mt-1"
                />
              </div>
              <div>
                <label className="font-semibold">Email</label>
                <input
                  type="text"
                  value={profile?.email}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 mt-1"
                />
              </div>
              <div>
                <label className="font-semibold">Joined at</label>
                <input
                  type="text"
                  value={profile?.created_at}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 mt-1"
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 hover:bg-red-100 hover:shadow-md transition duration-200">
                <h2 className="text-lg font-semibold text-red-700 mb-2">
                  Referral Code
                </h2>
                <p className="text-sm text-gray-700">
                  Use this code to invite friends:
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-red-800">
                    {profile?.referralCode}
                  </span>
                  <button
                    onClick={() => {
                      // navigator.clipboard.writeText(profile?.referralCode);
                      toast.success('Referral code copied successfully!');
                    }}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 hover:bg-red-100 hover:shadow-md transition duration-200">
                <h2 className="text-lg font-semibold text-red-700 mb-2">
                  Points
                </h2>
                <p className="text-sm text-gray-700">Your points:</p>
                <div className="mt-4 flex items-center">
                  <span className="text-3xl font-bold text-red-800">
                    {profile?.points}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">point</span>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 hover:bg-yellow-100 hover:shadow-md transition duration-200">
                <h2 className="text-lg font-semibold text-yellow-700 mb-2">
                  Discount Coupon
                </h2>
                <p className="text-sm text-gray-700">
                  Use this coupon to get a discount:
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-yellow-800">
                    DISCOUNT 10%
                  </span>
                  <Button
                    href="/events"
                    className=" bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600"
                  >
                    Use Coupon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      ;
    </div>
  );
}
