import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './routes/Home';

function App() {
  return (
    <HashRouter>
      <Route path="/" exact component={Home} />
    </HashRouter>
  );
}

export default App;
