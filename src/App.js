import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Buckets from './components/Buckets'
import ShowCourse from './components/ShowCourse'
import ShowBucket from './components/ShowBucket'
import BucketEdit from './components/BucketEdit'
import Foursomes from './components/Foursomes'
import Signup from './components/Signup'
import { Route, Switch } from 'react-router-dom'

const App = () => { 
  // Login is to handle user login
  // BuckerEdit is to handle editing of a bucket item
  // ShowBucket is to display the content of a bucket item
  // Buckets is to display a map that shows all the bucket items
  // ShowCourse is to display a map of a course and allow navigation
  // Signup is to handle user signup
  // default path is Login
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/buckets/edit/:id'} component={BucketEdit} />
        <Route path={'/buckets/:id'} component={ShowBucket} />
        <Route path={'/buckets'} component={Buckets} />
        <Route path={'/courses/:id'} component={ShowCourse} />
        <Route path={'/foursomes'} component={Foursomes} />
        <Route path={'/signup'} component={Signup}/>
        <Route path={'/'} component={Login} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
