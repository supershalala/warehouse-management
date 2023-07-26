import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK } from '../../utils/mutations';
import { GET_USERS } from '../../utils/queries';  // Import the GET_USERS query

const CreateTask = () => {
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);

  console.log('Users:', usersData?.users);  // Log the fetched users

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted(data) {
      // Handle successful creation here if needed
      console.log('Task created successfully!', data);
      // Reset the form after successful creation
      setDescription('');
      setAssignedTo('');
      setDueDate('');
      setStatus('');
    },
    onError(error) {
      // Handle error during task creation
      console.error('Error creating task:', error.message);
    },
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    // Call the createTask mutation with the provided form values
    console.log('Submitting form with assignedTo:', assignedTo); 
    console.log('Assigned To:', assignedTo);  // Log the current assignedTo value
    createTask({ variables: { description, assignedTo, dueDate, status } });
    // createTask({ variables: { description, assignedTo: String(assignedTo), dueDate, status } });

  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleCreateTask}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="assignedTo">Assigned To:</label>
          <select
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => {
                console.log('Selected user ID:', e.target.value);  // Log the selected value
                setAssignedTo(e.target.value);
              }}
          >
            {usersData.users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default CreateTask;
