import PostItem, { Post } from './PostItem';

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
            <div className="text-center text-text-secondary text-sm py-8">
                You've reached the end of the feed
            </div>
        </div>
    );
}
