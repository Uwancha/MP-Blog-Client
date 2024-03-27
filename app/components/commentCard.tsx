import Image from 'next/image';
import { format } from 'date-fns';

// Define comment's interface
export interface Comment {
    createdAt: Date
    message: string;
    author: {
        username: string
        profile: {
            avatar: string
        };
    };
    _id: string,
}

// Component to display a single comment card
export default function CommentCard({ comment }:{ comment: Comment }) {
    // Format the data
    const dateFormat = 'MMM dd, yyyy'
    const formatedDate = format(comment.createdAt, dateFormat)
  
  return (
    <section className="mx-8 sm:w-3/4 lg:w-1/2 sm:mx-auto font-light shadow px-4 py-8 mb-5 mt-8 rounded-lg" >
        <div className="flex items-center gap-4" >
            {/* Display author's profile image or avatar */}
            {comment.author.profile.avatar ? 
                ( 
                    <Image src={`${comment.author.profile.avatar}`} width={50} height={50} className="" alt="Profile image or avatar" /> 
                ): (
                    <Image src={'/person-circle-sharp.svg'} width={50} height={50} className="" alt="Profile image or avatar" />
                )
            }
            <div className="flex flex-col" >
                {/* Display author's username */}
                <p className='font-semi-bold' >{comment.author.username}</p>
                {/* Display comment creation date */}
                <p >{formatedDate}</p>
            </div>
        </div>
        {/* Display comment message */}
        <h2 className='pl-3 mt-8'>{comment.message}</h2>
    </section>
  )
}