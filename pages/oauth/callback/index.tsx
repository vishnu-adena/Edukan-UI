import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchToken, setAccessToken } from '../../../utils/auth';

const Callback: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const handleAuth = async () => {
            const code = router.query.code as string;
            if (code) {
                try {
                    const tokenData = await fetchToken(code);
                    setAccessToken(tokenData?.access_token);
                    router.push('/');
                } catch (error) {
                    console.error('Error fetching token:', error);
                }
            }
        };

        handleAuth();
    }, [router]);

    return <div>Loading...</div>;
};

export default Callback;
