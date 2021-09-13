import './App.css';
import Firebase from './Provider/Firebase/firebase';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

function App() {
  const fire = new Firebase();
  fire.init();
  let user = {
    isLogedIn: false,
    info: {}
  }
  if(Cookies.get('user'))
  {
    user.isLogedIn = true;
    user.info = JSON.parse(Cookies.get('user'))
  }
  
  return (
    <Router>
      <div className="App">
        <Route path='/' exact> {user.isLogedIn ? <Home userInfo={user.info}/>: <Redirect to="/signin" />} </Route>
        <Route path='/signin' exact> <Signin /> </Route>
        <Route path="/signup" exact> <Signup /> </Route>
      </div>
    </Router>
  );
}

export default App;
