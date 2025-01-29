'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Card, Rating, Textarea } from 'flowbite-react';
import { getDetailDataEvent } from '@/services/event';
import Gambar2 from '../../../../public/Sporting Activities Image1.jpeg';

const EventDetails = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState<any>({});

  useEffect(() => {
    handleGetDetailEvent();
  }, []);

  const handleGetDetailEvent = async () => {
    const eventDetail = await getDetailDataEvent(params.id);
    setEventDetail(eventDetail.data);
  };

  const myTime = new Date(eventDetail?.date);
  const handleGetTicket = () => {
    router.push(`/checkout/${params.id}`); // Navigate to /checkout/[id]
  };

  return (
    <article className="m-2 px-4">
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
        <Image
          src={Gambar2}
          alt="Event Image"
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
            <h5 className="font-semibold">{eventDetail?.user?.email}</h5>
            <h5>{eventDetail?.totalEvents} events</h5>
          </div>

          <div className="w-auto md:w-full mt-6 p-4 border border-gray-500 rounded-lg">
            <h2 className="font-semibold text-base text-red-400">
              Leave a review
            </h2>
            <Rating className="mt-4">
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
            </Rating>
            <div className="max-w-md mt-4">
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="mt-4 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              SUBMIT
            </button>
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
              {eventDetail?.total_seat}{' '}
              <span className="text-black">seats leave</span>
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
