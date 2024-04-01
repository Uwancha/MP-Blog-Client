'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define form state's interface/type
export interface StateType {
    success?: boolean | undefined;
    message?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
};

// Server action to handle user logging in
export const LoginUser = async (state: StateType | undefined, formData: FormData) => {
    // Extract user credentials from form data
    const credentials = {
        username: formData?.get('username'),
        password: formData?.get('password')
    }
  
    // Validate user credentials
    if (credentials.username === '') {
        return {
            success: false,
            error: {
                username: 'Username is required!'
            }
        }    
    };

    if (credentials.password === '') {
        return {
            success: false,
            error: {
                password: 'Password must be at least 8 char'
            }
        }  
    };
  
    // Define API URL
    const url = process.env.API_URL || 'http://localhost:5000/'
  
    try {
        // Send request to API with user credentials
        const res = await fetch(`${url}api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
  
        // Parse response
        const data = await res.json();
        
        // Handle success response
        if (res.ok) {
            // Set cookies 
            cookies().set({
                name: 'token',
                value: data.token,
                httpOnly: true,
                path: '/',
                maxAge: 3600 
            });

            cookies().set({
                name: 'user',
                value: data.user.username,
                httpOnly: true,
                path: '/',
                maxAge: 3600
            });

            cookies().set({
                name: 'userid',
                value: data.user.id,
                httpOnly: true,
                path: '/',
                maxAge: 3600 
            });

        } else if (res.status === 404) {
            // Handle not found error
            return {
                success: false, message: data.message
            }
        } else if (res.status === 401){
            // Handle unauthorized error
            return {
                success: false,
                message: data.message
            };
        } else {
            // Handle generic server error
            return {
                success: false,
                message: 'Server error occurred. Try again'
            };
        }
    } catch (error) {
        // Handle any error that occurs during login
        return {
            success: false,
            message: 'Something went wrong. Try again!'
        };
    };

    // Redirect user to profile page after loggin in
    redirect('/profile');
};