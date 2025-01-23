'use client';

import Image from 'next/image';
import React from 'react';
import Gambar2 from '../../../../public/Sporting Activities Image1.jpeg';
import { Button, Card, Rating } from 'flowbite-react';
import { Label, Textarea } from 'flowbite-react';

const EventDetails = () => {
  return (
    <article className="m-2 px-4">
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className=" absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
        <Image
          src={Gambar2}
          alt="image"
          width={718}
          height={404}
          className="aspect-square h-full w-full object-center object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-auto md:w-2/3 justify-start m-2">
          <h1 className="font-bold capitalize text-black text-2xl md:text-4xl leading-normal">
            World Yoga Championship
          </h1>
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Date and Time</h2>
            <p className="text-sm">April 10-15, 2025 | 9:00 AM - 6:00 PM</p>
            <h2 className=" mt-6 font-semibold text-lg">Location</h2>
            <p className="text-sm">Taman Menteng, Jakarta</p>
            <h4 className="mt-6 font-semibold text-lg">About This Event</h4>
            <p className="text-sm">
              The World Yoga Championship is a global event that celebrates the
              art and discipline of yoga. Participants from various countries
              compete in different categories such as Hatha, Vinyasa, and
              Ashtanga yoga. The competition focuses on evaluating participants'
              strength, flexibility, balance, and overall performance in various
              asanas. The event also includes workshops, masterclasses, and
              interactive sessions with renowned yoga instructors and
              practitioners. It's a fantastic opportunity for yoga enthusiasts
              to showcase their skills, learn from experts, and connect with
              fellow yogis from around the world.
            </p>
          </div>

          <h2 className="mt-6 font-semibold text-lg">Orgenized by</h2>
          <div className="mt-6 w-auto p-4 border pl-10 border-black rounded-lg">
            <h5 className="font-semibold">event_orgenizer</h5>
            <h5>1 event</h5>
          </div>
          <div className="w-auto md:w-full mt-6 p-4 border border-gray-500 rounded-lg">
            <h2 className="font-semibold text-base text-red-400">
              Leave review
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
              className="mt-4 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              SUBMIT
            </button>
          </div>
        </div>
        <div>
          <Card className="w-auto md:w-full my-2 mx-2 lg:mx-16">
            <p className="hidden md:flex text-red-400 font-bold p-2 justify-center">
              IDR 1,500,000
            </p>
            <Button
              className="bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-pink-300"
              href="/checkout"
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
