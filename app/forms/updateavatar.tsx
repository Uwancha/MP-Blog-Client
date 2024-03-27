'use client'

import { updateAvatar } from "@/app/actions/updateavatar";
import { useFormState } from "react-dom";

// Compone to update a user's avatar
export default function UpdateAvatar() {
    // Form state and server action to handle user avatar update
    const [formState, action] = useFormState(updateAvatar, { message: '' });

    // Display success message if avatar updated
    if (formState?.success) {
        return <p className="w-3/4 mx-auto mt-16" >{formState.message}</p>
    };

    return (
        <div className="w-3/4 mx-auto mt-16">
            <form action={action} className='w-full px-8 flex flex-col'>
                <legend className='text-xl font-semi-bold text-primary'>Update Bio</legend>
                <label htmlFor='file'
                    className='flex flex-col gap-2'
                >
                File
                <input type='file'
                    id='avatar'
                    name='avatar'
                    required
                    className="bg-inputbg py-2 pl-2 rounded-lg
                    focus:outline-none focus:ring-1 focus:ring-primary"
                />
                
                </label>
                {/* Display any error that occurs during avatar updating */}
                <p className='text-red-500 text-sm pl-2'>{formState?.message}</p>
                <button type="submit" className='w-1/4 btn-shadow rounded-lg text-primary py-2'>Submit</button>
            </form>
        </div>
    );
};
