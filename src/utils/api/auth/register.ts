import axios from 'axios';

import { API_URL } from '../../../config';
import { RegisterDetails } from '../../../types';

export default async function register(details: RegisterDetails) {
//   
  try {
    const response = await axios.post(`${API_URL}/auth/register`, details);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
}
