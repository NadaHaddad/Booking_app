import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';
export default function ProfilePage() {
    const [redirect,setRedirect]=useState(null);
    const {ready,user,setUser}=useContext(UserContext);
    let {subpage}=useParams();
    if(subpage===undefined)
    {
        subpage='profile';
    }
    async function logout(){
        await axios.post('/api/logout');
        setUser(null);
        setRedirect("/");
    }
    
    if(!ready){
        return 'loading....';
    }
    if(ready && !user && !redirect){
        return (<Navigate to={"/login"}></Navigate>)
    }
   
   
    if(redirect){
        return <Navigate to={redirect}></Navigate>
    }
  return (
    <div>
     <AccountNav/>
      {subpage==="profile" &&(
        <div className='text-center max-w-lg mx-auto'>
            logged in as {user.name}({user.email})<br/>
            <button  onClick={logout} className='primary max-w-sm mt-2'>logout</button>
        </div>
      )}
      {subpage=="places" &&(<PlacesPage/>)}
    </div>
  )
}
