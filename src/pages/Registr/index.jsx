import { useRef, useState } from 'react';
import styles from './index.module.css';
import {  Link, useNavigate } from 'react-router-dom';

function Registr() {
const [loading , setLoading] = useState(false)
  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");
  const navigate = useNavigate()
 
  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      userName: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      rePassword: rePasswordRef.current.value
    };
  setLoading(true)
 fetch('https://auth-rg69.onrender.com/api/auth/signup' , {
  method:"POST",
  headers:{
    'Content-type':'aplication/json'
  },
  body: JSON.stringify(user)
 }).then(resp=>resp.json()).then(data=>{
  
  if (data.message == 'User Not found' ) {
    alert(data.message);
    emailRef.current.focus()
    return
     }
     if (data.accessToken ) {
      localStorage.setItem("user" , JSON.stringify(user));
      localStorage.setItem('token' , data.accessToken);
      navigate('/')
       }
     if (data.message == ''  ) {
      navigate('/')
       }
 }).catch(err=>{
  console.log(err);
 }).finally(function () {
  setLoading(false)
 })


    const { userName, email, password, rePassword } = user;

    
    if (!userName) {
      alert("Username kiriting");
      return;
    }
    if (!email) {
      alert("Email kiriting");
      return;
    } 

    if (!password) {
      alert("Parol kiriting");
      return;
    } else if (password.length < 3) {
      alert("Parol 3 tadan kop bolishi kerak");
      return;
    }

    if (password !== rePassword) {
      alert("Parolingiz bir hil yozing");
      return;
    }

   
    console.log("User registered:", user);
  }

  return (
    <div className={styles.container}>
    <Link to={"/login"}><button className={styles.btn1}>LOGIN</button></Link>
      <h1>REGISTER PAGE</h1>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" placeholder="Enter your Email..." />
        <input ref={userNameRef} type="text" placeholder="Enter your UserName..." />
        <input ref={passwordRef} type="password" placeholder="Enter your Password..." />
        <input ref={rePasswordRef} type="password" placeholder="Enter your rePassword..." />
        {
          loading && <button disabled>LOADING.....</button>
        }
        {
          !loading && <button onClick={handleSubmit}>REGISTER</button>
        }
      </form>
    </div>
  );
}

export default Registr;