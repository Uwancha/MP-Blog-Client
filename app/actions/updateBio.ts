'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Define form state's interface
export interface StateType {
    success?: boolean | undefined;
    message?: string | undefined;
};

// Server action to handle updating a user's bio
export async function UpdateBio(formState: StateType | undefined, formData: FormData) {
    // Extract bio field from the form
    const data = {
        bio: formData.get('bio'),
    };
   
    // Validate input
    if (data.bio === '') {
        return {
            success: false,
            message: 'Please add your bio!'
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
        const res = await fetch(`${url}api/profile/${userId}/bio`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    
        if (res.status === 200) {
            // Revalidate fetched data in the user profile
            revalidatePath(`/profile/${userId}`)
            return {
                success: true,
                message: 'Bio updated'
            };
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
                message: 'Server error. Please try again!'
            };
        };     
    } catch (error) {
        // Handle any error that occurrs during updating a user's bio
        return {
            message: 'Something went wrong. Try again!'
        };
    };
};