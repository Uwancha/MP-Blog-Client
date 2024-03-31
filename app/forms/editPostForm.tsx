'use client';

import { useFormState } from 'react-dom';
import { EditPost } from '../actions/editpost';
import { SubmitButton } from '../components/submitButton';

// Component to edit a post
export function EditPostForm({ post } : {post : {title: string, _id: string, body: string}}) {
    // Form state and server action to handle post edition
    const [formState, action] = useFormState(EditPost, { message: '' });

    // Display success message if post edited
    if (formState?.success) {
        return <p className="w-3/4 mx-auto mt-16">{formState.message}</p>;
    };

    return (
        <div className='w-full mt-16 bg-default/90'>
            <form action={action} className='w-full mx-4 sm:w-3/4 sm:mx-auto px-8 flex flex-col gap-8'>
                <legend className='text-primary text-2xl text-center font-semi-bold'>Edit Post</legend>
                <input type="text" name='postId' value={post._id} hidden readOnly/>
                <label className='flex flex-col gap-4'>
                    Title:
                    <textarea name="title" placeholder={post.title} rows={2} required className='bg-inputbg font-light px-4 py-2 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary'
                    />
                    {/* Display if error exists in post title field */}
                    <span className="text-red-500 text-sm pl-2">{formState?.error?.title}</span>
                </label>
                <label className='flex flex-col gap-4'>
                    Body:
                    <textarea rows={20} placeholder={post.body} name="body" required className='bg-inputbg px-4 py-4 rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-primary' 
                    />
                    {/* Display if error exists in post body field */}
                    <span className="text-red-500 text-sm pl-2">{formState?.error?.body}</span>
                </label>
                <label className='flex flex-col gap-4' >
                    Select Tags:
                    <select multiple name="tags" required style={{
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
                {/* Display any error that occurs during post edition*/}
                <span className="text-red-500 text-sm pl-2">{formState?.message}</span>
                <SubmitButton text={"Edit"} pendingStatusText={"Editing..."} />
            </form>
        </div>
    );
};
