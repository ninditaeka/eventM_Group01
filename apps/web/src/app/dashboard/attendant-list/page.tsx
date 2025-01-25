'use client';
import 'flowbite';
import Link from 'next/link';
import { useState } from 'react';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';

export default function AttendantList() {
  const [userInfo, setUserInfo] = useState({
    name: 'Ninditaa',
    role: 'event_organizer',
    // role: 'participant',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttendant, setSelectedAttendant] = useState<string | null>(
    null,
  );

  const handleConfirmClick = (attendantId: string) => {
    setSelectedAttendant(attendantId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttendant(null);
  };

  const handleConfirmPayment = () => {
    alert(`Payment confirmed for attendant ${selectedAttendant}`);
    setIsModalOpen(false);
  };
  return (
    <div>
      <NavbarDashboard name={userInfo.name} />
      <SideBarDashboard role={userInfo.role} />

      <div className="p-4 sm:ml-64">
        <div className=" mt-20 md:text-3xl text-xl font-bold flex flex-row">
          Attendant List
        </div>
        <div>
          <div className="relative mt-12 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white bg-rose-400 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b text-center text-black dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  text-black whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-center">
                    Nindita Eka Setyahandani
                  </td>
                  <td className="px-6 py-4 text-center">
                    Java Jazz Festival 2025
                  </td>
                  <td className="px-6 py-4 text-center">14 February 2025</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleConfirmClick('1')}
                      type="button"
                      className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b text-center  text-black dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  text-black whitespace-nowrap dark:text-white"
                  >
                    2
                  </th>
                  <td className="px-6 py-4 text-center ">Dita Aulia F</td>
                  <td className="px-6 py-4 text-center ">
                    World Yoga Festival
                  </td>
                  <td className="px-6 py-4 text-center ">3 March 2025</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
                <tr className="bg-white text-center text-black  dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-black whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-4 text-center">Yara Naomi</td>
                  <td className="px-6 py-4 text-center">
                    Java Jazz Festival 2025
                  </td>
                  <td className="px-6 py-4 text-center">14 February 2025</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
              onClick={handleCloseModal}
            >
              <div
                className="bg-white p-8 rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-bold">Confirm Payment</h2>
                <p>
                  Are you sure you want to confirm the payment for attendant{' '}
                  {selectedAttendant}?
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="bg-rose-500 text-white px-4 py-2 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

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

// 'use client';
// import 'flowbite';
// import Link from 'next/link';

// export default function AttendantList() {
//   return (
//     <div>
//       <nav className="fixed top-0 z-50 w-full bg-rose-400 border-b border-gray-200 dark:bg-pink-600 ">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start rtl:justify-end">
//               <button
//                 data-drawer-target="logo-sidebar"
//                 data-drawer-toggle="logo-sidebar"
//                 aria-controls="logo-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-rose-700 dark:focus:ring-rose-600"
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg
//                   className="w-6 h-6"
//                   aria-hidden="true"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                   ></path>
//                 </svg>
//               </button>
//               <a href="/" className="flex ms-2 md:me-24">
//                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white dark:text-white">
//                   EventBuzz
//                 </span>
//               </a>
//             </div>
//             <div className="flex items-center">
//               <div className="flex items-center ms-3">
//                 <div>
//                   <h1 className="text-white mr-8  font-bold text-xl">
//                     EO Name
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <aside
//         id="logo-sidebar"
//         className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0  dark:bg-rose-600 "
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
//           <ul className="space-y-2 font-medium">
//             <li>
//               <a
//                 href="/dashboard"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ms-3">Dashboard</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/event-list"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 18 18"
//                 >
//                   <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">
//                   Event List
//                 </span>
//               </a>
//             </li>
//             <li></li>
//             <li>
//               <a
//                 href="attendat-list"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 18"
//                 >
//                   <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">
//                   Attendant List
//                 </span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
//                   <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
//                 </svg>

//                 <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>

//                 <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
//               </a>
//             </li>
//             <li>
//               <button className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
//                 <Link href="/create-event" className="">
//                   Create Event
//                 </Link>
//               </button>
//             </li>
//           </ul>
//         </div>
//       </aside>

//       <div className="p-4 sm:ml-64">
//         <div className=" mt-20 md:text-3xl text-xl font-bold flex flex-row">
//           Attendant List
//         </div>
//         <div>
//           <div className="relative mt-12 overflow-x-auto shadow-md sm:rounded-lg">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//               <thead className="text-xs text-white bg-rose-400 uppercase dark:bg-gray-700 dark:text-gray-400">
//                 <tr className="text-center">
//                   <th scope="col" className="px-6 py-3">
//                     ID
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Name
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Event
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Date
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Payment Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="bg-white border-b text-center text-black dark:bg-gray-800 dark:border-gray-700">
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium  text-black whitespace-nowrap dark:text-white"
//                   >
//                     1
//                   </th>
//                   <td className="px-6 py-4 text-center">
//                     Nindita Eka Setyahandani
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     Java Jazz Festival 2025
//                   </td>
//                   <td className="px-6 py-4 text-center">14 February 2025</td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       type="button"
//                       className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-blue-800"
//                     >
//                       Confirm
//                     </button>
//                   </td>
//                 </tr>
//                 <tr className="bg-white border-b text-center  text-black dark:bg-gray-800 dark:border-gray-700">
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium  text-black whitespace-nowrap dark:text-white"
//                   >
//                     2
//                   </th>
//                   <td className="px-6 py-4 text-center ">Dita Aulia F</td>
//                   <td className="px-6 py-4 text-center ">
//                     World Yoga Festival
//                   </td>
//                   <td className="px-6 py-4 text-center ">3 March 2025</td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       type="button"
//                       className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-blue-800"
//                     >
//                       Confirm
//                     </button>
//                   </td>
//                 </tr>
//                 <tr className="bg-white text-center text-black  dark:bg-gray-800">
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-center text-black whitespace-nowrap dark:text-white"
//                   >
//                     3
//                   </th>
//                   <td className="px-6 py-4 text-center">Yara Naomi</td>
//                   <td className="px-6 py-4 text-center">
//                     Java Jazz Festival 2025
//                   </td>
//                   <td className="px-6 py-4 text-center">14 February 2025</td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       type="button"
//                       className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-blue-800"
//                     >
//                       Confirm
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <nav aria-label="Page navigation example">
//             <ul className=" flex justify-end mt-16">
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                 >
//                   Previous
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                 >
//                   1
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                 >
//                   2
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   aria-current="page"
//                   className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//                 >
//                   3
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                 >
//                   4
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                 >
//                   5
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                 >
//                   Next
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }
