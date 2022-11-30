import axios from 'axios';

import { API_URL } from '../../../config';

export default async function hasAcess({
  userId,
  requiredRights,
  token,
}: {
  userId: string;
  requiredRights: string[];
  token: string;
}) {
  try {
    const response = await axios.post(
      `${API_URL}/misc/hasAcess/${userId}`,
      {
        rights: requiredRights,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({ response });
    // if status 204 then user has access
    return response.status === 204; // no content
  } catch (error) {
    console.log(error);
    return false;
  }
}
