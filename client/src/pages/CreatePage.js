import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  // console.log('auth', auth.token);
  // console.log('link', link);

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
      } catch (e) {}
    }
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
        <div className='input-field'>
          <input
            placeholder='Please enter the link'
            id='link'
            type='text'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor='link'>Enter the link</label>
        </div>
      </div>
    </div>
  );
};
