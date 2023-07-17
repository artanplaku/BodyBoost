import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';


const History = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [chartType, setChartType] = useState('bar');
  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing.');
        return;
      }
  
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        setUserId(userId);
  
        const response = await axios.get(`https://bodyboostbackend.onrender.com/api/workouts?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const workouts = response.data;
        const grouped = {};
        workouts.forEach(workout => {
          workout.exercises.forEach(exercise => {
            const date = moment(exercise.date).format('YYYY-MM-DD');
            if (!grouped[date]) {
              grouped[date] = { name: date, Workouts: 0, Weight: 0 };
            }
            grouped[date].Workouts += 1;
            if (typeof exercise.weight === 'number') {
              grouped[date].Weight += exercise.weight;
            } else {
              console.warn('Non-number weight:', exercise.weight);
            }
          });
        });
        
        console.log('Grouped workouts:', grouped);
        setData(Object.values(grouped));
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkouts();

  }, []);

  const renderChart = () => {
    if (chartType === 'bar') {
      return (
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 50, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Workouts" fill="#8884d8" />
        </BarChart>
      );
    } else if (chartType === 'line') {
      return (
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 50, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Workouts" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      );
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
    <button onClick={() => setChartType('bar')}>Bar Chart</button> 
    <button onClick={() => setChartType('line')}>Line Chart</button>
    {renderChart()}
  </div>

);
  
}

export default History