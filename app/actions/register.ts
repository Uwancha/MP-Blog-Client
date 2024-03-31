'use server';

import { redirect } from "next/navigation";

// Define form state's interface/type
export interface StateType {
    success?: boolean | undefined;
    message?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    confirm?: string | undefined;
};

// Server action to handle user registration
export async function RegisterUser(formState: StateType | undefined, formData: FormData) {
    // Extract user credentials from form data
    const credentials = {
        username: formData.get('username'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPwsd')
    };
   
    // Validate user credentials
    if (credentials.password !== credentials.confirmPassword || credentials.confirmPassword === '') {
        return {
            success: false,
            error: {
                confirm: 'Password do not match'
            }
        };
    };

    if (credentials.username === '') {
        return {
            error: {
                username: 'Name can not be empty and must be above 2 char'
            }
        };  
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
    const url = process.env.API_URL || 'http://localhost:5000/';

    try {
        // Send request to the API with a user's credentials
        const res = await fetch(`${url}api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
    
        // Parse response
        const data = await res.json();

        // Handle success response
        if (res.status === 200) {
            console.log('Registered');
        } else {
            if(res.status === 409) {
                // Handle if user with the given user name already exists
                return {
                    error: {
                        username: 'User name already used'
                    }
                };
            } else if(res.status === 400) {
                // Handle invalid user inputs
                return {
                    message: 'Invalid inputs.'
                };
            };     
        };
    } catch (error) {
        // Handle any erro that occurs during registration
        return {
            message: 'Something went wrong. Try again!'
        };
    };
    
    // Redirect user to login page after registration
    redirect('/');
};