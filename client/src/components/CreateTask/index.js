

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK } from '../../utils/mutations';
import { GET_USERS } from '../../utils/queries';

const CreateTask = () => {
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted(data) {
      console.log('Task created successfully!', data);
      setDescription('');
      setAssignedTo('');
      setDueDate('');
      window.location.reload(); // Reload the page after successful task creation
    },
    onError(error) {
      console.error('Error creating task:', error.message);
    },
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    createTask({ variables: { description, assignedTo, dueDate, status: 'pending' } });
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;

  return (
    <div className="container mt-5">
      <h2>Create New Task</h2>
      <form onSubmit={handleCreateTask}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To:</label>
          <select
            id="assignedTo"
            className="form-control"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Select an option</option>
            {usersData.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default CreateTask;

