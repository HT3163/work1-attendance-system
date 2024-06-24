import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Input, MenuItem, Menu } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './AdminDashboard.css'

const UserDashboard = () => {



  const [attendance, setAttendance] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const [myData, setMyData] = useState(null);
  const [myData1, setMyData1] = useState(null);


  const [anchorEl, setAnchorEl] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const [isMenuOpen, setIsMenuOpen] = useState(true);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchAttendance = async () => {
    try {
      const res = await API.get('/users/attendance');
      setAttendance(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };


  const handleShowAttendance = () => {
    setShowTable(true);
    fetchAttendance();
  };



  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null || role === 'admin') {
      navigate('/')
    }


    if(window.innerWidth <=500){
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
  }, [avatar]);


  const onChange = (e) => {
    const file = e.target.files[0]
    if (file?.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else if (file?.size < 1048576) {
      setAvatar(e.target.files[0]);
    }
  };

  async function uploadImage() {
    const data = new FormData();
    data.append("file", avatar);
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

  const updateProfilePicture = async () => {
    if (!avatar) return alert("Please upload your profile picture");
    const url = await uploadImage(avatar);
    const formData = new FormData();

    formData.append('url', url);

    try {
      await API.put('/users/profile', formData);
      alert('Profile picture updated successfully');
      localStorage.setItem('avatar', url)
      setAvatar(url)
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const markAttendance = async (status) => {
    try {
      await API.post('/users/attendance', { status });
      alert('Attendance marked successfully');
      fetchAttendance();
    } catch (err) {
      console.error(err.response.data);
    }
    // navigate('/send-leave-request')
  };

  const markLeave = () => {
    navigate('/send-leave-request')
  }

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



      {/* <div style={styles.sidebar}>
        <div style={styles.profileSection}>
          <img src={myData} alt="Profile" style={styles.profileImage} />
          <h3>{myData1}</h3>
        </div>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/profile">Show Profile</Link></li>
          <li style={styles.navItem}><Link to="/send-leave-request">Leave Request</Link></li>
          </ul>
          </div> */}

      <div className={`sidebar ${isMenuOpen ? 'menu-visible' : 'menu-hidden'}`}>
        <div style={styles.profileSection}>
          <img src={myData} alt="Profile" style={styles.profileImage} />
          <h3>{myData1}</h3>
        </div>
        <ul>
          <li className='menuHover'><Link to="/profile">Profile</Link></li>
          <li className='menuHover'><Link to="/send-leave-request">Leave Request</Link></li>
        </ul>
      </div>


      <div style={styles.mainContent}>

        {/* <div style={styles.topbar}>
          <img src={myData} alt="Profile" style={styles.topbarProfileImage} />
          <button onClick={logout} style={styles.logoutButton}>Logout</button>
        </div> */}

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
            <Stack style={{ marginTop: 10 }} direction="row" spacing={2}>
              <Button variant="contained" onClick={handleClick} color="primary">
                Mark Attendance
              </Button>
              <Button variant="contained" onClick={markLeave} color="primary">
                Mark Leave
              </Button>
              <Button variant="contained" onClick={handleShowAttendance} color="secondary">
                Show Attendance
              </Button>
            </Stack>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { markAttendance('present'); handleClose() }}>Present</MenuItem>
              <MenuItem onClick={() => { markAttendance('absent'); handleClose() }}>Absent</MenuItem>
            </Menu>
            {showTable && (<>
              <Typography style={{ marginTop: 20 }} variant="h5" component="h2" gutterBottom>
                Attendance Records
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendance.map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>)}
          </div>


          <h2 style={{ marginTop: 20 }}>Edit Profile Picture</h2>
          <Input type="file" onChange={onChange} />

          <Button style={{ marginLeft: 10 }} onClick={updateProfilePicture}>Update Profile Picture</Button>

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

export default UserDashboard;
