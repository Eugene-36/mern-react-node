import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import 'materialize-css';
//console.log(useRoutes);

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const customHistory = createBrowserHistory();

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router history={customHistory}>
        {isAuthenticated && <Navbar />}
        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
