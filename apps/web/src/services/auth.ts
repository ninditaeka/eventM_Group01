'use client';
import axios, { AxiosError } from 'axios';

import Cookie from 'js-cookie';

const BASE_URL = 'http://localhost:8000';

export async function authLogin(data: { email: string; password: string }) {
  const { email, password } = data;
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      const { id, firstName, lastName, email, token } = response.data.data;

      Cookie.set('token', token);
      Cookie.set(
        'user',
        JSON.stringify({
          id,
          firstName,
          lastName,
          email,
        }),
      );
    } else {
      alert(response.data.data.message);
    }
  } catch (error) {
    // Handle the error here
    if (axios.isAxiosError(error)) {
      // If the error is an Axios error
      alert(error.response?.data?.message || 'An error occurred during login.');
    } else {
      // Handle other types of errors
      alert('An unexpected error occurred.');
    }
  }
}

export async function authRegister(data: {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: string;
  referral_code?: string;
  referral_code_use?: string;
}): Promise<any> {
  const {
    first_name,
    last_name,
    email,
    password,
    role,
    referral_code,
    referral_code_use,
  } = data;

  console.log(`referral code:${referral_code}`);
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      first_name,
      last_name,
      email,
      password,
      role,
      referral_code,
      referral_code_use,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log the entire error object for more context
      console.error('Axios error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      // You can throw a custom error or return a specific message
      throw new Error(error.response?.data?.message || 'Registration failed');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const checkReferralCode = async (code: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/check-referral-code/${code}`,
    );
    return response.data; // This will return { exists: true/false }
  } catch (error) {
    console.error('Error checking referral code:', error);
    throw new Error('Error checking referral code.');
  }
};
// 'use client';

// import Cookie from 'js-cookie';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:8000';

// export async function authLogin(data: { email: string; password: string }) {
//   const { email, password } = data;
//   const response = await axios.post(`${BASE_URL}/auth/login`, {
//     email,
//     password,
//   });

//   if (response.status == 200) {
//     const { id, firstName, lastName, email, token } = response.data.data;

//     Cookie.set('token', token);
//     Cookie.set(
//       'user',
//       JSON.stringify({
//         id,
//         firstName,
//         lastName,
//         email,
//       }),
//     );
//   } else {
//     alert(response.data.data.message);
//   }
// }

// export async function authRegister(data: {
//   first_name: string;
//   last_name: string;
//   password: string;
//   email: string;
//   role: string;
//   referral_code?: string;
// }) {
//   const { first_name, last_name, email, password, role, referral_code } = data;

//   return await axios.post(`${BASE_URL}/auth/register`, {
//     first_name,
//     last_name,
//     email,
//     password,
//     role,
//     referral_code,
//   });
// }
