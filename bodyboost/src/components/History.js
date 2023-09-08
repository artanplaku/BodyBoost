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

        const clickedExercises = workouts.flatMap(workout => 
          workout.exercises.filter(exercise => exercise.clicked)
        );
  
        // Find the earliest date in the exercises data
        //-----------------------------------------------------
        let earliestDate = moment(); //current date
        workouts.forEach(workout => {
          workout.exercises.forEach(exercise => {
            const exerciseDate = moment(exercise.date);
            if (exerciseDate.isBefore(earliestDate)) {
              earliestDate = exerciseDate;
            }
          });
        });
  
        // Create a date range from the earliest date to the current date
        //------------------------------------------------------
        const currentDate = moment().add(1, 'days'); // set the end of the range to be tomorrow
        const grouped = {};
        for (let date = moment(earliestDate); date.isBefore(currentDate); date.add(1, 'days')) {
          const formattedDate = date.format('YYYY-MM-DD');
          grouped[formattedDate] = { name: formattedDate, Workouts: 0, Weight: 0 };
        }
       //-------------------------------------------------------
        // Process the workouts data
        clickedExercises.forEach(exercise => {
          const date = moment(exercise.completedDate).format('YYYY-MM-DD');
          if (grouped[date]) {
            grouped[date].Workouts += 1;
            if (typeof exercise.weight === 'number') {
              grouped[date].Weight += exercise.weight;
            } else {
              console.log('Non-number weight:', exercise.weight);
            }
            }
          });
        ;
        //------------------------------------------------------
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
          width={600}
          height={400}
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
          width={600}
          height={400}
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
    <div 
    style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      height: '100vh', 
      alignItems: 'center' 
      }}>
      <div>
    <button onClick={() => setChartType('bar')}>Bar Chart</button> 
    <button onClick={() => setChartType('line')}>Line Chart</button>
    </div>
    {renderChart()}
  </div>

);
  
}

export default History