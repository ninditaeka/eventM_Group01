const BASE_URL = 'http://localhost:8000';

const getEventList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error('Unexpected status code:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export { getEventList };

// services/eventService.ts

export const getEventDetails = async (eventId: string) => {
  try {
    const response = await fetch(`/api/events/${eventId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};
