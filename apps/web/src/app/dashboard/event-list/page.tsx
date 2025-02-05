'use client';
import 'flowbite';
import { softDeleteEvent } from '../../../services/event';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEventByEoId } from '@/services/event';
import { getLoginCookie } from '../../../../utils/cookies';
import UnauthorizedPage from '@/app/unauthorized/page';
import { toast, ToastContainer } from 'react-toastify';

const ITEMS_PER_PAGE = 10;

interface Event {
  id: string;
  title: string;
  price: number;
  date: string;
}

export default function EventListbyEo() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteEvent, setDeleteEvent] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // To show/hide confirmation modal
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const getEvents = async () => {
    const eventsData = (await getEventByEoId()) as any;

    setAllEvents(eventsData.data.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
  });

  useEffect(() => {
    const token = getLoginCookie();
    if (token) {
      const jwt = JSON.parse(atob(token.split('.')[1]));

      setUser({
        email: jwt.email,
        name: jwt.name,
        role: jwt.role,
      });
      const existingRole = jwt.role;

      const authorized = guard('event_organizer', existingRole);
      setIsAuthorized(authorized);
    } else {
      router.push('/');
    }
  }, [router]);

  // const handleGetEventbyUserId = async () => {
  //   const eventByEO = (await getEventByUserId()) as any;
  //   setEventByEO(eventByEO.data);
  // };

  // useEffect(() => {
  //   handleGetEventbyUserId();
  // }, []);

  const totalPages = Math.ceil(allEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = allEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const guard = function (expectedRole: string, existingRole: string) {
    return existingRole === expectedRole; // Return true if authorized, false otherwise
  };

  // If not authorized, render the UnauthorizedPage
  if (!isAuthorized) {
    return <UnauthorizedPage />;
  }

  // Handle opening the modal to confirm deletion
  const openDeleteModal = (event: any) => {
    setDeleteEvent(event); // Store the event to be deleted
    setShowDeleteModal(true); // Show the modal
  };

  // Close the confirmation modal
  const closeModal = () => {
    setShowDeleteModal(false);
    setDeleteEvent(null); // Reset the delete event
  };

  const handleDelete = async () => {
    if (!deleteEvent) return;

    try {
      setLoading(true);
      await softDeleteEvent(deleteEvent.id); // Call soft delete function
      setAllEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== deleteEvent.id),
      ); // Remove the deleted event from the local state
      closeModal(); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete the event');
    } finally {
      setLoading(false);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <ToastContainer />
      {/* <NavbarDashboard name={user.name} />
      <SideBarDashboard role={user.role} /> */}
      <NavbarDashboard name={user.name} onToggleSidebar={toggleSidebar} />
      <SideBarDashboard role={user.role} isOpen={isSidebarOpen} />

      <div className="p-4 sm:ml-64">
        <div className=" mt-20 md:text-3xl text-xl font-bold flex flex-row">
          Event List
        </div>
        <div>
          <div className="relative mt-12 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white bg-red-400 uppercase dark:bg-gray-700 dark:text-gray-400">
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

              {paginatedEvents.map((item: any, index) => (
                <tbody>
                  <tr className="bg-white border-b  text-black dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  text-black whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </th>
                    <td className="px-6 py-4 ">{item.title}</td>
                    <td className="px-6 py-4">
                      {' '}
                      {item?.price === 0
                        ? 'Free'
                        : `IDR ${item?.price?.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4">
                      {' '}
                      {new Date(item?.date?.split('T')[0]).toLocaleString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        },
                      )}
                    </td>
                    <td className="px-6 py-4 ">
                      <a
                        href={'/dashboard/event-list/edit-event/' + item.id}
                        className="px-6 py-4  font-medium text-center text-red-600 dark:text-rose-500 hover:underline"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="px-6 py-4  font-medium text-center text-red-600 dark:text-rose-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>

          {/* Pagination */}
          <nav
            aria-label="Page navigation"
            className="flex justify-center md:justify-end my-8 mx-2"
          >
            <ul className="flex flex-wrap items-center -space-x-px text-base h-10">
              <li>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => goToPage(index + 1)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight ${
                      currentPage === index + 1
                        ? 'text-red-500 border border-gray-300 bg-red-50 hover:bg-red-100 hover:text-red-600'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold text-center">
                  Are you sure you want to delete this event?
                </h2>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
