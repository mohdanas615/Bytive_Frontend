import './App.css';
import Sort from './components/Sort';
import HomePage from './components/HomePage';
import UserForm from './components/UserForm';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Header/>
      <Switch>
        <Route path="/Sort">
          <Sort/>
        </Route>
       <Route exact path="/homePage">
          <HomePage/>
        </Route>
        <Route exact path="/UserForm">
          <UserForm/>
        </Route>
      </Switch>
      </Router>
    </>
  );
  
  
}

export default App;
