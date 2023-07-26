// import React, { useState } from 'react';
// import axios from 'axios';

// const ViewTask = ({ tasks }) => {
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleTaskClick = (task) => {
//     setSelectedTask(task);
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleMessageSend = async () => {
//     try {
//       // Make a POST request to our server to send the message via Twilio
//       await axios.post('/api/send-message', {
//         taskId: selectedTask.id,
//         message: message,
//       });

//       // Reset the message input field after sending the message
//       setMessage('');

//       // Optional: You can update the task status or display a success message here
//       console.log('Message sent successfully!');
//     } catch (error) {
//       // Handle any errors that may occur during the API request
//       console.error('Error sending message:', error);
//     }
//   };

//   // Check if tasks is an array before trying to map over it
//   if (!Array.isArray(tasks)) {
//     return <div>Loading tasks...</div>;
//   }

//   return (
//     <div>
//       {/* Task list */}
//       {tasks.map((task) => (
//         <div key={task.id} onClick={() => handleTaskClick(task)}>
//           {task.description} // This should be `task.description` based on your schema, not `task.title`
//         </div>
//       ))}

//       {/* Display task details and message input field when a task is selected */}
//       {selectedTask && (
//         <div>
//           {/* Display task details */}
//           <h2>{selectedTask.description}</h2> // This should be `selectedTask.description` based on your schema
//           <p>{selectedTask.assignedTo.name}</p> // Example of how to access nested properties
//           {/* Add more task details as needed */}

//           {/* Message input field */}
//           <input type="text" value={message} onChange={handleMessageChange} />
//           <button onClick={handleMessageSend}>Send Message</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewTask;





// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_TASKS } from '../../utils/queries';

// const ViewTask = () => {
//   const { loading, error, data } = useQuery(GET_TASKS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const tasks = data.tasks;

//   return (
//     <div>
//       {/* Task list */}
//       {tasks.map((task) => (
//         <div key={task.id}>
//           <h2>{task.description}</h2>
//           <p>Assigned to: {task.assignedTo.name}</p>
//           <p>Due date: {task.dueDate}</p>
//           <p>Status: {task.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewTask;


import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../../utils/queries';
import { UPDATE_TASK } from '../../utils/mutations';

const ViewTask = () => {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [updateTask, { error: mutationError }] = useMutation(UPDATE_TASK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutationError) return <p>Error: {mutationError.message}</p>;

  const tasks = data.tasks;

  const handleStatusChange = async (e, taskId) => {
    const status = e.target.value;

    try {
      await updateTask({ variables: { id: taskId, status } });
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div>
      {/* Task list */}
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.description}</h2>
          <p>Assigned to: {task.assignedTo.name}</p>
          <p>Due date: {task.dueDate}</p>
          <div>
            <label htmlFor={`status-${task.id}`}>Status:</label>
            <select
              id={`status-${task.id}`}
              value={task.status}
              onChange={(e) => handleStatusChange(e, task.id)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewTask;
