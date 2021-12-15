import React from 'react';
import 'materialize-css';
import { Router } from 'react-router-dom';

import { useRoutes } from './routes';
//console.log(useRoutes);

function App() {
  const routes = useRoutes(false);

  return (
    <Router>
      <div className='container'>{routes}</div>
    </Router>
  );
}

export default App;
