import React, {useEffect, useState } from 'react';
// import { RiUserFill } from 'react-icons/ri';
// import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig'; // Import your Firebase auth instance
import { useNavigate } from 'react-router-dom';



import waveImage from './img/wave.png'; // Import wave image here
import bgImage from './img/bg.svg'; // Import bg image here
import avatarImage from './img/avatar.svg'; // Import avatar image here
import './admin-styles/adminLogin.css'











const AdminLogin = () => {
  const [user, setUser] = useState(null); // Initialize user state with null

  useEffect(() => {
    // Set up an auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update user state when auth state changes
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []); // Run the effect only once on mount


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the specific username and password for the allowed user
    // const allowedUsername = 'admin@example.com';
    // const allowedPassword = 'admin123';

    const allowedUsername = 'admin@gmail.com';
    const allowedPassword = 'Creatoactive6767#';

    if (username === allowedUsername && password === allowedPassword) {
      console.log("Attempting to sign in with:", username, password);

      try {
        // Sign in with email and password using Firebase auth
        await signInWithEmailAndPassword(auth, username, password);
        // Redirect to admin dashboard
        // Replace '/admin' with your desired admin dashboard route
        console.log("Authentication successful!");

        navigate('/admindashboard');
      } catch (error) {
        console.error(error);
        console.error("Authentication error:", error);

        // Set error message for login error
        setErrorMessage('Login failed. Please try again.');
      }
    } else {
      // Set error message for incorrect credentials.+
      
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
    // <div className="h-auto flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
    //   <motion.div
    //     initial={{ opacity: 0, y: -50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg"
    //   >
    //     <div className="flex items-center justify-center">
    //       <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center">
    //         <RiUserFill className="h-6 w-6 text-white" />
    //       </div>
    //     </div>
        
    //     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //       Admin Login
    //     </h2>
        
    //     <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="username" className="sr-only">
    //           Username
    //         </label>
    //         <input
    //           id="username"
    //           name="username"
    //           type="text"
    //           autoComplete="username"
    //           required
    //           value={username}
    //           onChange={handleUsernameChange}
    //           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //           placeholder="Username"
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="password" className="sr-only">
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           name="password"
    //           type="password"
    //           autoComplete="current-password"
    //           required
    //           value={password}
    //           onChange={handlePasswordChange}
    //           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //           placeholder="Password"
    //         />
    //       </div>
         
    //       {errorMessage && (
    //         <p className="text-red-500 text-sm">{errorMessage}</p>
    //       )}
    //       <div>
    //         <button
    //           type="submit"
    //           className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //         >
    //           Login
    //         </button>
    //       </div>
    //     </form>
    //   </motion.div>
    // </div>


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

export default AdminLogin;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import waveImage from './img/wave.png';
// import bgImage from './img/bg.svg';
// import avatarImage from './img/avatar.svg';
// import './admin-styles/adminLogin.css';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleUsernameChange = (e) => setUsername(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     try {
//       // Call your backend login API
//       const response = await fetch('http://localhost:5005/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: username, // backend expects email
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setErrorMessage(data.message || 'Login failed');
//         return;
//       }

//       // Save token & user details in localStorage
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));

//       console.log('Login successful:', data);

//       // Redirect based on role
//       if (data.user.role === 'admin') {
//         navigate('/adminDashboard');
//       } else if (data.user.role === 'employee') {
//         navigate('/employeedashboard');
//       } else {
//         navigate('/studentdashboard');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setErrorMessage('Server error. Please try again later.');
//     }
//   };

//   // Input focus/blur animations
//   useEffect(() => {
//     const addcl = (event) => {
//       const parent = event.target.parentNode.parentNode;
//       parent.classList.add('focus');
//     };

//     const remcl = (event) => {
//       const parent = event.target.parentNode.parentNode;
//       if (event.target.value === '') {
//         parent.classList.remove('focus');
//       }
//     };

//     const inputs = document.querySelectorAll('.input');
//     inputs.forEach((input) => {
//       input.addEventListener('focus', addcl);
//       input.addEventListener('blur', remcl);
//     });

//     return () => {
//       inputs.forEach((input) => {
//         input.removeEventListener('focus', addcl);
//         input.removeEventListener('blur', remcl);
//       });
//     };
//   }, []);

//   return (
//     <div className="YourComponent">
//       <img className="wave" src={waveImage} alt="Wave" />
//       <div className="container1">
//         <div className="img">
//           <img src={bgImage} alt="Background" />
//         </div>
//         <div className="login-content">
//           <form className="adminEmpform" onSubmit={handleSubmit}>
//             <img src={avatarImage} alt="Avatar" />
//             <h2 className="title">Welcome</h2>
//             <div className="input-div one">
//               <div className="i">
//                 <i className="fas fa-user"></i>
//               </div>
//               <div className="div">
//                 <h5>Email</h5>
//                 <input
//                   type="text"
//                   className="input"
//                   name="username"
//                   autoComplete="username"
//                   required
//                   value={username}
//                   onChange={handleUsernameChange}
//                 />
//               </div>
//             </div>
//             <div className="input-div pass">
//               <div className="i">
//                 <i className="fas fa-lock"></i>
//               </div>
//               <div className="div">
//                 <h5>Password</h5>
//                 <input
//                   type="password"
//                   className="input"
//                   name="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={handlePasswordChange}
//                 />
//               </div>
//             </div>
//             {errorMessage && (
//               <p className="text-red-500 text-2xl" style={{ color: 'red' }}>
//                 {errorMessage}
//               </p>
//             )}
//             <a href="#">Forgot Password?</a>
//             <input type="submit" className="btn" value="Login" />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
