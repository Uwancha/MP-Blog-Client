import PostCard, { Post } from "./components/postCard";
import Header from "./components/header";

// Function to fetch all posts from the API
const FetchAllPosts = async () => {
  try {
    // Define API URL
    const url = process.env.API_URL || 'http://localhost:5000/'
    
    // Fetch posts from the API
    const res = await fetch(`${url}api/posts`, {
      method: "GET"
    });

    // Handle case where no posts are found
    if (res.status === 404) {
      return null;
    };

    // Parse response
    const result = await res.json();

    // Return posts if fetch is successful
    if (res.ok) {
      return result;
    };

  } catch (error) {
    // Throw error if fetching posts fails
    throw new Error('Error fetching posts');
  };
};

// Homepage component
export default async function Home() {
  // Fetch all posts
  const allposts = await FetchAllPosts();

  return (
    <>
      {/* Render header component */}
      <Header />
      {/* Main component */}
      <main>
        {/* Check if posts exist */}
        {allposts ? (
          // Map through posts and render PostCard component for each
          allposts.data.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          // Display message if no posts exist
          <p className="text-center mt-20 text-2xl">No post created yet!</p>
        ) }
      </main>
    </>
  );
}
