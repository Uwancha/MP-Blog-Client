'use client'

import { deletePost } from "@/app/actions/deletepost";
import { useFormState } from "react-dom";

// Component to delete a post
export default function DeletePost({ id }: { id: string }) {
    // Form state and server action to handle post deletion
    const [formState, action] = useFormState(deletePost, { message: '' });

    // Display success message if post deleted
    if (formState?.success) {
        return <p className="mx-10 sm:w-3/4 sm:mx-auto mt-16">{formState.message}</p>
    };

    return (
        <div className="mt-16">
            <form action={action} className='w-full px-8 flex flex-col'>
                <legend className='text-xl font-semi-bold text-primary'>Update Bio</legend>

                <input type="text" name="postId" value={id} hidden readOnly />
                <p className="my-8">You wanna delete this post?</p>
                {/* Display any error that occurs during post deletion */}
                <p >{formState?.message}</p>
                <button type="submit" className='w-1/4 btn-shadow rounded-lg text-primary py-2'>Delete</button>
            </form>
        </div>
    );
};
