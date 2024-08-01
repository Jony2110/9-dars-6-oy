import { useRef, useState } from 'react';
import styles from './index.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loading , setLoading] = useState(false);
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;

    if (!userName) {
      alert("Username kiriting");
      return;
    }

    if (!password) {
      alert("Parol kiriting");
      return;
    } else if (password.length < 3) {
      alert("Parol 3 tadan kop bolishi kerak");
      return;
    }

    const user = {
      userName,
      password
    };

       setLoading(true)

    fetch('https://auth-rg69.onrender.com/api/auth/signin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message === 'Failed! Username is already in use!') {
          alert(data.message);
          userNameRef.current.focus();
          return;
        }
        if (data.message === 'User registered successfully') {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      })
     .finally(function () {
      setLoading(false)
     })
  }

  return (
    <div className={styles.container}>
    <Link to={"/registr"}><button>REGISTER</button></Link>
      <h1 className={styles.h1}>Login page</h1>
      <form>
        <input ref={userNameRef} type="text" placeholder="Enter your UserName..." />
        <input ref={passwordRef} type="password" placeholder="Enter your Password..." />
        {
          loading && <button disabled>LOADING.....</button>
        }
        {
          !loading && <button onClick={handleSubmit}>LOGIN</button>
        }
      </form>
    </div>
  );
}

export default Login;