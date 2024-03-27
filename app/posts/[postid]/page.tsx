import Header from '@/app/components/header'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'
import AddComment from '../../forms/addComment'
import CommentCard, { Comment } from '@/app/components/commentCard'

// Function to fetch a single post detail
const fetchPost = async (id: string) => {
    try {
        // Define API URL
        const url = process.env.API_URL || 'http://localhost:5000/'
        
        // Fetch post detail from the API
        const res = await fetch(`${url}api/posts/${id}`, {
          method: "GET"
        })
    
        // Handle case where no post exists
        if (res.status === 404) {
          return null
        }
    
        // Parse respone
        const result = await res.json();

        // Return response if response is successful
        if (res.ok) {
          return result;
        };
    } catch (error) {
        // Throw error if fetching posts failed
        throw new Error('Error fetching posts');
    };
};

// Component to display a post's detail
export default async function Post({params} : {params: {postid: string}}) {
    // Fetch post information
    const post = await fetchPost(params.postid);

    // Split post body into an array of strings
    const bodyParts = post.data.body.split('\r\n');

    // Format the date
    const dateFormat = 'MMM dd, yyyy'
    const formatedDate = format(post.data.createdAt, dateFormat)

    return (
        <>
            {/* Header component */}
            <Header />
            {/* Main component */}
            <main className='flex flex-col gap-8 mt-12 mb-16'>
                <section className='w-full mx-8 sm:w-3/4 lg:w-1/2 sm:mx-auto flex items-center gap-8'>
                    {/* Display author avatar */}
                    {post.data.author.profile.avatar ? 
                        ( 
                            <Image src={`${post.data.author.profile.avatar}`} width={50} height={50} className="" alt="Profile image or avatar" /> 
                        ): (
                            <Image src={'/person-circle-sharp.svg'} width={50} height={50} className="" alt="Profile image or avatar" />
                        )
                    }
                    <div className="flex flex-col" >
                        {/* Display author user name */}
                        <p className='text-blacklish sm:font-bold mb-.5' >{post.data.author.username}</p>
                        {/* Display post creation date */}
                        <p className='text-blacklish' >{formatedDate}</p>
                    </div>
                </section>
                <section className='mx-8 sm:w-3/4 lg:w-1/2 sm:mx-auto my-8'>
                    {/* Display post title */}
                    <h1 className='font-semi-bold mb-4'>{post.data.title}</h1>
            
                    {/* Display post content */}
                    {bodyParts.map((part: string) => (
                        <article key={part} className='font-light my-4'>
                            { part }
                        </article>
                    ))}
                </section>
                <section className='mt-16'>
                    {/* Render form to add a comment to the post */}
                    <AddComment postid={params.postid}  />
                    
                    {/* Map through and render existing comments in the CommentCard component */}
                    {post.data.comments.map((comment: Comment) => (
                        <CommentCard key={comment._id} comment={comment} />
                    ))}
                </section>
            </main>
        </>
    )
}
