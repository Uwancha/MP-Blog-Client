'use client'

import { useFormState } from "react-dom";
import { RegisterUser } from "../actions/register";
import Link from "next/link";
import { SubmitButton } from "../components/submitButton";

// Registration page component
export default function Register() {
    // Form state and server action to handle registration
    const [formState, formAction] = useFormState(RegisterUser, { message: '' });

    return (
        <main className='bg-inputbgsecond flex flex-col mx-8 mt-16 mb-20 px-8 py-8
            sm:w-2/4 sm:mx-auto sm:my-20 sm:p-10 lg:w-1/4'
        >
            <legend className='text-center text-primary text-2xl font-semi-bold mb-6'>Register</legend>
  
            <form action={formAction} className='flex flex-col gap-2 sm:gap-4'>
                <label htmlFor="username"
                    className='flex flex-col gap-2 mb-2'
                >
                  User Name
                  <input
                        type="text"
                        id="username"
                        name="username"
                        minLength={3}
                        required
                        placeholder='username'
                        className="bg-default py-2 pl-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {/* Display if error exists for username field */}
                  <span className="text-red-500 text-sm pl-2">{formState?.error?.username}</span>
                </label >
  
                <label htmlFor="password" className='flex flex-col gap-2 mb-2'>
                  Password
                  <input
                        type="password" 
                        id="password"
                        name="password"
                        min={8}
                        required
                        placeholder='********'
                        className="bg-default py-2 pl-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {/* Display if error exists for password field */}
                  <span className="text-red-500 text-sm pl-2">{ formState?.error?.password }</span>
                </label>

                <label htmlFor="confirmPswd" className='flex flex-col gap-2 mb-2'>
                  Confirm Password
                  <input
                        type="password" 
                        id="confirmPswd"
                        name="confirmPwsd"
                        min={8}
                        required
                        placeholder='********'
                        className="bg-default py-2 pl-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {/* Display if error exists for password confirmtion field */}
                  <span className="text-red-500 text-sm pl-2">{ formState?.error?.confirm }</span>
                </label>

                {/* Display any errors occurs during registeration */}
                <p className="text-red">{formState?.message}</p>
                <SubmitButton text={"Register"} pendingStatusText={"Registering.."} />
            </form>
            <p className='text-sm my-4'>
                Already registered? <Link href='/login' className='text-primary'>Login</Link>
            </p>
        </main>
    );
};