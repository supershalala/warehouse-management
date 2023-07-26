import React from 'react';
import CreateTask from '../components/CreateTask';
import ViewTask from '../components/ViewTask';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../utils/queries';


const Dashboard = () => {

    const { data, loading, error } = useQuery(GET_TASKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <CreateTask />
      <ViewTask />
    </div>
  );
};

export default Dashboard;
