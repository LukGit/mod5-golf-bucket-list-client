import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={Login} />
        {/* <Route path={'/buckets/edit/:id'} component={BucketEdit} />
        <Route path={'/buckets/new'} component={BucketForm} />
        <Route path={'/buckets/:id'} component={ShowBucket} />
        <Route path={'/buckets'} component={Buckets} />
        <Route path={'/courses/:id'} component={ShowCourse} />
        <Route path={'/courses'} component={Courses} /> */}
        <Route path={'/'} component={Login} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
