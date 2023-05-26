import AuthContext from '../../store/auth-context';
import classes from './ProfilePage.module.css'
import { Fragment, useContext, useRef ,useEffect} from 'react';



const ProfilePage=()=>{
    const nameRef = useRef()
  const urlRef = useRef()
  const authCtx=useContext(AuthContext)

    
    const submitHandler = event => {
    event.preventDefault()

    const enteredName = nameRef.current.value
    const enteredUrl = urlRef.current.value
    fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDQkJzMSxna8JiN6hDqpbwqZkH5J9uSN4s",{
          method : 'POST',
          body : JSON.stringify({
            idToken : authCtx.token,
            displayName : enteredName,
            photoUrl : enteredUrl,
            returnSecureToken : true
          })
        }
      ).then(res => {
        if(res.ok){
          return res.json()
        } else {
          return res.json().then(data => {
            console.log(data)
            if (data.error.message) {
              alert(data.error.message)
            }
          })
        }
      }).then(data => {
        console.log('received data ',data)
      }).catch(err=> console.log(err))

     }

     const getData = () => {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQkJzMSxna8JiN6hDqpbwqZkH5J9uSN4s",
          {
            method: "POST",
            body: JSON.stringify({ idToken: authCtx.token }),
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
            console.log("received data ", data);
           if (data.users) {
            nameRef.current.value = data.users[0].displayName
            urlRef.current.value = data.users[0].photoUrl;
           }
          })
          .catch((err) => console.log(err));
      }
    
      useEffect( getData , [])
    



    return (
         <Fragment>
        <div className={classes.header}>
          <h3>Winners Never Quit. Quitters never win</h3>
          <span>
            Your profile is 69% completed. A complete profile has <br /> higher
            chances of landing a job. <button>Complete now</button>
          </span>
        </div>
        <section className={classes.section}>
          <div className={classes.details}>
            <span>Contact Details</span>
            <button>cancel</button>
          </div>
          <form className={classes.form} onSubmit={submitHandler}>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" ref={nameRef} />
            <label htmlFor="url">Profile Photo URL :</label>
            <input type="url" id="url" ref={urlRef}/>
            <button type='submit'>Update</button>
          </form>
        </section>
      </Fragment>
        
    )

}
export default ProfilePage;