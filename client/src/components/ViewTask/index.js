import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../../utils/queries';
import { UPDATE_TASK } from '../../utils/mutations';

const ViewTask = () => {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [updateTask, { error: mutationError }] = useMutation(UPDATE_TASK);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutationError) return <p>Error: {mutationError.message}</p>;

  let tasks = data.tasks;

  const handleStatusChange = async (e, taskId) => {
    const status = e.target.value;

    try {
      await updateTask({ variables: { id: taskId, status } });
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  // Move completed tasks to the bottom of the list
  tasks = [...tasks.filter((task) => task.status !== 'completed'), ...tasks.filter((task) => task.status === 'completed')];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Task list */}
        {currentTasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-4">
            <div className={`card ${task.status === 'completed' ? 'bg-danger' : ''}`}>
              <div className="card-body">
                <h2 className="card-title">{task.description}</h2>
                <p className="card-text">Assigned to: {task.assignedTo.name}</p>
                <p className="card-text">Due date: {formatDate(task.dueDate)}</p>
                <div className={`form-group ${task.status === 'completed' ? 'text-white' : ''}`}>
                  <label htmlFor={`status-${task.id}`}>Status:</label>
                  <select
                    id={`status-${task.id}`}
                    className={`form-control ${task.status === 'completed' ? 'bg-danger text-white' : ''}`}
                    value={task.status}
                    onChange={(e) => handleStatusChange(e, task.id)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ViewTask;
