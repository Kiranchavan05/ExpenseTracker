import { Switch, Route,Redirect} from 'react-router-dom';
import './App.css';
// import AuthForm from './component/Auth/AuthForm';
import HomePage from './component/Pages/HomePages';
import AuthPage from './component/Pages/AuthPage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

function App() {
  const authCtx= useContext(AuthContext)
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
        <AuthPage /> 
        </Route>
        {authCtx.isLoggedIn && <Route path='/home'>
            <HomePage />
        </Route>}

        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
     
    </div>
  );
}

export default App;
