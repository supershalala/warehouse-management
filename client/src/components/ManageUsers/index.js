import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../../utils/queries';
import { DELETE_USER, UPDATE_USER } from '../../utils/mutations';

const UserSelect = ({ users, setSelectedUser, setName, setPhone, setRole }) => {
  const handleChange = event => {
    const selectedUser = users.find(user => user.id === event.target.value);
    setSelectedUser(selectedUser);
    setName(selectedUser.name);
    setPhone(selectedUser.phone);
    setRole(selectedUser.role);
  };

  return (
    <select onChange={handleChange}>
      <option>Select a user</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

const ManageUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdateUser = async () => {
    try {
      await updateUser({ variables: { id: selectedUser.id, name, role, phone } });
      setSelectedUser(null);
      setName('');
      setRole('');
      setPhone('');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser({ variables: { id: selectedUser.id } });
      setSelectedUser(null);
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
          <h3>Select User</h3>
          <UserSelect 
            users={users} 
            setSelectedUser={setSelectedUser} 
            setName={setName} 
            setPhone={setPhone} 
            setRole={setRole} 
          />
        </div>
        {selectedUser && (
          <div className="col-md-6">
            <h3>Edit User</h3>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label htmlFor="name">Update Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Update Role:</label>
                <select
                  id="role"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Update Phone:</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>
                Delete User
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
