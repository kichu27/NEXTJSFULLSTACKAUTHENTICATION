'use client'

import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LOGINPAGE() {

const [user,setUser] = useState({email:"" , password:""})
const router = useRouter() ; 

function handlechange(e)
{

const{name , value} = e.target ; 

setUser((prevuser)=>({

...prevuser , [name]:value , 

}));

}


// async function handlesubmit()
// {

  
//   try {
    
// const response = fetch('/api/login' , {
//   method: "POST",
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(user),
// });
    

//       if (response.status === 200) {
//         // Login was successful, push to the profile page
//         const data = await response.json();
//         if (data.body) {
//           // Store the JWT in local storage for authentication
//           Cookies.set('token', data.body, { expires: 1 })
//           router.push('/PROFILE');
//         } else {
//           console.log('Login failed: No token received');
//         }
//       } else {
//         // Login failed, handle the error (e.g., display an error message)
//         console.log('Login failed');
//       }

//   } catch (error) {
//     console.log("LOGIN ROUTE ERROR !" , error.message);
//   }




// };

async function handlesubmit() {
  try {
    const response = await fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      // Login was successful, push to the profile page
      const data = await response.json();
      if (data.body) {
        // Store the JWT in local storage for authentication
        Cookies.set('token', data.body, { expires: 1 });
        router.push('/PROFILE');

        // Log the data received from the server
        console.log('Data received:', data);
      } else {
        console.log('Login failed: No token received');
      }
    } else {
      // Login failed, handle the error (e.g., display an error message)
      console.log('Login failed');
    }
  } catch (error) {
    console.log("LOGIN ROUTE ERROR !", error.message);
  }
}



  return (
    <div>


<input type='text' placeholder='enter email' onChange={handlechange}   name="email" value={user.email}/>
<input type='text' placeholder='enter password' onChange={handlechange}  name="password" value={user.password} />
<button onClick={handlesubmit}>SUBMIT</button>






    </div>
  )
}




//   async function onLogin() {
//     try {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });

//       if (response.status === 200) {
//         // Login was successful, push to the profile page
//         const data = await response.json();
//         if (data.token) {
//           // Store the JWT in local storage for authentication
//           Cookies.set('token', data.token, { expires: 1 })
//           router.push('/profile');
//         } else {
//           console.log('Login failed: No token received');
//         }
//       } else {
//         // Login failed, handle the error (e.g., display an error message)
//         console.log('Login failed');
//       }
//     } catch (error) {
//       console.log('Login failed:', error.message);
//     }
//   }


