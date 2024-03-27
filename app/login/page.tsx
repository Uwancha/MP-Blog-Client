'use client';

import Link from "next/link";
import { useFormState } from "react-dom";
import { LoginUser } from "../actions/login";
import { redirect } from "next/navigation";

// Login page component
export default function Login () {
    // Form state and server action to handle logging a user in
    const [ formState, action ] = useFormState(LoginUser, { success: false, message: '' } )

    // Check if login is successful and redirect a user
    if (formState.success) {
        return redirect('/');
    };
    
    return (
        <>
            {/* Brand logo */}
            <div className="py-4 shadow-lg">
                <Link href={'/'} className="pl-16 text-primary text-xl sm:text-3xl font-bold">MP</Link> 
            </div> 
            {/* Main component */}      
            <main className='bg-inputbgsecond flex flex-col mx-8 mt-16 mb-20 px-8 py-8
                sm:w-3/4 sm:mx-auto sm:my-20 sm:p-10 lg:w-1/4'
            >
                <legend className='text-center text-primary text-2xl font-semi-bold mb-6'>Login</legend>
                <form action={action}
                    className='flex flex-col gap-2 sm:gap-4'
                > 
                    <label htmlFor='username'
                        className='flex flex-col gap-2 mb-2'
                    >
                        Username
                        <input type='text'
                            id='username'
                            name='username'
                            required
                            placeholder='username'
                            className="bg-default py-2 pl-2 rounded-lg
                            focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {/* Display if error exists for username field */}
                        <span className='text-red-500 text-sm pl-2'>{formState.error?.username}</span>
                    </label>
                    <label htmlFor='password'
                        className='flex flex-col gap-2 mb-2'
                    >
                        Password
                        <input type='password'
                            id='password'
                            name="password"
                            required
                            placeholder='********'
                            className="bg-default py-2 pl-2 rounded-lg
                            focus:outline-none focus:ring-1 focus:ring-primary" 
                        />
                        {/* Display if error exists for password */}
                        <span className='text-red-500 text-sm pl-2'>{formState.error?.password}</span>
                    </label>
                    {/* Display default form error message */}
                    <p>{formState.message}</p>
                    <button type="submit" className="text-primary btn-shadow rounded-sm py-2 ">
                        Login
                    </button>
                </form>
                <p className='text-sm my-4'>
                    Not registered yet? <Link href='/register' className='text-primary'>Register</Link>
                </p>
            </main>
        </>
    )
};