import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import 'materialize-css';
//console.log(useRoutes);

//======================================

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  console.log('из app', token);

  const isAuthenticated = !!token;
  console.log('isAuthenticated', isAuthenticated);
  const routes = useRoutes(isAuthenticated); //! Когда тут true стоит , тогда норм работает
  const customHistory = createBrowserHistory();

  //console.log('ready', ready);
  //console.log('isAuthenticated в App', isAuthenticated);

  if (!ready) {
    <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router history={customHistory} key={Math.random()}>
        {isAuthenticated && <Navbar />}
        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
