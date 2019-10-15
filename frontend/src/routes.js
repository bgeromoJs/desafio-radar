import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import Form from './pages/Form';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Main}/>
      <Route path='/form' exact component={Form}/>
    </BrowserRouter>
  );
}