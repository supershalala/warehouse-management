import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';

const SignUp = () => {
    const [formState, setFormState] = useState({
        name: '',
        role: '',
        phone: '',
        password: '',
    });

    const [signUp, { error }] = useMutation(SIGNUP_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
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
        <div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" name="name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input type="text" id="role" className="form-control" name="role" onChange={handleChange} />
                </div>

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

                {error && <div className="alert alert-danger">Sign Up failed</div>}
            </form>
        </div>
    );
};

export default SignUp;
