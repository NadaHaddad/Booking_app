import React, { useContext, useState } from 'react'
import axios from "axios";
import { Link,Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser}=useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
       const response=await axios.post('/api/login', {email,password});
      setUser(response.data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }


  
  
  
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
      <h1 className='text-4xl text-center mb-6'>Login</h1>
      <form className='max-w-2-md mx-auto' onSubmit={handleLoginSubmit}>
        <input type="email" placeholder='your@gmail.com' value={email} onChange={ev=>setEmail(ev.target.value)}></input>
        <input type="password" placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)}></input>
        <button className='primary'>Login</button>
        <div className='text-center py-2 text-gray-500'>Don't have an account yet? 
          <Link className='underline text-black' to={'/register'}> Register now</Link>
        </div>
      </form>
      </div>

      
    </div>
  )
}
