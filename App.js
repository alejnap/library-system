import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Books} from './Books';
import {IssueBook} from './IssueBook';
import { ReturnBook } from './ReturnBook';
import {Members} from './Members';
import {Feedback} from './Feedback';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Library Managment System
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/Book' component={Books}/>
       <Route path='/IssueBook' component={IssueBook}/>
       <Route path='/ReturnBook' component={ReturnBook}/>
       <Route path='/Members' component={Members}/>
       <Route path='/Feedback' component={Feedback}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;