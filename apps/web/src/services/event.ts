'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment-timezone';

const BASE_URL = 'http://localhost:8000';
// get event all
const getEventList = async (category?: string) => {
  try {
    const response = await axios.get(BASE_URL + '/events', {
      params: category ? { category } : {},
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export { getEventList };
//get event by id
export const getDetailDataEvent = async (id: string) => {
  try {
    const response = await axios.get(BASE_URL + '/events/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const createEventProcess = async (data: {
  event_title: string;
  location: string;
  description: string;
  event_type: string;
  total_transaction_discount: number;
  total_seat: number;
  category: string;
  price: number;
  event_image: string;
  event_date: string;
  event_time: string;
}) => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }
    console.log('event Date:', data.event_date);
    console.log('event Time:', data.event_time);

    const eventDate = new Date(data.event_date); // Ensure it's a Date object
    const formattedDate = moment(eventDate).format('YYYY-MM-DD'); // Convert to proper format

    const combinedDateTimeString = `${formattedDate} ${data.event_time}`;

    const eventDateTimeInUTC = moment
      .tz(combinedDateTimeString, 'YYYY-MM-DD HH:mm', 'Asia/Jakarta') // Specify format
      .utc()
      .toISOString();
    // const timeLocal = moment
    //   .utc(data.event_date)
    //   .tz('Asia/Jakarta')
    //   .format('YYYY-MM-DD HH:mm:ss');

    const reqBody = {
      title: data.event_title,
      description: data.description,
      location: data.location,
      date: eventDateTimeInUTC,
      event_type: data.event_type,
      price: data.price,
      total_seat: data.total_seat,
      total_transaction_discount: data.total_transaction_discount,
      category: data.category,
      image: data.event_image,
    };

    console.log(reqBody);

    // if (isNaN(combinedDate.getTime())) {
    //   throw new Error('Invalid date or time provided');
    // }

    return await axios.post(BASE_URL + '/events', reqBody, {
      headers: {
        Authorization: newToken,
      },
    });
  } catch (err: any) {}
};

// services/eventService.ts

// export const getEventDetails = async (eventId: string) => {
//   try {
//     const response = await fetch(`/api/events/${eventId}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching event details:', error);
//     throw error;
//   }
// };

export async function getEventListbyId(data: { content: string }) {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }

    return await axios.post(
      BASE_URL + '/events/:id',
      {
        content: data.content,
      },
      {
        headers: {
          Authorization: newToken,
        },
      },
    );
  } catch (err: any) {}
}

export const searchEvents = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/search`, {
      params: { search: query },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching for events:', error);
    return [];
  }
};

export const getEventByUserId = async () => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }
    return await axios.get(BASE_URL + '/events/user', {
      headers: {
        Authorization: newToken,
      },
    });
  } catch (error) {
    console.error('Error searching for events:', error);
    return [];
  }
};

export const editEventByEO = async (
  eventId: string,
  data: {
    event_title: string;
    location: string;
    description: string;
    event_type: string;
    total_transaction_discount: number;
    total_seat: number;
    category: string;
    price: number;
    event_image: string;
    event_date: string;
    event_time: string;
  },
) => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }
    const timeLocal = moment
      .utc(data.event_date)
      .tz('Asia/Jakarta')
      .format('YYYY-MM-DD HH:mm:ss');

    const reqBody = {
      title: data.event_title,
      description: data.description,
      location: data.location,
      date: timeLocal,
      event_type: data.event_type,
      price: data.price,
      total_seat: data.total_seat,
      total_transaction_discount: data.total_transaction_discount,
      category: data.category,
      image: data.event_image,
    };

    return await axios.patch(BASE_URL + '/events/' + eventId, reqBody, {
      headers: {
        Authorization: newToken,
      },
    });
  } catch (error) {
    console.error('Error searching for events:', error);
    return [];
  }
};

export const softDeleteEvent = async (eventId: number): Promise<void> => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }
    return await axios.delete(`${BASE_URL}/events/${eventId}`, {
      headers: {
        Authorization: newToken,
      },
    });
  } catch (error) {
    console.error('Error soft deleting event:', error);
    throw error; // Propagate error to be handled in UI
  }
};
