
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '+61',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const [signUp, { error, data }] = useMutation(SIGNUP_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    const errors = {
      name: '',
      phone: '',
      password: '',
    };

    if (!formState.name.trim()) {
      isValid = false;
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z]+$/.test(formState.name.trim())) {
      isValid = false;
      errors.name = 'Name should contain only letters';
    }

    if (!/^\+61\d{9}$/.test(formState.phone.trim())) {
      isValid = false;
      errors.phone = 'Phone number must be in the format +61XXXXXXXXX';
    }

    if (formState.password.length < 10 || !/\d/.test(formState.password) || !/[a-zA-Z]/.test(formState.password)) {
      isValid = false;
      errors.password = 'Password must be at least 10 characters and contain a mixture of numbers and characters';
    }

    setValidationErrors(errors);

    if (isValid) {
      try {
        formState.role = 'manager';

        const { data } = await signUp({
          variables: { ...formState }
        });

        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleBlur = event => {
    const { name } = event.target;
    let isValid = true;
    const errors = {
      name: '',
      phone: '',
      password: '',
    };

    if (name === 'name') {
      if (!formState.name.trim()) {
        isValid = false;
        errors.name = 'Name is required';
      } else if (!/^[a-zA-Z]+$/.test(formState.name.trim())) {
        isValid = false;
        errors.name = 'First Name should only be one word and contain only letters';
      }
    }

    if (name === 'phone') {
      if (!/^\+61\d{9}$/.test(formState.phone.trim())) {
        isValid = false;
        errors.phone = 'Phone number must be in the format +61XXXXXXXXX';
      }
    }

    if (name === 'password') {
      if (formState.password.length < 10 || !/\d/.test(formState.password) || !/[a-zA-Z]/.test(formState.password)) {
        isValid = false;
        errors.password = 'Password must be at least 10 characters and contain a mixture of numbers and characters';
      }
    }

    if (!isValid) {
      setValidationErrors({
        ...validationErrors,
        [name]: errors[name],
      });
    }
  };

  return (
    <div className="container mt-5" style={{ height: '82vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
        <h2 className="mb-4">Sign Up</h2>
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
                <label htmlFor="name">First Name</label>
                <input type="text" id="name" className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`} name="name" onChange={handleChange} onBlur={handleBlur} />
                {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`} name="phone" value={formState.phone} onChange={handleChange} onBlur={handleBlur} />
                {validationErrors.phone && <div className="invalid-feedback">{validationErrors.phone}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`} name="password" onChange={handleChange} onBlur={handleBlur} />
                {validationErrors.password && <div className="invalid-feedback">{validationErrors.password}</div>}
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
