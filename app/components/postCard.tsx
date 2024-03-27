import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

// Define the Post interface
export interface Post {
    createdAt: Date
    title: string;
    author: {
        username: string;
        profile: {
            avatar: string;
        }
    };
    _id: string,
    tags: string[]
}

// Component to display a single post card
export default function PostCard({ post }:{ post: Post }) {
    // Format the date
    const dateFormat = 'MMM dd, yyyy'
    const formatedDate = format(post.createdAt, dateFormat)
  
    console.log(post)
    return (
    <section className="w-full mx-4 sm:w-3/4 lg:w-1/2 sm:mx-auto font-light box-shadow p-4 mb-5 mt-8" >
        {/* Link to the individual post */}
        <Link href={`posts/${post._id}`} className='flex flex-col gap-8'>
            <div className="flex items-center gap-4" >
                {post.author.profile.avatar ? 
                    ( 
                        <Image src={`${post.author.profile.avatar}`} width={50} height={50} className="" alt="Profile image or avatar" /> 
                    ): (
                        <Image src={'/person-circle-sharp.svg'} width={50} height={50} className="" alt="Profile image or avatar" />
                    )
                }
                <div className="flex flex-col" >
                    {/* Author's username */}
                    <p className='font-semi-bold' >{post.author.username}</p>
                    {/* Post creation date */}
                    <p>{formatedDate}</p>
                </div>
            </div>
            {/* Post title */}
            <h2 className='pl-3 mb-2'>{post.title}</h2>
            <div className='flex '>
                {/* Display post tags */}
                {post.tags.map(tag => (
                    <p key={tag} className='text-primary'>#{tag}</p>
                ))}
            </div>
        </Link>
    </section>
  )
}
