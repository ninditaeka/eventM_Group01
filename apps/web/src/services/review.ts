'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000';

// Submit a review
export const submitReview = async (data: {
  eventId: any;
  rating: number;
  comment: string;
}) => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }

    const reqBody = {
      eventId: data.eventId,
      rating: data.rating,
      comment: data.comment,
    };

    return await axios.post(BASE_URL + '/reviews', reqBody, {
      headers: {
        Authorization: newToken,
      },
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Fetch reviews for a specific event (if needed later)
export const getReviewsByEvent = async (eventId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
