'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Card, Rating, Textarea } from 'flowbite-react';
import { getDetailDataEvent } from '@/services/event';
import Gambar2 from '../../../../public/Sporting Activities Image1.jpeg';
import { toast, ToastContainer } from 'react-toastify';
import { getReviewsByEvent, submitReview } from '@/services/review';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';
import moment from 'moment';

const EventDetails = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState<any>({});

  useEffect(() => {
    handleGetDetailEvent();
  }, []);

  const handleGetDetailEvent = async () => {
    const eventDetail = await getDetailDataEvent(params.id);
    // const jakartaTime = moment().format('LLLL'); // Example: 'Sunday, February 2, 2025 9:09 AM'

    // const localTime = moment
    //   .utc(eventDetail.data.date)
    //   .local()
    //   .format('YYYY-MM-DD h:mm A');

    // const eventDateTimeInJakarta = moment(eventDetail.data.date);
    // // .utc(eventDetail.data.date)
    // // .tz('Asia/Jakarta');

    // // Format the date and time for display
    // const formattedDate = eventDateTimeInJakarta.format('D MMMM YYYY'); // e.g., "2 February 2025"
    // const formattedTime = eventDateTimeInJakarta.format('hh:mm A'); // e.g., "05:00 PM"

    // // Combine formatted date and time
    // const displayString = `${formattedDate} | ${formattedTime}`;

    // console.log(displayString);
    console.log('eventDetail res: ', eventDetail);
    setEventDetail(eventDetail.data);
  };

  const myTime = new Date(eventDetail?.date);
  const handleGetTicket = () => {
    router.push(`/checkout/${params.id}`); // Navigate to /checkout/[id]
  };

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    handleGetDetailEvent();
    fetchReviews();
  }, []);

  useEffect(() => {
    console.log('eventDetail: ', eventDetail);
  }, [eventDetail]);

  const fetchReviews = async () => {
    const data = await getReviewsByEvent(params.id);
    console.log('review:', data);
    setReviews(data.data);
  };

  return (
    <article className="m-2 px-4">
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />

        <img
          src={`data:image/png;base64,${eventDetail?.image}`}
          width={718}
          height={404}
          className="aspect-square h-full w-full object-center object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-auto md:w-2/3 justify-start m-2">
          <h1 className="font-bold capitalize text-black text-2xl md:text-4xl leading-normal">
            {eventDetail?.title}
          </h1>
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Date and Time</h2>
            <p className="text-sm">
              {new Date(eventDetail?.date?.split('T')[0]).toLocaleString(
                'en-GB',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                },
              ) +
                '   |   ' +
                myTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
            </p>
            <h2 className="mt-6 font-semibold text-lg">Location</h2>
            <p className="text-sm">{eventDetail?.location}</p>
            <h4 className="mt-6 font-semibold text-lg">About This Event</h4>
            <p className="text-sm">{eventDetail?.description}</p>
          </div>
          <h2 className="mt-6 font-semibold text-lg">Organized by</h2>
          <div className="mt-6 w-auto p-4 border pl-10 border-gray-500 rounded-lg">
            <h5 className="font-semibold">
              {eventDetail?.user?.first_name} {eventDetail?.user?.last_name}
            </h5>
            <h5>Event Organizer</h5>
          </div>
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-lg font-bold mb-4">User Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold">
                      {review?.user?.first_name} {review?.user?.last_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(
                        review?.created_at?.split('T')[0],
                      ).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>

                    {/* Star Rating Section */}
                    <div className="flex items-center mt-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < review?.rating ? (
                          <FaStar key={i} className="text-xl" />
                        ) : (
                          <FaRegStar key={i} className="text-xl" />
                        ),
                      )}
                    </div>

                    <p className="mt-2 text-gray-800">{review?.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-base">No reviews available.</p>
            )}
          </div>
        </div>

        <div>
          <Card className="w-auto md:w-full my-2 mx-2 lg:mx-16">
            <p className="hidden md:flex text-red-400 font-bold text-lg justify-center">
              {eventDetail?.price === 0
                ? 'Free'
                : `IDR ${eventDetail?.price?.toLocaleString()}`}
            </p>
            <p className="text-center text-sm text-red-600">
              {eventDetail?.availableSeats}{' '}
              <span className="text-black">Available Seats</span>
            </p>
            <Button
              className="bg-red-400 hover:bg-red-500"
              onClick={handleGetTicket} // Use the handler for navigation
            >
              GET TICKET
            </Button>
          </Card>
        </div>
      </div>
    </article>
  );
};

export default EventDetails;
