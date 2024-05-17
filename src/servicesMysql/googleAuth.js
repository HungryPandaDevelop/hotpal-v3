import axios from 'axios';

export const googleAuth = async (accessToken) => {
  console.log('accessToken', accessToken)
  const googleAuthInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  return googleAuthInfo.data;
}

