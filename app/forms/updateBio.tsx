'use client'

import { UpdateBio } from "@/app/actions/updateBio";
import { useFormState } from "react-dom";

// Component to update a user bio
export default function Update() {
    // Form state and server action to handle user biog updating
    const [formState, action] = useFormState(UpdateBio, { message: '' });

    // Display success message if bio updated
    if (formState?.success) {
        return <p className="w-3/4 mx-auto mt-16">{formState.message}</p>
    };

    return (
        <div className="w-3/4 mx-auto mt-16">
            <form action={action} className='w-full px-8 flex flex-col'>
                <legend className='text-xl font-semi-bold text-primary'>Update Bio</legend>
                <label className=''>
                    <textarea name="bio" required className='w-full bg-inputbg font-light px-4 py-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary'
                    />
                </label>
                {/* Display any error that occurs during bio updating */}
                <p>{formState?.message}</p>
                <button type="submit" className='w-1/4 btn-shadow rounded-lg text-primary py-2'>Submit</button>
            </form>
        </div>
    );
};
