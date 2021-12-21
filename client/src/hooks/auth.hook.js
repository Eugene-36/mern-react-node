import { useState, useCallback, useEffect } from 'react';
const storageName = 'userData';

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((id, jwtToken) => {
    setUserId(id);
    setToken(jwtToken);

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
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
