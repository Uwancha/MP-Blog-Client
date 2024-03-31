'use client'

import { CreateComment } from "@/app/actions/createcomment";
import { useFormState } from "react-dom";
import { SubmitButton } from "../components/submitButton";

// Component to create a comment in a post
export default function AddComment({ postid } :{ postid: string} ) {
    // Form state and server action to handle comment creation
    const [formState, action] = useFormState(CreateComment, { message: '' });

    return (
        <div className="mx-8 sm:w-3/4 lg:w-1/2 sm:mx-auto">
            <form action={action} className='w-full flex flex-col gap-2'>
                <legend className='text-xl font-semi-bold'>Add Comment</legend>
                <input hidden name="postId" value={postid} readOnly/>
                <label >
                    <textarea name="message" required className='w-full bg-inputbg font-light px-4 py-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary'
                    />
                </label>
                {/* Display any error that occurs during comment creation */}
                <p>{formState?.message}</p>
                <SubmitButton text={"Post"} pendingStatusText={"Posting..."} />
            </form>
        </div>
    )
};
