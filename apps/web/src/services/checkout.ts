'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000';
export interface ICreateCheckout {
  discount_coupon_use?: number;
  point_balance_use?: number;
  discount_nominal_use?: number;
  final_price: number;
  eventId: number;
}

export const createCheckoutProcess = async (data: ICreateCheckout) => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }
    const reqBody = {
      discount_coupon_use: data.discount_coupon_use,
      point_balance_use: data.point_balance_use,
      final_price: data.final_price,
      discount_nominal_use: data.discount_nominal_use,
      eventId: data.eventId,
    };
    console.log(reqBody);

    // if (isNaN(combinedDate.getTime())) {
    //   throw new Error('Invalid date or time provided');
    // }

    const response = await axios.post(`${BASE_URL}/checkouts`, reqBody, {
      headers: {
        Authorization: newToken,
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('Error in createCheckout:', err);
    throw new Error(err.response?.data?.message || 'Failed to create checkout');
  }
};

export const checkoutById = async (id: number) => {
  try {
    let newToken = '';
    if (Cookies.get('token')) {
      newToken = 'Bearer ' + Cookies.get('token');
    }

    // Use a GET request and pass the `id` dynamically in the URL
    const response = await axios.get(`${BASE_URL}/checkouts/${id}`, {
      headers: {
        Authorization: newToken,
      },
    });

    return response.data;
  } catch (err: any) {
    console.error('Error in checkoutById:', err);
    throw new Error(
      err.response?.data?.message || 'Failed to get checkout by ID',
    );
  }
};
