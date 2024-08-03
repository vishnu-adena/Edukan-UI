import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Container, Grid, Paper, Modal, TextField, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useAuth from '@/customhooks/useAuth';
import { product } from '@/apiUtils/productsapi';
import { Card } from '@/components/product';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user, isLoggedIn,token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: null as File | null,
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await product.get('/api/productservice/products/user');
      setProducts(response?.data);
      console.log(1234, response);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setFormData((prevData) => ({ ...prevData, image: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image as Blob);
    formDataToSend.append('product', JSON.stringify({
      title: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
    }));

    try {
      const response = await axios.post('/api/productservice/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token here
        },
      });
      fetchCards(); // Refresh the product list
      handleClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
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
                <span className="text-xl font-bold">{user?.name}</span>
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
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Product
              </Button>
              <div className="flex flex-wrap justify-between p-6">
                {products.map((card: any, index: any) => (
                  <Card key={index} {...card} />
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" component="h2">
            Add New Product
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Product Description"
            name="description"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Product Price"
            name="price"
            type="number"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="category"
            label="Product Category"
            name="category"
            onChange={handleChange}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Product
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DashboardPage;
