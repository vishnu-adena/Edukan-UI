import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {CircularLoading} from '@/commonHelpers/circularLoading';
// import { useAuth } from '../../../contexts/AuthContext';

const Callback: React.FC = () => {
  const router = useRouter();
//   const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const tokenUrl = '/api/userservice/oauth2/token'
  const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET;


  useEffect(() => {
    const handleAuth = async () => {
      if (router.isReady) {
        const code = router.query.code as string;
        if (code) {
          const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
          try {
            const response = await axios.post(`${tokenUrl}`, { code },
                {
                    headers: {
                      'Authorization': `Basic ${basicAuth}`,
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
                  }
            );
            const { access_token} = response.data;
            localStorage.setItem('token', access_token);
            // setUser(user);
            router.push('/');
          } catch (error) {
            console.error('Error fetching token:', error);
          }
        }
        setLoading(false);
      }
    };

    handleAuth();
  }, [router.isReady, router.query.code]);

  return <div>{loading ? <CircularLoading/> : 'Redirecting...'}</div>;
};

export default Callback;
