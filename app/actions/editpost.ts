'use server';

import { cookies } from "next/headers";

// Define form state's interface
export interface StateType {
    success?: boolean | undefined;
    message?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    tags?: string | undefined;
};

// Server action to handle editing a post
export async function EditPost(formState: StateType | undefined, formData: FormData) {
    // Extract post fields from the form data
    const post = {
        title: formData.get('title'),
        body: formData.get('body'),
        tags: formData.get('tags')
    };

    // Get post ID from the form
    const postId = formData.get('postId')
   
    // Validate inputs
    if (post.title === '') {
        return {
            success: false,
            error: {
                title: 'Title can not be empty!'
            }
        };
    };

    if (post.body === '') {
        return {
            error: {
                body: 'Body can not be empty!'
            }
        }    
    };

    if (!post.tags) {
        return {
            success: false,
            error: {
                tags: 'Add at least one tag'
            }
        }  
    };

    // Get authorization token and user ID from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    // Define API URL
    const url = process.env.API_URL || 'http://localhost:5000/';

    try {
        // Send request with post fields
        const res = await fetch(`${url}api/posts/${postId}`, {
            method: 'PUT',
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
                message: 'No post to edit'
            };
        } else if(res.status === 500) {
            // Handle server error
            return {
                message: 'Invalid inputs.'
            };
        };
        
    } catch (error) {
        // Handle any error that occurs during post edition
        return {
            message: 'Something went wrong. Try again!'
        };
    };
};