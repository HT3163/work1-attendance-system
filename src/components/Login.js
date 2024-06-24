import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import API from '../utils/api';

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === 'admin') {
      navigate('/admin-dashboard')
    }
    if (role === 'user') {
      navigate('/user-dashboard')
    }
  });

  const [formData, setFormData] = useState({ email: '', password: '' });


  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', formData);
      console.log(res)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name',res.data.name)
      localStorage.setItem('avatar',res.data.avatar)
      localStorage.setItem('id',res.data.id)
      localStorage.setItem('email',res.data.email)
      localStorage.setItem('rollNumber',res.data.rollNumber)
      localStorage.setItem('grade',res.data.grade)
      localStorage.setItem('role',res.data.role)
      
      if (res?.data?.role === 'admin') {
        
        navigate('/admin-dashboard');
      } else if (res?.data?.role === 'user') {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };
  

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
