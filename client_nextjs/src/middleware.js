    import { NextResponse } from 'next/server';
    import { jwtDecode } from "jwt-decode";

    export async function middleware(request) {
    
    const cookie = request.cookies.get('token');

    if (!cookie) {
        return NextResponse.redirect('/routes/user/loginUser');
    }
    
    const response = await fetch ('http://localhost:3001/api/auth/jwtVerify' ,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${cookie.value}`
        },
    });
    const data = await response.json();
    if(!data.valid){
        return NextResponse.redirect('/routes/user/loginUser');
    }
    const decoded = data.decoded;
    
    if (decoded.isProvider) {
        if (request.nextUrl.pathname === '/routes/createProfession') {
        return NextResponse.next();
        }
    } 
    else {
        // If the user is not a service provider, deny access to createProfession route
        if (request.nextUrl.pathname === '/routes/createProfession') {
        return NextResponse.redirect('http://localhost:3000/routes/choose'); // Redirect to an unauthorized page
        }
    }   

    // Allow access to the myProfile route for all logged-in users
    if (request.nextUrl.pathname === '/routes/myProfile') {
        return NextResponse.next();
    }

    // Deny access to the login route if the user is already logged in
    if (request.nextUrl.pathname === '/routes/user/loginUser' || request.nextUrl.pathname === '/routes/user/registerUser') {
        return NextResponse.redirect('http://localhost:3000/'); // Redirect to the home page or any other appropriate page
    }

    // Allow access to other routes
    return NextResponse.next();
    }
    export const config = {
    matcher: ['/','/routes/createProfession', '/routes/myProfile' , '/routes/user/loginUser' , '/routes/user/registerUser'  ]
    }
