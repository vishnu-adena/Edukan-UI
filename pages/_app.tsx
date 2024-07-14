import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <AuthProvider>
      <Layout {...{}}>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
  );
};

export default MyApp;
