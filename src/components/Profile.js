import React, { useEffect, useState } from 'react';
import { Avatar, Container, Typography, Paper, Input, Button } from '@mui/material';
import API from '../utils/api';
import './AdminDashboard.css'; // Import a CSS file for styling
import { useNavigate, Link } from 'react-router-dom';


const Profile = () => {


    const navigate = useNavigate()
    const [myData, setMyData] = useState(null);
    const [myData1, setMyData1] = useState(null);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [roll, setRoll] = useState(null);
    const [grade, setGrade] = useState(null)
    const [role, setRole] = useState(null)



    useEffect(() => {

        // Retrieve the data from localStorage
        const avatar1 = localStorage.getItem('avatar');
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const roll = localStorage.getItem('rollNumber')
        const grade = localStorage.getItem('grade');
        const role = localStorage.getItem('role')

        setName(name);
        setEmail(email)
        setAvatar(avatar1)
        setRoll(roll)
        setGrade(grade)
        setRole(role)

    }, []);



    const [isMenuOpen, setIsMenuOpen] = useState(true);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const role1 = localStorage.getItem('role')
        if (role1 === null) {
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

                { }

                {role === 'admin' &&
                    <ul>
                        <li className='menuHover'><Link to="/profile">Profile</Link></li>
                        <li className='menuHover'><Link to="/admin-dashboard">Dashboard</Link></li>
                        <li className='menuHover'><Link to="/showAllRecord">Show Student Record</Link></li>
                        <li className='menuHover'><Link to="/approved-leave">Approved Leave</Link></li>
                        <li className='menuHover'><Link to="/count-attendance">Count Attendance</Link></li>
                        <li className='menuHover'><Link to="/user-report">Generate User Report</Link></li>
                        <li className='menuHover'><Link to="/system-report">Generate System Report</Link></li>
                    </ul>
                }
                {role === 'user' &&
                    <ul>
                        <li className='menuHover'><Link to="/profile">Profile</Link></li>
                        <li className='menuHover'><Link to="/user-dashboard">Dashboard</Link></li>
                        <li className='menuHover'><Link to="/send-leave-request">Leave Request</Link></li>
                    </ul>
                }


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
                    <Container maxWidth="sm">
                        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
                            <Avatar
                                alt={name}
                                src={avatar}
                                sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
                            />
                            <Typography variant="h5" gutterBottom>
                                {name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                {email}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                {roll}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Grade: {grade}
                            </Typography>
                        </Paper>

                    </Container>
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

export default Profile;
