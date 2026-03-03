
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig'; // Import your Firebase auth instance


import React, { useEffect,useState } from 'react';
import waveImage from './img/wave.png'; // Import wave image here
import bgImage from './img/bg.svg'; // Import bg image here
import avatarImage from './img/avatar.svg'; // Import avatar image here
import './admin-styles/adminLogin.css'







const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === 'admin@example.com' && password === 'admin123') {
      setErrorMessage('Admin credentials are not allowed in employee login.');
      return;
    }

    try {
      // Sign in with email and password using Firebase auth
      await signInWithEmailAndPassword(auth, username, password);
      // Redirect to employee home page
      // Replace '/employeehome' with your desired employee home route
      window.location.href = '/employeehome';
    } catch (error) {
      console.error(error);
      // Set error message for incorrect credentials
      setErrorMessage('Incorrect username or password');
    }
  };

  useEffect(() => {
    const addcl = (event) => {
      const parent = event.target.parentNode.parentNode;
      parent.classList.add('focus');
    };

    const remcl = (event) => {
      const parent = event.target.parentNode.parentNode;
      if (event.target.value === '') {
        parent.classList.remove('focus');
      }
    };

    const inputs = document.querySelectorAll('.input');

    inputs.forEach((input) => {
      input.addEventListener('focus', addcl);
      input.addEventListener('blur', remcl);
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', addcl);
        input.removeEventListener('blur', remcl);
      });
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
   

    <div className="YourComponent">
    <img className="wave" src={waveImage} alt="Wave" />
    <div className="container1">
      <div className="img " >
        <img src={bgImage} alt="Background" />
      </div>
      <div className="login-content">
        <form className='adminEmpform' onSubmit={handleSubmit}>
          <img src={avatarImage} alt="Avatar" />
          <h2 className="title">Welcome</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <h5>Username</h5>
              <input type="text" className="input" 
               id="password"
                name="username"
                autoComplete="username"
                       required
                 value={username}
              onChange={handleUsernameChange}
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <h5>Password</h5>
              <input type="password" className="input"
               id="password"
               name="password"
               autoComplete="current-password"
                required
               value={password}
               onChange={handlePasswordChange}
              />
            </div>
          </div>
          {errorMessage && (
           <p className="text-red-500  text-2xl" style={{color:"red"}}>{errorMessage}</p>
       )}
          <a href="#">Forgot Password?</a>
          <input type="submit" className="btn" value="Login" />
        </form>
      </div>
    </div>
  </div>



  );
};

export default EmployeeLogin;
