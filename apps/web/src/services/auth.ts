'use client';

import Cookie from 'js-cookie';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export async function authLogin(data: { email: string; password: string }) {
  const { email, password } = data;
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  if (response.status == 200) {
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
}

export async function authRegister(data: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}) {
  const { firstName, lastName, email, password } = data;

  return await axios.post(`${BASE_URL}/auth/register`, {
    firstName,
    lastName,
    email,
    password,
  });
}
// const authLogin = async ({ body }: any) => {
//   const response = await fetch(`${BASE_URL}/login`, {
//     body: JSON.stringify(body),
//     // ...
//   });
//   return response;
// };

// const authRegister = async ({ body }: any) => {
//   const response = await fetch(`${BASE_URL}/register`, {
//     body: JSON.stringify({ username: 'example' }),
//     // ...
//   });
//   return response;
// };

// export { authLogin, authRegister };
