'use client';
import { Button } from 'flowbite-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getDetailDataEvent } from '@/services/event';
import {
  getPreCheckout,
  createCheckoutProcess,
  ICreateCheckout,
} from '@/services/checkout';
import { useRouter } from 'next/navigation';
import { getLoginCookie } from '../../../../utils/cookies';
import { toast, ToastContainer } from 'react-toastify';
interface UserProfile {
  referralCode: string;
  totalPoints: number;
  user: any;
}

const checkout = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState<any>({});
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
  });
  const [preCheckout, setPreCheckout] = useState<any>();
  const [createCheckout, setCheckout] = useState<any>();

  const handleGetDetailEvent = async () => {
    const eventDetail = await getDetailDataEvent(params.id);
    setEventDetail(eventDetail.data);
  };

  const handleGetPreCheckout = async () => {
    try {
      const preCheckoutData = await getPreCheckout(params.id);

      setPreCheckout(preCheckoutData);
    } catch (error) {
      console.error('Error fetching pre-checkout data:', error);
    }
  };

  const handleCreateCheckout = async () => {
    try {
      const reqBody = {
        eventId: eventDetail?.id,
      } as ICreateCheckout;

      const createCheckoutData = await createCheckoutProcess(reqBody);

      setPreCheckout(createCheckoutData);

      if (createCheckoutData.statuscode == 200) {
        toast.success('Checkout confirmed successfully.');
        router.push('/payment/' + createCheckoutData.data.id);
      }
    } catch (error) {
      console.error('Error fetching pre-checkout data:', error);
    }
  };

  useEffect(() => {
    handleGetDetailEvent();
    handleGetPreCheckout();
  }, []);

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
      guard('participant', existingRole);
    } else {
      toast.error('you are not allowed to access this page');
      router.push('/');
    }
  }, []);

  const guard = function (expectedRole: string, existingRole: string) {
    if (existingRole == expectedRole) {
    } else {
      toast.error('you are not allowed to this page');
      router.push('/');
    }
  };
  return (
    <>
      <ToastContainer />
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
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b ">
                  <td className="px-6 py-4 ">{eventDetail?.id}</td>
                  <td className="px-6 py-4">{eventDetail?.title}</td>
                  <td className="px-6 py-4">
                    {eventDetail?.price === 0
                      ? 'Free'
                      : `IDR ${eventDetail?.price?.toLocaleString()}`}
                  </td>
                  <td className="px-12 py-4">1</td>
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
                  {preCheckout?.pointBalanceUse}
                </p>
              </a>
            </div>

            {/* {genuineKey && (
        <div>GenuineKey: {genuineKey}</div>
      )} */}
            {preCheckout?.discountNominalUse !== 0 && (
              <div className="mb-4 mt-8 font-bold">
                Your Discount 10% already applied
              </div>
            )}

            <div className="mt-8">
              <label
                htmlFor="text"
                className="block mb-4 text-sm font-bold text-gray-900 "
              >
                TOTAL
              </label>
              <div className="flex flex-row justify-between ">
                <p className="text-black ">subtotal</p>
                <p className="text-black">
                  IDR {preCheckout?.event?.price?.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-black ">diskon 10%</p>
                <p className="t ext-black">
                  {' '}
                  IDR {preCheckout?.discountNominalUse?.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-black ">redeem points</p>
                <p className="text-black">
                  IDR {preCheckout?.pointBalanceUse?.toLocaleString()}
                </p>
              </div>
              <hr className="h-px my-2 bg-gray-400" />
              <div className="flex flex-row justify-between">
                <p className="text-black ">total</p>
                <p className="text-black">
                  IDR {preCheckout?.finalPrice?.toLocaleString()}
                </p>
              </div>
              <Button
                onClick={handleCreateCheckout}
                className="mt-6 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                CHECKOUT
              </Button>
            </div>
          </form>
        </div>
      </article>
    </>
  );
};

export default checkout;
