import React from 'react';
import './index.css';
const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get exclusive offers on your email</h1>
      <p>Subscribe to our newsLetter and stay updated</p>
      <div>
        <input type="email" placeholder="email@gmail.com" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
