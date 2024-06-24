import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import API from '../utils/api';
import './AdminDashboard.css'; // Import a CSS file for styling
import { useNavigate, Link } from 'react-router-dom';

const ApprovedLeave = () => {


  const navigate = useNavigate()
  const [attendance, setAttendance] = useState([]);
  const [myData, setMyData] = useState(null);
  const [myData1, setMyData1] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [rollNumber, setRollNumber] = useState('');
  const [atten, setAtten] = useState('');
  const [selectDate, setSelectDate] = useState('');


  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const fetchAttendance = async () => {
    try {
      const res = await API.get('/admin/attendance');
      const leaveData = res.data.filter(item => {
        const itemDate = item.date
        console.log(itemDate)
        return item.status === 'leave' && item.date === itemDate
      });
      setAttendance(leaveData);
      console.log(attendance)
    } catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null || role === 'user') {
      navigate('/')
    }
    fetchAttendance();
  }, []);

  const ApproevSubmit = async () => {
    if (atten === '' || selectDate === '' || rollNumber === '') {
      alert('Plz Enter Roll_Number, Date, Select Attendance First');
      return;
    }

    try {
      const res = await API.put('/admin/approvedleave', { roll: rollNumber, status: atten, date: selectDate });
      console.log('this', res)
      alert('Approved/Disapproved Successfully');
      fetchAttendance()

    } catch (err) {
      console.error(err.response.data);
    }

  };


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };




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

          <div>
            <Typography variant="h4" gutterBottom>
              Approved Student Leave
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Roll Number</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Leave Status</TableCell>
                    <TableCell>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendance.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.rollNumber}</TableCell>
                      <TableCell>{formatDate(row.date)}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
              <TextField
                label="Roll Number"
                variant="outlined"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
              <TextField
                label="Select Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={selectDate}
                onChange={(e) => setSelectDate(e.target.value)}

              />
              <div>
                <Stack style={{ marginTop: 10 }} direction="row" spacing={2}>
                  <Button variant="contained" onClick={handleClick} color="primary">
                    Mark Attendance
                  </Button>
                </Stack>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={() => { setAtten('present'); handleClose() }}>Present</MenuItem>
                  <MenuItem onClick={() => { setAtten('absent'); handleClose() }}>Absent</MenuItem>
                </Menu>
              </div>
              <Button variant="contained" color="primary" onClick={ApproevSubmit}>
                Approved Leave Submit
              </Button>
            </Box>
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

export default ApprovedLeave;
