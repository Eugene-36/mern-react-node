import { useState, useCallback, useEffect } from 'react';
const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

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
      login(data.token, data.userId);
      // console.log(
      //   'data.token, data.userId из auth.hook',
      //   data.token,
      //   data.userId
      // );
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
