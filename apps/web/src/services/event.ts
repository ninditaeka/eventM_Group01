import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

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

export const getDetailDataEvent = async (id: string) => {
  try {
    const response = await axios.get(BASE_URL + '/events/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
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
