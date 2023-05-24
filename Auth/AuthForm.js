import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRed = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredconfirmpassword = confirmpasswordInputRed.current.value;

    //optional: add validation ;
    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkJchkJMBVkDBlhPXLxTZP2wMGEtUpc5o",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmpassword: enteredconfirmpassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            //someyhing
            console.log("asfs");
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("failed");
          alert(error.message);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "SignUp"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef}></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            required
            ref={confirmpasswordInputRed}
          ></input>
        </div>

        <div className={classes.actions}>
           <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
