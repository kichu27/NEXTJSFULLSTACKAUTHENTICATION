'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PROFILEPAGE() {


const [data , setdata] = useState("nothing")  
const router = useRouter() ; 

async function handlelogout()
{

const response =await fetch('/api/logout' , 
{
 method:"GET" ,  
}) 

if(response.status === 200)
{
router.push('/LOGIN')
console.log("Success Logout !");
}
else
{

  console.log("BAD RESPONSE logout ROUTE !");
}

}

async function getuserinfo()
{

try {
  
const response = await fetch('/api/me' , {method:"GET",})

const responsedata = await response.json();
console.log(responsedata);

  console.log(responsedata[0]._id);
  setdata(responsedata[0]._id);



  
} catch (error) {
  console.log(error);
}



}


  return <>
<div>PROFILE PAGE</div>

<button onClick={handlelogout}>logout</button>
<button onClick={getuserinfo}>GETUSERINFO</button>
<h2>{data === 'nothing' ? "Nothing" : <Link href={`/PROFILE/${data}`}>{data}
            </Link>}</h2>
  </>
    
  
}
