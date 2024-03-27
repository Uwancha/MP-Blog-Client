'use server';

import { cookies } from "next/headers";

// Server action to log a user out
export const logout = async () => {
    // Reset cookies
    cookies().set({
        name: 'token',
        value: '',
        expires: new Date(0) 
    });

    cookies().set({
        name: 'user',
        value: '',
        expires: new Date(0) 
    });

    cookies().set({
        name: 'userid',
        value: '',
        expires: new Date(0)
    });
};