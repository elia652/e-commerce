import React, { useState } from 'react';
import './CSS/LoginSignUp.css';

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const SignUpHandler = async () => {
    try {
      const res = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace('/');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  const loginHandler = async () => {
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace('/');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'SignUp' && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="**********"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button
          onClick={() => (state === 'Login' ? loginHandler() : SignUpHandler())}
        >
          Continue
        </button>

        {state === 'SignUp' ? (
          <p className="loginsignup-login" onClick={() => setState('Login')}>
            Already have an account? <span>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login" onClick={() => setState('SignUp')}>
            Create an account? <span>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>
            By continuing, I agree to the terms of use &amp; privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
