import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import MarkAttendance from './components/MarkAttendance';
import ViewAttendance from './components/ViewAttendance';
import EditProfilePicture from './components/EditProfilePicture';
import SendLeaveRequest from './components/SendLeaveRequest';
import Homepage from './pages/Homepage';
import Profile from './components/Profile.js'
import ShowRecord from './components/ShowRecord.js';
import ApprovedLeave from './components/ApprovedLeave.js';
import CountAttendance from './components/CountAttendance.js';
import SystemReport from './components/SystemReport.js';
import UserReport from './components/UserReport.js';

const App = () => {

  const role = localStorage.getItem('role');
  console.log(role)

  return (

    <Router>
      
      <Routes>


        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Navigate to="/" />} />


        <Route path="/profile" element={<Profile />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/approved-leave" element={<ApprovedLeave />} />
        <Route path="/showAllRecord" element={<ShowRecord />} />
        <Route path="/count-attendance" element={<CountAttendance />} />
        <Route path="/user-report" element={<UserReport />} />
        <Route path="/system-report" element={<SystemReport />} />
        
        {/* <Route path="/mark-attendance" element={<MarkAttendance />} /> */}
        {/* <Route path="/view-attendance" element={<ViewAttendance />} /> */}



        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/edit-profile" element={<EditProfilePicture />} />
        <Route path="/send-leave-request" element={<SendLeaveRequest />} />


      </Routes>
    </Router>
  )
};

export default App;
