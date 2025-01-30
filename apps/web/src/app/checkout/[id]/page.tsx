'use client';
import { Button } from 'flowbite-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createCheckoutProcess, ICreateCheckout } from '@/services/checkout';
import { getDetailDataEvent } from '@/services/event';
import { useRouter } from 'next/navigation';
import { getLoginCookie } from '../../../../utils/cookies';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
interface UserProfile {
  referralCode: string;
  totalPoints: number;
  user: any;
}

const checkout = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [createCheckout, setCreateCheckout] = useState<any>({});
  const [eventDetail, setEventDetail] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    referralCode: '',
    totalPoints: 0,
    user: {},
  });

  const eventDetaiValueProcess = async () => {
    const eventDetailValue = await getDetailDataEvent(params.id);
    setEventDetail(eventDetailValue.data);
  };

  const decodeJWT = () => {
    try {
      const token = getLoginCookie();
      if (!token) return;

      const fetchProfile = async () => {
        try {
          const token = Cookies.get('token');
          if (!token) return;

          const jwt = JSON.parse(atob(token.split('.')[1]));
          let userIdFromCookie = jwt.id; // Assuming the user ID is stored in the JWT

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}users/${userIdFromCookie}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (response.data.status === 'success') {
            const userProfile = response.data.data;
            console.log(userProfile);

            // Set the profile state, including couponCreated
            setProfile(userProfile);
            setIsLoggedIn(true);
          }
        } catch (error) {
          toast.error('Failed to fetch profile data');
          console.error('Error fetching profile data:', error);
        }
      };

      useEffect(() => {
        fetchProfile().catch(() => decodeJWT());
      }, []);
      // setProfile({
      //   first_name: jwt.first_name || '',
      //   last_name: jwt.last_name || '',
      //   email: jwt.email || '',
      //   created_at: jwt.created_at || '',
      //   referralCode: jwt.referralCodes || '',
      //   role: jwt.role || '',
      //   points: jwt.totalPoints || 0,
      // });

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Invalid JWT token:', error);
    }
  };

  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
  });

  useEffect(() => {
    const token = getLoginCookie();
    if (token) {
      const jwt = JSON.parse(atob(token.split('.')[1]));
      console.log('my.name:' + jwt.name);

      setUser({
        email: jwt.email,
        name: jwt.name,
        role: jwt.role,
      });
      const existingRole = jwt.role;
      guard('participant', existingRole);
    } else {
      alert('you are not allowed to access this page');
      router.push('/');
    }
  }, []);

  const guard = function (expectedRole: string, existingRole: string) {
    if (existingRole == expectedRole) {
      console.log('ok');
    } else {
      alert('you are not allowed to this page');
      router.push('/');
    }
  };

  const handleCreateCheckout = async () => {
    try {
      // Construct the data object for the checkout process
      const checkoutData: ICreateCheckout = {
        discount_coupon_use: 0, // Replace with actual form data if necessary
        point_balance_use: 100, // Replace with actual point balance use if necessary
        final_price: eventDetail?.price, // You can calculate or modify this as needed
        discount_nominal_use: 0, // Replace with actual discount if necessary
        eventId: eventDetail?.id, // Use the event's ID
      };

      const result = await createCheckoutProcess(checkoutData);
      setCreateCheckout(result.data);
      router.push(`/payment/${result?.data?.id}`); // Navigate to payment page after checkout
    } catch (err) {
      setError('Error creating checkout process');
      console.error(err);
    }
  };
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
                  Event ID
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
                <td className="px-6 py-4 ">{eventDetail?.id}</td>
                <td className="px-6 py-4">{eventDetail?.title}</td>
                <td className="px-6 py-4">
                  {eventDetail?.price?.toLocaleString()}
                </td>
                <td className="px-12 py-4">1</td>
                <td className="px-6 py-4">
                  {eventDetail?.price?.toLocaleString()}
                </td>
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
              YOUR POINTS
            </label>

            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                30000
              </p>
            </a>
          </div>

          <button
            type="submit"
            className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            APPLY POINTS
          </button>
          <div className="mb-4 mt-8 font-bold">
            Your Discount 10% already applied
          </div>

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
            <div className="flex space-x-56">
              <p className="text-black ">diskon 10%</p>
              <p className="text-black">IDR 150,000</p>
            </div>
            <div className="flex space-x-56">
              <p className="text-black ">redeem points</p>
              <p className="text-black">IDR 30,000</p>
            </div>
            <hr className="h-px my-2 bg-gray-400" />
            <div className="flex space-x-64">
              <p className="text-black ">total</p>
              <p className="text-black">IDR 1,320,000</p>
            </div>
            <Button
              className="mt-6 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleCreateCheckout}
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
