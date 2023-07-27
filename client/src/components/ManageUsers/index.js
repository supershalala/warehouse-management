import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../../utils/queries';
import { DELETE_USER, UPDATE_USER } from '../../utils/mutations';

const ManageUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const [selectedUserId, setSelectedUserId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdateUser = async () => {
    try {
      await updateUser({ variables: { id: selectedUserId, name, role, phone } });
      setName('');
      setRole('');
      setPhone('');
      setSelectedUserId('');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser({ variables: { id: userId } });
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const users = data.users;

  return (
    <div className="container mt-5">
      <h2>Manage Users</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Create User</h3>
          <form onSubmit={handleUpdateUser}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save User
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Existing Users</h3>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user.id} className="list-group-item">
                {user.name}
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setName(user.name);
                      setRole(user.role);
                      setPhone(user.phone);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
