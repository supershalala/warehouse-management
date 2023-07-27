// import React from 'react';
// import CreateTask from '../components/CreateTask';
// import ViewTask from '../components/ViewTask';
// import { useQuery } from '@apollo/client';
// import { GET_TASKS } from '../utils/queries';


// const Dashboard = () => {

//     const { data, loading, error } = useQuery(GET_TASKS);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <CreateTask />
//       <ViewTask />
//     </div>
//   );
// };

// export default Dashboard;

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
        {/* CreateTask Column (1/3 width on desktop, full width on mobile) */}
        <div className="col-md-4 mb-4">
          <CreateTask />
        </div>

        {/* ViewTask Column (2/3 width on desktop, full width on mobile) */}
        <div className="col-md-8">
          <ViewTask tasks={data.tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
