import { useState, useCallback, useEffect } from 'react';
const storageName = 'userData';

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((id, jwtToken) => {
    setUserId(id);
    setToken(jwtToken);

    //console.log('jwtToken', jwtToken);
    //console.log('id', id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.userId, data.token);
      // console.log(
      //   'data.token, data.userId из auth.hook',
      //   data.token,
      //   data.userId
      // );
    }
    setReady(true);
  }, [login]);
  console.log('token из auth hook 41', token);
  return { login, logout, token, userId, ready };
};
