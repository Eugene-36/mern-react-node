import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.userId, data.token);
    } catch (error) {}
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Shorten the link</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Please enter your email address'
                  id='email'
                  type='text'
                  name='email'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
              </div>

              <div className='input-field'>
                <input
                  placeholder='Please enter your password'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow darken-4'
              disabled={loading}
              style={{ marginRight: 10 }}
              onClick={loginHandler}
            >
              Enter
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className='btn grey lighten-1 black-text'
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
