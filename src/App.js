import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Buckets from './components/Buckets'
import ShowCourse from './components/ShowCourse'
import ShowBucket from './components/ShowBucket'
import BucketEdit from './components/BucketEdit'
import Signup from './components/Signup'
import { Route, Switch } from 'react-router-dom'

const App = () => { 
  
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/buckets/edit/:id'} component={BucketEdit} />
        <Route path={'/buckets/:id'} component={ShowBucket} />
        <Route path={'/buckets'} component={Buckets} />
        <Route path={'/courses/:id'} component={ShowCourse} />
        <Route path={'/signup'} component={Signup}/>
        <Route path={'/'} component={Login} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
