import { useState } from 'react';
import PostInput from '../components/feed/PostInput';
import PostList from '../components/feed/PostList';
import { Post } from '../components/feed/PostItem';

// Mock data moved here or imported
const MOCK_POSTS: Post[] = [
    {
        id: '1',
        author: 'Admin',
        content: 'Welcome to the community feed! Share your thoughts, ideas, and feedback with us. \n\nWe want to hear from you!',
        timestamp: '2 hours ago',
        likes: 42,
        liked: false,
        comments: [
            {
                id: 'c1',
                author: 'User 1',
                content: 'This is great! Finally a place to share ideas.',
                timestamp: '1 hour ago'
            }
        ]
    },
    {
        id: '2',
        author: 'Sarah J.',
        content: 'I think we should have a weekly meetup for developers. Who is in?',
        timestamp: '5 hours ago',
        likes: 15,
        liked: true,
        comments: []
    }
];

export default function SocialFeed() {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

    const handleNewPost = (content: string) => {
        // Backend Note: Implementation for creating a post API call needed here
        const newPost: Post = {
            id: Date.now().toString(),
            author: 'Current User', // Should come from auth
            content: content,
            timestamp: 'Just now',
            likes: 0,
            comments: []
        };
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-liturgical-blue mb-2">Community Feed</h1>
                    <p className="text-text-secondary">Share your ideas and connect with others</p>
                </header>

                <PostInput onPost={handleNewPost} />
                <PostList posts={posts} />
            </div>
        </div>
    );
}
