import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const [signUp, { error, data }] = useMutation(SIGNUP_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Set the role value to "manager"
      formState.role = 'manager';

      const { data } = await signUp({
        variables: { ...formState }
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5" style={{ height: '82vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {data ? (
            <div className="alert alert-success">
              <h2>Signup Successful!</h2>
              <p>
                Thank you for signing up! You can now&nbsp;
                <Link to="/login" className="btn btn-primary">login</Link>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" name="name" onChange={handleChange} />
              </div>

              {/* Remove the "role" form group */}
              {/* <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" className="form-control" name="role" onChange={handleChange} />
              </div> */}

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" className="form-control" name="phone" onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" name="password" onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>

              {error && <div className="alert alert-danger mt-3">Sign Up failed</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
