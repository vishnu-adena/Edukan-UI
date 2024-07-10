import axios from 'axios';
import { useState } from 'react';

export const getAuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;
  const authorizationUrl = process.env.NEXT_PUBLIC_OAUTH_AUTHORIZATION_URL;
  const scope = process.env.NEXT_PUBLIC_OAUTH_SCOPE;

  return `${authorizationUrl}?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
};


export const fetchToken = async (code:any) => {

  const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET;
  const grantType = 'authorization_code';
  const redirectUri:any = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;
  const tokenUrl:any = process.env.NEXT_PUBLIC_OAUTH_TOKEN_URL

  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', grantType);
  requestBody.append('code', code);
  requestBody.append('redirect_uri', redirectUri);

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${basicAuth}`
  };

  try {
    debugger
    const response = await axios.post(tokenUrl, requestBody.toString(), { headers });
    return (response.data)
  } catch (error) {
    console.log(error);
    alert(error)
  }}
;


export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

export const setAccessToken = (token: string) => {
  if (typeof window !== null) {
    localStorage.setItem('access_token', token);
  }
};

export const removeAccessToken = (token:any) => {
  if (typeof window !== null) {
    localStorage.removeItem('access_token');
  }
}

export const getAuthHeader = () => {
  const token = getAccessToken();
  return token
}