import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Container, Grid, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Example of checking authentication state
    const isLoggedIn = true; // Replace with your authentication check
    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page for E-DUKAN" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg" className="py-8">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <AccountCircleIcon fontSize="large" />
                <span className="text-xl font-bold">User Name</span>
              </div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DashboardIcon />}
                fullWidth
              >
                Dashboard
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                className="mt-4"
                fullWidth
              >
                Logout
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper className="p-4">
              <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
              <p>Welcome to your dashboard!</p>
              {/* Add more dashboard components and content here */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;
