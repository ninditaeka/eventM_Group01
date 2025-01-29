'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Card, Rating, Textarea } from 'flowbite-react';
import { getDetailDataEvent } from '@/services/event';
import Gambar2 from '../../../../public/Sporting Activities Image1.jpeg';
import { toast, ToastContainer } from 'react-toastify';
import { submitReview } from '@/services/review';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const starDescriptions = [
  'Did not like it',
  'It was okay',
  'Liked it',
  'Really liked it',
  'It was amazing',
];

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

  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch event details (Optional)
  useEffect(() => {
    if (event) {
      axios
        .get(`/api/events/${event}`)
        .then((response) => setEvent(response.data))
        .catch((error) => console.error('Error fetching event:', error));
    }
  }, [event]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }

    try {
      await submitReview({
        rating,
        comment,
      });
      toast.success('Review submitted successfully!');
      router.push('/my-events'); // Redirect after submission
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
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

          {/* <div className="w-auto md:w-full mt-6 p-4 border border-gray-500 rounded-lg">
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
          </div> */}
          <div className="w-auto md:w-full mt-6 p-4 border border-gray-500 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-red-400">
              Leave a Review
            </h2>
            <p className="text-gray-500 mb-4 text-center">
              How would you rate your experience?
            </p>

            {/* Star Rating */}
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

            {/* Show rating description */}
            {rating > 0 && (
              <p className="text-gray-700 mb-4 text-center">
                {starDescriptions[rating - 1]}
              </p>
            )}

            {/* Review Input */}
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
