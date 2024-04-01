'use client'

import { UpdateBio } from "@/app/actions/updateBio";
import { useFormState } from "react-dom";
import { SubmitButton } from "../components/submitButton";

// Component to update a user bio
export default function Update() {
    // Form state and server action to handle user biog updating
    const [formState, action] = useFormState(UpdateBio, { message: '' });

    // Display success message if bio updated
    if (formState?.success) {
        return <p className="sm:w-3/4 mx-auto mt-16 py-8">{formState.message}</p>
    };

    return (
        <div className="sm:w-2/4 mx-auto mt-16">
            <form action={action} className='w-full px-8 flex flex-col gap-8'>
                <legend className='text-xl font-bold text-primary'>Update Bio</legend>
                <label className=''>
                    <textarea name="bio" required className='w-full bg-inputbg font-light px-4 py-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary'
                    />
                </label>
                {/* Display any error that occurs during bio updating */}
                <p>{formState?.message}</p>
                <SubmitButton text={"Update"} pendingStatusText={"Updating..."} />
            </form>
        </div>
    );
};
