import React from 'react';
import 'materialize-css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useRoutes } from './routes';
//console.log(useRoutes);

function App() {
  const routes = useRoutes(false);
  const customHistory = createBrowserHistory();

  return (
    <Router history={customHistory}>
      <div className='container'>{routes}</div>
    </Router>
  );
}

export default App;
