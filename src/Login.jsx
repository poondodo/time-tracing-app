import { useState } from 'react';

function Login({ onLogin }) {

  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); 
    if(username) {  
      onLogin(username); 
    }
  }

  return (
      <div className="login">
        <h1 className='app-title'>Daily Time Tracing</h1>
        <form className="login-form" action="#/login" onSubmit={onSubmit}>
          <label>
            <p>Login</p>
            <input className="username-input" placeholder="username" value={username} onChange={onChange}/>
          </label>
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
  );

}

export default Login;
