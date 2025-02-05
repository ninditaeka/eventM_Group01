'use client';
import { getCheckoutByEOId } from '@/services/checkout';
import { useEffect, useState } from 'react';
import { getLoginCookie } from '../../../../utils/cookies';
import { useRouter } from 'next/navigation';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import { createPaymentProcess } from '@/services/payment';
import UnauthorizedPage from '@/app/unauthorized/page';
import { toast, ToastContainer } from 'react-toastify';

const ITEMS_PER_PAGE = 10;

export default function AttendantList() {
  interface Attendant {
    co_id: string;
    first_name: string;
    last_name: string;
    title: string;
    created_at: string;
    is_paid: boolean;
    price: number;
    event_id: number;
    payments: { is_paid: boolean }[];
  }

  const router = useRouter();
  const [user, setUser] = useState({ id: '', email: '', name: '', role: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const [selectedAttendant, setSelectedAttendant] = useState<Attendant | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = getLoginCookie();
    if (token) {
      const jwt = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: jwt.id, email: jwt.email, name: jwt.name, role: jwt.role });
      const existingRole = jwt.role;
      const authorized = guard('event_organizer', existingRole);
      setIsAuthorized(authorized);
    } else {
      router.push('/');
    }
  }, [router]);

  const fetchAttendants = async (id: number) => {
    if (user.id) {
      try {
        const response = await getCheckoutByEOId(id);
        setAttendants(response.data);
      } catch (error) {
        console.error('Error fetching attendants:', error);
      }
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchAttendants(Number(user.id));
    }
  }, [user.id]);

  const totalPages = Math.ceil(attendants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = attendants.slice(
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

  const handleConfirmClick = (attendant: Attendant) => {
    if (attendant.is_paid) {
      toast.success('Payment has already been confirmed.');
      return;
    }
    setSelectedAttendant(attendant);
    setIsModalOpen(true); // Open the modal here
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttendant(null);
  };

  const handleConfirmPayment = async () => {
    if (!selectedAttendant) return;

    try {
      const response = await createPaymentProcess({
        checkoutId: Number(selectedAttendant.co_id),
        price_paid: selectedAttendant.price,
        eventId: selectedAttendant.event_id,
      });

      if (response.status == 'success') {
        toast.success('Payment confirmed successfully.');
        fetchAttendants(Number(user.id));
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      toast.error('Payment failed. Please try again.');
    }

    setIsModalOpen(false); // Ensure modal closes after clicking Yes
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
        <h1 className="mt-20 md:text-3xl text-xl font-bold">Attendant List</h1>
        <div className="relative mt-12 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white bg-red-400 uppercase dark:bg-gray-700">
              <tr className="text-center">
                <th className="px-6 py-3">ID Checkout</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((attendant) => (
                <tr
                  key={attendant.co_id}
                  className="bg-white border-b text-center text-black dark:bg-gray-800"
                >
                  <td className="px-6 py-4 font-medium text-black">
                    {attendant.co_id}
                  </td>
                  <td className="px-6 py-4">
                    {attendant.first_name} {attendant.last_name}
                  </td>
                  <td className="px-6 py-4">{attendant.title}</td>
                  <td className="px-6 py-4">
                    {new Date(
                      attendant?.created_at?.split('T')[0],
                    ).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {/* {attendant.created_at &&
                      new Date(attendant.created_at).toLocaleString()} */}
                  </td>
                  <td className="px-6 py-4">
                    {attendant.is_paid ? (
                      <span className="text-green-500">Approved</span>
                    ) : (
                      <button
                        onClick={() => handleConfirmClick(attendant)} // Call the confirm click handler
                        className="text-white bg-red-400 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav
          aria-label="Page navigation"
          className="flex justify-end my-16 mx-4"
        >
          <ul className="inline-flex -space-x-px text-base h-10">
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
        ;
        {isModalOpen && selectedAttendant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-lg font-bold">Confirm Payment</h2>
              <p>
                Are you sure you want to confirm payment for{' '}
                {selectedAttendant.first_name} {selectedAttendant.last_name}?
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-4"
                >
                  No
                </button>
                <button
                  onClick={handleConfirmPayment} // Call the payment confirmation function here
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
