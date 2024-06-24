import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Avatar, Grid } from '@mui/material';
import API from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
    rollNumber: ''
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === 'admin') {
      navigate('/admin-dashboard')
    }
    if (role === 'user') {
      navigate('/user-dashboard')
    }
  });

  const { name, email, password, rollNumber } = formData;

  async function uploadImage() {
    const data = new FormData();
    data.append("file", formData.avatar);
    data.append("upload_preset", "oo76bqt8");
    console.log(data)
    try {
        
        let res = await fetch("https://api.cloudinary.com/v1_1/dvrxdremd/image/upload", {
            method: "post",
            body: data,
        });
        const urlData = await res.json();
        
        return urlData.url;
    } catch (error) {
        console.log(error);
    }
}

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      

      const file = e.target.files[0];
      if (file.size >= 1048576) {
        return alert("Max file size is 1mb");
      } else {
        setFormData({ ...formData, avatar: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });

    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.avatar) return alert("Please upload your profile picture");
    const url = await uploadImage(formData.avatar);
    setFormData({ ...formData, avatar: url });
    console.log(url)
    try {
      
      const res = await API.post('/users/register', {formData,url})
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name',res.data.name)
      localStorage.setItem('avatar',res.data.avatar)
      localStorage.setItem('id',res.data.id)
      localStorage.setItem('email',res.data.email)
      localStorage.setItem('rollNumber',res.data.rollNumber)
      localStorage.setItem('grade',res.data.grade)
      localStorage.setItem('role',res.data.role)
      navigate('/user-dashboard');
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
          Register
        </Typography>
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Avatar src={preview} alt="Profile Image" sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                type="text"
                value={name}
                onChange={onChange}
                margin="normal"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Roll Number"
                name="rollNumber"
                type="text"
                value={rollNumber}
                onChange={onChange}
                margin="normal"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Profile Image
                <input
                  type="file"
                  name="avatar"
                  accept='image/*'
                  onChange={onChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
