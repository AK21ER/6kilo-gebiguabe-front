import { useEffect, useState } from 'react';
import PostInput from '../components/feed/PostInput';
import PostList from '../components/feed/PostList';
import { Post } from '../components/feed/PostItem';
import { getPostsApi, createPostApi } from '../api/feed';
import LoadingScreen from '../components/ui/LoadingScreen';

export default function SocialFeed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getPostsApi();
            if (response.success) {
                // Map API response to Post type expected by components
                const mappedPosts: Post[] = response.posts.map(p => ({
                    id: p.id,
                    author: p.author,
                    content: p.content,
                    timestamp: new Date(p.timestamp).toLocaleString(),
                    likes: p.likes,
                    liked: p.liked,
                    comments: [] // Comments will be fetched on demand by PostItem
                }));
                setPosts(mappedPosts);
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    const handleNewPost = async (content: string) => {
        try {
            const response = await createPostApi(content);
            if (response.success) {
                const p = response.post;
                const newPost: Post = {
                    id: p.postid.toString(),
                    author: p.author.adminusername,
                    content: p.content,
                    timestamp: 'Just now',
                    likes: 0,
                    liked: false,
                    comments: []
                };
                setPosts([newPost, ...posts]);
            }
        } catch (err: any) {
            alert("Failed to create post: " + err.message);
        }
    };

    if (loading && posts.length === 0) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-liturgical-blue mb-2">Community Feed</h1>
                    <p className="text-text-secondary">Share your ideas and connect with others</p>
                </header>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">
                        {error}
                        <button onClick={fetchPosts} className="ml-2 underline font-semibold">Retry</button>
                    </div>
                )}

                <PostInput onPost={handleNewPost} />
                <PostList posts={posts} />
            </div>
        </div>
    );
}
