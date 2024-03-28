'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Define form state's interface
export interface StateType {
    success?: boolean | undefined;
    message?: string | undefined;
};

// Server action to handle creation of a comment in a post
export async function CreateComment(formState: StateType | undefined, formData: FormData) {
    // Extract comment message and post ID from form data
    const post = {
        message: formData.get('message'),
    };
    const postId = formData.get('postId')
   
    // Validate form inputs
    if (post.message === '') {
        return {
            success: false,
            message: 'Please add your comment!'
        };
    };


    // Get authorization token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const userId = cookieStore.get('userid')?.value

    // Define API URL
    const url = process.env.API_URL || 'http://localhost:5000/';

    try {
        // Send request to API
        const res = await fetch(`${url}api/comments/${postId}/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(post)
        });
    
        // Parse response
        const data = await res.json();

        // Handle success response
        if (res.status === 200) {

            // Revalidate a posts fetched data
            revalidatePath(`/posts/${postId}`)
            return {
                success: true
            };
        } else if(res.status === 422) {
            // Handle validation error
            return {
                message: 'Invalid inputs'
            };
        } else if(res.status === 401 || res.status === 403 ) {
            // Handle invalid token
            return {
                message: 'Please login'
            };
        } else if(res.status === 404) {
            // Handle if post with given post ID not found
            return {
                message: 'No post to put the comment'
            };
        } else if(res.status === 500) {
            // Handle servor errors
            return {
                message: 'Server error. Please try again!'
            };
        };     
        
    } catch (error) {
        // Handle any error that occurs during comment creation
        return {
            message: 'Something went wrong. Try again!'
        };
    };
};