'use client';

import Link from 'next/link';
import { Datepicker } from 'flowbite-react';

import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import { useState } from 'react';

export default function EditEvent() {
  const [userInfo, setUserInfo] = useState({
    name: 'Ninditaa',
    role: 'event_organizer',
    // role: 'participant',
  });

  const [eventType, setEventType] = useState('');
  const [price, setPrice] = useState('');

  const handleEventTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setEventType(event.target.value);
    if (event.target.value === 'Free') {
      setPrice('');
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  today.setDate(today.getDate() + 7);
  const minDate = today;

  // Handle the date change event
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <NavbarDashboard name={userInfo.name} />
      <SideBarDashboard role={userInfo.role} />
      <div className="p-4 sm:ml-64">
        <div className="flex items-center mt-20 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Event Form
          </h3>
        </div>

        <form className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Event title"
                required={true}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex text-sm items-center ps-3 pointer-events-none">
                  IDR
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="800.000"
                  required
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="event_type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Type
              </label>
              <select
                id="event_type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={eventType}
                onChange={handleEventTypeChange}
              >
                <option value="" disabled>
                  Select event type
                </option>
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Jakarta"
                required={true}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Sport">Sport</option>
                <option value="Conference">Conference</option>
                <option value="Festival">Festival</option>
                <option value="Concert">Concert</option>
                <option value="Food and Drink">Food and Drink</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="total_transaction_discount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Transaction Discount
              </label>
              <input
                type="number"
                name="total_transaction_discount"
                id="total_transaction_discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="10"
                required={true}
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="total_seat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Seat
              </label>
              <input
                type="number"
                name="total_seat"
                id="total_seat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="100"
                required={true}
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <form className="max-w-l mx-auto">
                <label
                  className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="event_image"
                >
                  Reupload Image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="event_image"
                  id="event_image"
                  type="file"
                />
              </form>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="event_image"
              >
                Select Date
              </label>
              <Datepicker
                value={selectedDate ? selectedDate : undefined}
                onChange={handleDateChange}
                minDate={minDate}
              />
              <div
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="date"
              >
                please select a date plus a week from today, input +7 days from
                today
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <form className="max-w-l mx-auto">
                <label
                  htmlFor="time"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select time:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="09:00"
                    max="18:00"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write event description here"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:outline-double focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
          >
            Edit event
          </button>
        </form>
      </div>
    </div>
  );
}
