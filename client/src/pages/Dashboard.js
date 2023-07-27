

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
    <div className="container mt-5" style={{ height: '82vh' }}>
      <div className="row">
        <div className="col-md-4 mb-4">
          <CreateTask />
        </div>

        <div className="col-md-8">
          <ViewTask tasks={data.tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
