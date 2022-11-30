import axios from 'axios';

import { API_URL } from '../../../config';
import { LoginDetails } from '../../../types';

export default async (details: LoginDetails) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, details);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
