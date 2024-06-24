import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import './AdminDashboard.css'; // Import a CSS file for styling
import { useNavigate, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { TextField, Box, Typography } from '@mui/material';


const UserReport = () => {

    const navigate = useNavigate()
    const [attendance, setAttendance] = useState([]);
    const [report, setReport] = useState([]);
    const [userId, setUserId] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [myData, setMyData] = useState(null);
    const [myData1, setMyData1] = useState(null);



    const [isMenuOpen, setIsMenuOpen] = useState(true);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'present':
                return green[500];
            case 'absent':
                return red[500];
            case 'leave':
                return yellow[700];
            default:
                return 'inherit';
        }
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
    

    const generateUserReport = async () => {
        try {
            const res = await API.post('/admin/user-report', { userId, from: fromDate, to: toDate });
            console.log(res.data)
            setReport(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

  
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

                    <h2 style={{ margin: "10px 0" }}>Generate User Report</h2>
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="User ID"
                                variant="outlined"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}

                            />
                            <TextField
                                label="From Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}

                            />
                            <TextField
                                label="To Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={generateUserReport}>
                                Generate Report
                            </Button>
                        </Box>
                    </Box>

                    <h2 style={{ marginTop: 20 }}>Report</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Roll Number</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {report.map((record) => (
                                    <TableRow key={record._id}>
                                        <TableCell>{record.rollNumber}</TableCell>
                                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                        <TableCell style={{ color: getStatusColor(record.status) }}>{record.status}</TableCell>
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

export default UserReport;
