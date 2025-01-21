import { Button } from 'flowbite-react';
import React from 'react';

const checkout = () => {
  return (
    <article className="m-2 px-4">
      <div className="w-full mb-8 text-center h-[70vh] bg-red-400 rounded-lg z-10 py-28 items-center justify-center relative">
        <h1 className="inline-block mt-14 content-center font-bold capitalize text-white text-2xl md:text-6xl leading-normal relative w-5/6">
          CHECKOUT
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="relative h-1/2 overflow-x-auto w-full md:w-3/5 border border-gray-400 rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Event
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b ">
                <td className="px-6 py-4 ">#001234</td>
                <td className="px-6 py-4">World Yoga Championship</td>
                <td className="px-6 py-4">1,500,000</td>
                <td className="px-12 py-4">1</td>
                <td className="px-6 py-4">IDR 1,500,000</td>
              </tr>
              <tr className="bg-white border-b ">
                <td className="px-6 py-4 "></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-12 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <form className="w-full md:w-2/5 mt-4 md:mt-0  p-4 border border-gray-400 rounded-lg">
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-gray-900 "
            >
              DISCOUNT COUPON
            </label>
            <input
              type="text"
              className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your discount code"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            APPLY CODE
          </button>
          <div className="mb-4 mt-8">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-gray-900 "
            >
              REEDEM POINT
            </label>
            <input
              type="text"
              className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your discount code"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            REEDEM
          </button>
          <div className="mt-8">
            <label
              htmlFor="text"
              className="block mb-4 text-sm font-bold text-gray-900 "
            >
              TOTAL
            </label>
            <div className="flex space-x-56">
              <p className="text-black ">subtotal</p>
              <p className="text-black">IDR 1,500,000</p>
            </div>
            <hr className="h-px my-2 bg-gray-400" />
            <div className="flex space-x-64">
              <p className="text-black ">total</p>
              <p className="text-black">IDR 1,500,000</p>
            </div>
            <Button
              href="/payment"
              className="mt-6 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              CHECKOUT
            </Button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default checkout;
