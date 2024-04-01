import { EditPostForm } from "@/app/forms/editPostForm";
import ToggleForm from "@/app/components/toggleForm";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import UpdateAvatar from "@/app/forms/updateavatar";
import Update from "@/app/forms/updateBio";
import DeletePost from "@/app/forms/deletePostForm";

// Function to fetch user profile data
const GetProfile = async () => {
    // Get token from cookies
    const cookieStore = cookies();
    const token= cookieStore.get('token')?.value;

    try {
        // Define API URL
        const url = process.env.API_URL || 'http://localhost:5000/';

        // Fetch profile information from the API
        const res = await fetch(`${url}api/profile`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        // Handle case where no profile information is found
        if (res.status === 404) {
          return null;
        };
    
        // Parse response
        const result = await res.json();

        // Return response if fetch is successful
        if (res.ok) {
          return result;
        };
    } catch (error) {
        // Throw error if fetching posts fails
        throw new Error('Error fetching posts');
    };
};

// Component to display user profile
export default async function Profile() {
    // Fetch profile information
    const profile = await GetProfile();

    // Redirect to login if no user exists
    if (!profile) {
        return redirect('/login');
    };

    return (
        <>
            {/* Brand logo */}
            <div className="py-4 shadow-sm">
                <Link href={'/'} className="pl-16 text-primary text-xl sm:text-3xl font-bold">MP</Link> 
            </div>
            
            {/* Main component */}
            <main className="pb-16 pt-8 bg-inputbg">
                <div className="shadow sm:mx-16 pl-4 py-8 flex flex-col gap-4 bg-default/80">
                    <section className="mx-4 sm:w-3/4 sm:mx-auto flex gap-8 items-center">
                        {profile.data.user.avatar ? ( <Image src={`${profile.data.user.avatar}`} width={50} height={50} className="" alt="Profile image or avatar" /> ): (<Image src={'/person-circle-sharp.svg'} width={50} height={50} className="" alt="Profile image or avatar" />)}
                        <p className="text-xl text-primary">{profile.data.user.username}</p>
                    </section>
                    <div className=" mt-2 mb-8">
                        {/* Form to update avatar */}
                        <ToggleForm text="Update avatar" children={<UpdateAvatar />}/>
                    </div>
                    <section className="mx-4 sm:w-3/4 sm:mx-auto flex flex-col gap-4">
                        <div className="w-full border-b border-b-primary">
                            {profile.data.user.bio ? <p>{profile.data.user.bio}</p> : <p>Bio</p>}
                        </div>
                    </section>
                    <div className="mt-2 mb-8">
                        {/* Form to update user bio */}
                        <ToggleForm text="Update bio"  children={<Update />}/>
                    </div>
                </div>
                <section className="mt-24 flex flex-col gap-8">
                    {/* Display posts created by the user */}
                    <p className="mx-4 sm:w-3/4 sm:mx-auto text-xl">{profile.data.userposts.length} Post/s Published</p>
                    {/* Map through user posts */}
                    { profile.data.userposts.map((post: {title: string, _id: string, body: string}) => (
                        <div key={post._id} className="shadow py-4 mb-5 flex flex-col gap-8 bg-default">
                            <h2 className='mx-4 sm:w-3/4 sm:mx-auto pl-3 font-light mb-2'>{post.title}</h2>
                            {/* Form to delete the post */}
                            <ToggleForm text="Delete" children={<DeletePost id={post._id}  />} />
                            
                            <div className="pl-4 pr-16">
                                {/* Form to edit the post */}
                                <ToggleForm text="Edit" children={<EditPostForm post={post} />}/>
                            </div>
                        </div>
                    )) }
                </section>
            </main>
        </>
    )
}
