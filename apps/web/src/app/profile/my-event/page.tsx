'use client';
import Chart from 'react-apexcharts';
import { Button, Card, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';

import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { submitReview } from '@/services/review';
import { useRouter } from 'next/navigation';
import { set } from 'cypress/types/lodash';
import { date } from 'yup';
import { getEventByParticipantId } from '@/services/event';
import UnauthorizedPage from '@/app/unauthorized/page';
import { getLoginCookie } from '../../../../utils/cookies';

const starDescriptions = [
  'Did not like it',
  'It was okay',
  'Liked it',
  'Really liked it',
  'It was amazing',
];

const ITEMS_PER_PAGE = 10;

export default function MyList() {
  const [userInfo, setUserInfo] = useState({
    name: 'Ninditaa',
    // role: 'event_organizer',
    role: 'participant',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [event, setEvent] = useState<Event[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [eventIdActive, setEventIdActive] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const getEvents = async () => {
    const eventsData = (await getEventByParticipantId()) as any;

    setEvent(eventsData.data.data);
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

      const authorized = guard('participant', existingRole);
      setIsAuthorized(authorized);
    } else {
      router.push('/');
    }
  }, []);

  const totalPages = Math.ceil(event.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = event.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const handleModalReview = (eventId: any) => {
    setEventIdActive(eventId);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }

    try {
      await submitReview({
        eventId: eventIdActive,
        rating,
        comment,
      });
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <Modal
        className="!bg-gray-900 !bg-opacity-60"
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="w-auto md:w-full mt-6 p-4 border border-gray-500 rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-red-400">
                Leave a Review
              </h2>
              <p className="text-gray-500 mb-4 text-center">
                How would you rate your experience?
              </p>

              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-3xl ${
                      star <= rating ? 'text-yellow-300' : 'text-gray-400'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <p className="text-gray-700 mb-4 text-center">
                  {starDescriptions[rating - 1]}
                </p>
              )}

              <div className="mb-4">
                <label className="block font-medium mb-1">Review </label>
                <textarea
                  className="w-full border rounded p-2"
                  rows={4}
                  placeholder="ex. You guys are awesome."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button
                className="w-fit bg-red-400 text-white font-bold p-2 text-sm md:text-base rounded-lg hover:bg-red-500"
                onClick={handleSubmit}
              >
                Submit Review
              </button>

              <ToastContainer position="top-center" autoClose={3000} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <NavbarDashboard name={userInfo.name} />
      <SideBarDashboard role={userInfo.role} /> */}

      <NavbarDashboard name={user.name} onToggleSidebar={toggleSidebar} />
      <SideBarDashboard role={user.role} isOpen={isSidebarOpen} />

      <div className="p-6 sm:ml-64 mt-16">
        <h2 className="text-2xl font-bold mb-4">My Events</h2>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full ">
            <thead className="bg-red-400 text-white">
              <tr>
                <th className="px-2 py-3 text-center text-sm font-semibold">
                  ORDER_ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Event
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Date
                </th>

                <th className=" py-3 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((item: any) => (
                <tr className="border-b text-center">
                  <td className="px-2 py-4 text-gray-700">
                    #{item.checkout.id}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {item.checkout.user.first_name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {item.checkout.event.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(
                      item.checkout.created_at?.split('T')[0],
                    ).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="py-4 text-gray-700 flex justify-center">
                    {item.is_paid === true && (
                      <Button
                        className="bg-red-400 hover:bg-red-500 text-white w-fit rounded"
                        onClick={() => handleModalReview(item.eventId)}
                      >
                        Review
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
