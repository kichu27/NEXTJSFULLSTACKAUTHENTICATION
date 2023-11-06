import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
 
const path = request.nextUrl.pathname
const ispublicpath = path === '/LOGIN' || path ==='/'
const token = request.cookies.get('token')?.value || ''

if(ispublicpath && token)
{

    return NextResponse.redirect(new URL('/' , request.nextUrl))

}

if(!ispublicpath && !token)
{

return NextResponse.redirect(new URL('/LOGIN' , request.nextUrl))

}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [

'/',
'/LOGIN',
'/profile',
'/SIGNUP',

  ]
}