import React, { useEffect, useState } from 'react';
import {Avatar, Typography } from '@mui/material';
import API from '../utils/api';
import './AdminDashboard.css'; // Import a CSS file for styling
import { useNavigate, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const ShowRecord = () => {


  const navigate = useNavigate()

  const [myData, setMyData] = useState(null);
  const [myData1, setMyData1] = useState(null);

  const [data, setData] = useState([])

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null || role === 'user') {
      navigate('/')
    }
    const fetchAttendance = async () => {
      try {
        const res = await API.get('/admin/users');
        setData(res.data)
        console.log(res.data)
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchAttendance();
  }, []);



  const [isMenuOpen, setIsMenuOpen] = useState(true);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null || role === 'user') {
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
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('avatar');
    localStorage.removeItem('email');
    localStorage.removeItem('rollNumber')
    localStorage.removeItem('role');
    navigate('/'); // Redirect to login after logout
  };



  return (
    <div className="dashboard">

      <div className={`sidebar ${isMenuOpen ? 'menu-visible' : 'menu-hidden'}`}>

        <div style={styles.profileSection}>
          <img src={myData} alt="Profile" style={styles.profileImage} />
          <h3>{myData1}</h3>
        </div>

        <ul>
          <li className='menuHover'><Link to="/profile">Profile</Link></li>
          <li className='menuHover'><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className='menuHover'><Link to="/showAllRecord">Show Student Record</Link></li>
          <li className='menuHover'><Link to="/approved-leave">Approved Leave</Link></li>
          <li className='menuHover'><Link to="/count-attendance">Count Attendance</Link></li>
          <li className='menuHover'><Link to="/user-report">Generate User Report</Link></li>
          <li className='menuHover'><Link to="/system-report">Generate System Report</Link></li>
        </ul>
      </div>

      <div className="main-content">

        <div className="topbar">
          <button style={styles.logoutButton} className="toggle-button" onClick={toggleMenu}>
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          <div className="profile">
            <span>Admin</span>
            <button style={styles.logoutButton} onClick={() => logout()}>Logout</button>
          </div>
        </div>



        <div className="content">
          <h1 style={{ marginBottom: 5 }}>Admin Dashboard</h1>
          <TableContainer sx={{ margin: '20px' }} component={Paper}>
            <Typography variant="h4" gutterBottom>
              Show All Student Record
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Roll</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell><Avatar alt={user.name} src={user.avatar} /></TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.rollNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default ShowRecord;
