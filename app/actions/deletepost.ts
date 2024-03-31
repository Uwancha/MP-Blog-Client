'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define form state's interface
export interface StateType {
    success?: boolean | undefined;
    message?: string | undefined;
};

// Server action to handle deletion of a post
export async function deletePost(formState: StateType | undefined, formData: FormData) {
    // Extract post ID from form data
    const postId = formData.get('postId');
   
    // Validate ID
    if (postId === '') {
        return {
            success: false,
            message: 'No post to delete'
        };
    };

    // Get authorization token and user ID from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const userId = cookieStore.get('userid')?.value

    // Define API URL
    const url = process.env.API_URL || 'http://localhost:5000/';

    try {
        // Send request to API
        const res = await fetch(`${url}api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            },
        });
    
        // Parse response
        const result = await res.json();

        // Handle success response
        if (res.status === 204) {
            console.log('Post deleted');
        } else if(res.status === 401 || res.status === 403 ) {
            // Handle invalid token
            return {
                message: 'Please login'
            };
        } else if(res.status === 404) {
            // Handle if post with given post ID not found
            return {
                message: 'No post to delete'
            };
        } else if(res.status === 500) {
            return {
                success: false,
                message: 'Server error. Please try again!'
            };
        };     
        
    } catch (error) {
        return {
            message: 'Something went wrong. Try again!'
        };
    };

    // Revalidate user profile data
    revalidatePath(`/profile`);
    // Return success to true
    return {
        success: true
    };
};