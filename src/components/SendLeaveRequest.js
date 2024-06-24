import React, { useEffect, useState } from 'react';
import './SendLeaveRequest.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import './AdminDashboard.css'

const SendLeaveRequest = () => {

  const navigate = useNavigate();
  const [myData, setMyData] = useState(null);
  const [myData1, setMyData1] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [formData, setFormData] = useState({ date: '', reason: '' });

  const { date, reason } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/leave', formData);
      alert('Leave request sent successfully');
      // Optionally, you can reset the form after successful submission
      setFormData({ date: '', reason: '' });
      navigate('/user-dashboard')

    } catch (err) {
      console.error(err.response.data);
      alert('Failed to send leave request');
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null || role === 'admin') {
      navigate('/')
    }
    if (window.innerWidth <= 500) {
      setIsMenuOpen(false)
    }
    // Retrieve the data from localStorage
    const data = localStorage.getItem('avatar');
    const data1 = localStorage.getItem('name');

    // Update the state with the retrieved data
    if (data) {
      setMyData(data);
      setMyData1(data1)
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('avatar');
    localStorage.removeItem('email');
    localStorage.removeItem('rollNumber')
    localStorage.removeItem('grade')
    localStorage.removeItem('role')
    navigate('/'); // Redirect to login after logout
  };

  return (
    <div style={styles.dashboardContainer}>

      <div className={`sidebar ${isMenuOpen ? 'menu-visible' : 'menu-hidden'}`}>
        <div style={styles.profileSection}>
          <img src={myData} alt="Profile" style={styles.profileImage} />
          <h3>{myData1}</h3>
        </div>
        <ul>
          <li className='menuHover'><Link to="/profile">Profile</Link></li>
          <li className='menuHover'><Link to="/user-dashboard">Dashboard</Link></li>
          <li className='menuHover'><Link to="/send-leave-request">Leave Request</Link></li>
        </ul>
      </div>


      <div style={styles.mainContent}>

        <div className="topbar">
          <button style={styles.logoutButton} className="toggle-button" onClick={toggleMenu}>
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          <div className="profile">
            <span>User</span>
            <button style={styles.logoutButton} onClick={() => logout()}>Logout</button>
          </div>
        </div>



        <div style={styles.content}>
          <h1>User Dashboard</h1>
          <div>
            <form className="leave-request-form" onSubmit={onSubmit}>
              <h1 style={{ marginBottom: 5 }}>Leave Request Reason</h1>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reason">Reason:</label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={onChange}
                  placeholder="Reason for leave"
                  required
                />
              </div>
              <button type="submit">Send Leave Request</button>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  profileSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    margin: '10px 0',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
  },
  topbarProfileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  content: {
    marginTop: '20px',
  },
};

export default SendLeaveRequest;
