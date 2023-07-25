import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../utils/queries';

const ViewTask = () => {
    // Query to get all tasks
    const { loading, data } = useQuery(GET_TASKS);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    // Destructure the data object and get the tasks array
    const { tasks } = data;
  
    return (
      <div>
        <h2>View Tasks</h2>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.description}</h3>
            <p>Assigned to: {task.assignedTo.name}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            {/* Add an onClick event to handle when a task is clicked */}
            <button onClick={() => handleTaskClick(task._id)}>View Details</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default ViewTask;
  