import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await API.get('/users/attendance');
        setAttendance(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
