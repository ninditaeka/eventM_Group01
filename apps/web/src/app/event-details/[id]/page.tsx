'use client';

import Image from 'next/image';
import React from 'react';
import Gambar2 from '../../../../public/Sporting Activities Image1.jpeg';
import { Rating } from 'flowbite-react';
import { Label, Textarea } from 'flowbite-react';

const EventDetails = () => {
  return (
    <article className="m-2 px-4">
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full py-28 items-center justify-center absolute"></div>
        <div className=" absolute top-0 left-0 right-0 bottom-0 h-full bg-black/60 rounded-lg" />
        <Image
          src={Gambar2}
          alt="image"
          width={718}
          height={404}
          className="aspect-square h-full w-full object-center object-cover rounded-lg"
        />
      </div>

      <div className="justify-start m-4 grid">
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
            compete in different categories such as Hatha, Vinyasa, and Ashtanga
            yoga. The competition focuses on evaluating participants' strength,
            flexibility, balance, and overall performance in various asanas. The
            event also includes workshops, masterclasses, and interactive
            sessions with renowned yoga instructors and practitioners. It's a
            fantastic opportunity for yoga enthusiasts to showcase their skills,
            learn from experts, and connect with fellow yogis from around the
            world.
          </p>
        </div>
        <h2 className="mt-6 font-semibold text-lg">Orgenized by</h2>
        <div className="mt-6 w-1/3 p-4 border pl-10 border-black rounded-lg">
          <h5 className="font-semibold">event_orgenizer</h5>
          <h5>1 event</h5>
        </div>
        <div className="w-1/2 mt-6 p-4 border border-gray-500 rounded-lg">
          <h2 className="font-semibold text-base text-pink-600">
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
        </div>
      </div>
    </article>
  );
};

export default EventDetails;
