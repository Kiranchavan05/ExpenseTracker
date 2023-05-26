import classes from './StartingPage.module.css'
import React,{Fragment, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import AuthContext from '../../store/auth-context';
// import ProfilePage from './ProfilePage';

const StartingPage=()=>{
  const history=useHistory()
  const authCtx=useContext(AuthContext)



  const routeChange=()=>{
    history.push('/home/profile')
  }

  const verification = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDQkJzMSxna8JiN6hDqpbwqZkH5J9uSN4s",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log('received data ',data)
      })
      .catch((err) => console.log(err));
    }
     
    const logoutHandler=()=>{
      authCtx.logout()
      history.replace('/')
    }

    return (
      <Fragment>
      <div className={classes.header}>
        <h4>Welcome to Expense Tracker !!!</h4>
        <button onClick={verification} className={classes.email}>Verify Email</button>
        <button onClick={logoutHandler} className={classes.logout}>Logout</button>
        <span>Your Profile is Incomplete. <button onClick={routeChange}>Complete now</button></span>
      </div>
    </Fragment>
      
      );
}
export default StartingPage;