'use client';

import axios from 'axios';
import { profile } from 'console';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000';

const profileData = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(BASE_URL + '/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === 'success') {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};

export default profileData;
