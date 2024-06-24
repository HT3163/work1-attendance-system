import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import './AdminDashboard.css'; // Import a CSS file for styling
import { useNavigate, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const groupByRollNumber = (data) => {
    const groupedData = {};
    data.forEach((item) => {
        if (!groupedData[item.rollNumber]) {
            groupedData[item.rollNumber] = { present: 0, absent: 0, leave: 0 };
        }
        groupedData[item.rollNumber][item.status]++;
    });
    return groupedData;
};

const CountAttendance = () => {


    const navigate = useNavigate()

    const [myData, setMyData] = useState(null);
    const [myData1, setMyData1] = useState(null);

    const [attendance, setAttendance] = useState([]);
    const groupedData = groupByRollNumber(attendance);

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role === null || role === 'user') {
            navigate('/')
        }

        const fetchAttendance = async () => {
            try {
                const res = await API.get('/admin/attendance');
                setAttendance(res.data);
                console.log(attendance)
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

                    <div>
                        <h2 style={{ margin: "10px 0" }}>Total Num. of Present, Absent and Leave</h2>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Roll Number</TableCell>
                                        <TableCell>Present</TableCell>
                                        <TableCell>Absent</TableCell>
                                        <TableCell>Leave</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(groupedData).map((rollNumber) => (
                                        <TableRow key={rollNumber}>
                                            <TableCell>{rollNumber}</TableCell>
                                            <TableCell>{groupedData[rollNumber].present}</TableCell>
                                            <TableCell>{groupedData[rollNumber].absent}</TableCell>
                                            <TableCell>{groupedData[rollNumber].leave}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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

export default CountAttendance;
