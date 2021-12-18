import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        console.log('url', url);
        console.log('method', method);
        console.log('body', body);
        console.log('headers', headers);

        const respons = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await respons.json();

        if (!respons.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setLoading(false);

        return data;
      } catch (e) {
        console.log('у', e);
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
