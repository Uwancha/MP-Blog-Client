'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Define form state's interface
export interface StateType {
    success?: boolean | undefined;
    message?: string | undefined;
};

// Server action to handle updating of a user's avatar
export async function updateAvatar(formState: StateType | undefined, formData: FormData) {
    // Extract avatar file from the form data
    const data = {
        avatar: formData.get('file'),
    };
   
    // Validat input
    if (data.avatar === '') {
        return {
            success: false,
            message: 'Please upload avatar!'
        };
    };

    // Get authorization token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const userId = cookieStore.get('userid')?.value

    // Define API URL
    const url = process.env.API_URL || 'http://localhost:5000/';

    try {
        // Send request to the API
        const res = await fetch(`${url}api/profile/avatar`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        // Handle success response
        if (res.status === 200) {
            console.log('Avatar updated!')
        } else if(res.status === 422) {
            // Handle validation error
            return {
                message: 'Invalid inputs'
            };
        } else if(res.status === 401 || res.status === 403 || res.status === 404) {
            // Handle invalid token
            return {
                message: 'Please login'
            };
        } else if(res.status === 500) {
            // Handle server error
            return {
                success: false,
                message: 'Server error. Please try again!'
            };
        };     
        
    } catch (error) {
        // Handle any error that occurrs during updating a user's avatar
        return {
            message: 'Something went wrong. Try again!'
        };
    };

    // Revalidate fetched data in the user profile
    revalidatePath(`/profile`)
    return {
        success: true,
        message: 'Avatar updated'
    };
};