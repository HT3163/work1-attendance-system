import React from 'react';
import API from '../utils/api';

const MarkAttendance = () => {
  const markAttendance = async (status) => {
    try {
      await API.post('/users/attendance', { status });
      alert('Attendance marked successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <button onClick={() => markAttendance('present')}>Mark Present</button>
      <button onClick={() => markAttendance('absent')}>Mark Absent</button>
      <button onClick={() => markAttendance('leave')}>Mark Leave</button>
    </div>
  );
};

export default MarkAttendance;
