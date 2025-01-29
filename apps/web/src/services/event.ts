import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment-timezone';

const BASE_URL = 'http://localhost:8000';
// get event all
const getEventList = async () => {
  try {
    const response = await axios.get(BASE_URL + '/events');

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
    const { event_date, event_time } = data;
    const combinedDate = new Date(`${event_date}T${event_time}:00`);
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
    const response = await axios.get(`${BASE_URL}/events`, {
      params: { search: query },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching for events:', error);
    return [];
  }
};
