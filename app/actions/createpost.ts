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

// Server action to handle a new post creation
export async function CreatePost(formState: StateType | undefined, formData: FormData) {
    // Extract post fields from the form data
    const post = {
        title: formData.get('title'),
        body: formData.get('body'),
        tags: formData.get('tags')
    };
   
    //  Validate form fields
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

    // Get authorization token from cookies
    const cookieStore = cookies()
    const tokencookie = cookieStore.get('token')
    const token = tokencookie?.value

    // Define API URL
    const url = process.env.API_URL || 'http://localhost:5000/';

    try {
        // Send request with post fields
        const res = await fetch(`${url}api/posts`, {
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
            return {
                success: true
            };
        } else if(res.status === 422) {
            // Handle validation error
            return {
                message: 'Invalid inputs.'
            };
        } else if(res.status === 500) {
            // Handle server error
            return {
                message: 'Invalid inputs.'
            };
        };     
        
    } catch (error) {
        // Handle any error that occurs during post creation
        return {
            message: 'Something went wrong. Try again!'
        };
    };
};