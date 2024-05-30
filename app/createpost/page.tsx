'use client';

import { CreatePost } from '../actions/createpost';
import { useFormState } from 'react-dom';
import { SubmitButton } from '../components/submitButton';

export default function BlogPostForm() {
    // Form state and server action to handle post creation
    const [formState, action] = useFormState(CreatePost, { message: '' });

    return (
        <main className='mt-12 mb-16'>
            <form action={action} className='mx-8 sm:w-3/4 sm:mx-auto flex flex-col gap-8'>
                <legend className='text-primary text-2xl text-center font-semi-bold'>Create Post</legend>
                <label className='flex flex-col gap-4'>
                    Title:
                    <textarea name="title" rows={2} required className='bg-inputbg font-light px-4 py-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary'
                    />
                    {/* Display if error exists in post title field */}
                    <span className="text-red-500 text-sm pl-2">{formState?.error?.title}</span>
                </label>
                <label className='flex flex-col gap-4'>
                    Body:
                    <textarea rows={20} name="body" required className='bg-inputbg px-4 py-4 rounded-lg
                    focus:outline-none focus:ring-1 focus:ring-primary' 
                    />
                    {/* Display if error exists in post body field */}
                    <span className="text-red-500 text-sm pl-2">{formState?.error?.body}</span>
                </label>
                <label className='flex flex-col gap-4' >
                    Select Tags:
                    <select multiple name="tags" required 
                        style={{
                            padding: 0,
                            border: 'none', 
                            backgroundColor: 'transparent',
                            height: '100px',
                            overflow: 'hidden',
                        }} >
                        <option value="react" className='bg-inputbg mb-2' >React</option>
                        <option value="js" className='bg-inputbg mb-2' >JavaScript</option>
                        <option value="node" className='bg-inputbg mb-2' >Node.js</option>
                    </select>
                    {/* Display if error exists in post tags */}
                    <span className="text-red-500 text-sm pl-2">{formState?.error?.tags}</span>
                </label>
                {/* Display any error that occurs during post creation*/}
                <span className="text-red-500 text-sm pl-2">{formState?.message}</span>
                <SubmitButton text={"Publish"} pendingStatusText={"Publishing.."} />
            </form>
        </main>
    );
};