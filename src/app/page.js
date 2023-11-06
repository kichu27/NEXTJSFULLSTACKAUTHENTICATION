'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function SIGNUPPAGE() {

const [user , Setuser] = useState({username:"" , email:"" , password:"", })

const router = useRouter() ;
function handlechange(e)
{

const {name , value} = e.target ; 

Setuser((prevuser)=>({

...prevuser , [name]:value 

}))
}


async function handleSignup()
{

    try {

        const response = await fetch('/api/signup', {
          method: 'POST', // Assuming this is a user registration endpoint
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
      
        if (response.status === 201) {
          // Handle success
          console.log(response.message);
          router.push("/LOGIN") ; 
        } else {
          // Handle error
          console.error("User creation failed");
        }
        
      } catch (error) {
        
      console.log(error);
      
        
      }
      
      
  
}




  return (
    <div>
    
<input type='text'  placeholder='enter the name' name='username' value={user.username} onChange={handlechange} />
<input type='text'  placeholder='enter the  email ' name='email' value={user.email} onChange={handlechange} />
<input type='text' placeholder='enter the  password' name='password' value={user.password} onChange={handlechange}  />
<button onClick={handleSignup}> SIGNUP </button>
<Link href='/LOGIN'> Visit Login page </Link>

    </div>
  )
}
