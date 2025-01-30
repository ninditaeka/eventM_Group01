'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000';
export interface ICreatePayment {
  price_paid?: number;
  checkoutId?: number;
  eventId: number;
}

export const createPaymentProcess = async (data: ICreatePayment) => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }
    const reqBody = {
      checkoutId: data.checkoutId,
      price_paid: data.price_paid,
      eventId: data.eventId,
    };
    console.log(reqBody);

    // if (isNaN(combinedDate.getTime())) {
    //   throw new Error('Invalid date or time provided');
    // }

    const response = await axios.post(`${BASE_URL}/payments`, reqBody, {
      headers: {
        Authorization: newToken,
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('Error in createPayment:', err);
    throw new Error(err.response?.data?.message || 'Failed to create checkout');
  }
};

export const paymentById = async (id: number) => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }

    // Use a GET request and pass the `id` dynamically in the URL
    const response = await axios.get(`${BASE_URL}/payment/${id}`, {
      headers: {
        Authorization: newToken,
      },
    });

    return response.data;
  } catch (err: any) {
    console.error('Error in paymentById:', err);
    throw new Error(
      err.response?.data?.message || 'Failed to get checkout by ID',
    );
  }
};
