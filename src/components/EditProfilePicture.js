import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const EditProfilePicture = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null || role === 'admin') {
      navigate('/')
    }
  }, []);
  const [profilePicture, setProfilePicture] = useState(null);

  const onChange = (e) => setProfilePicture(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    try {
      await API.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile picture updated successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onChange} required />
      <button type="submit">Update Profile Picture</button>
    </form>
  );
};

export default EditProfilePicture;
