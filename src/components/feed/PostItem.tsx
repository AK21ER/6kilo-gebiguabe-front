import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import CommentSection, { Comment } from './CommentSection';
import { toggleLikeApi, getCommentsApi, addCommentApi } from '../../api/feed';

export interface Post {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: Comment[];
    liked?: boolean;
}

interface PostItemProps {
    post: Post;
}

export default function PostItem({ post }: PostItemProps) {
    const [isLiked, setIsLiked] = useState(post.liked || false);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);

    useEffect(() => {
        if (showComments) {
            fetchComments();
        }
    }, [showComments]);

    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const response = await getCommentsApi(post.id);
            if (response.success) {
                const mappedComments: Comment[] = response.comments.map(c => ({
                    id: c.id,
                    author: c.author,
                    content: c.content,
                    timestamp: new Date(c.timestamp).toLocaleString()
                }));
                setComments(mappedComments);
            }
        } catch (err: any) {
            console.error("Failed to fetch comments:", err);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleLike = async () => {
        const previousLiked = isLiked;
        const previousCount = likesCount;

        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        try {
            const response = await toggleLikeApi(post.id);
            if (response.success) {
                setIsLiked(response.liked);
            }
        } catch (err) {
            setIsLiked(previousLiked);
            setLikesCount(previousCount);
        }
    };

    const handleAddComment = async (content: string) => {
        try {
            const response = await addCommentApi(post.id, content);
            if (response.success) {
                const c = response.comment;
                const newComment: Comment = {
                    id: c.id,
                    author: c.author,
                    content: c.content,
                    timestamp: 'Just now'
                };
                setComments([...comments, newComment]);
            }
        } catch (err: any) {
            alert("Failed to add comment: " + err.message);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-liturgical-blue/10 flex items-center justify-center text-liturgical-blue font-bold">
                        {post.author[0]}
                    </div>
                    <div>
                        <h3 className="font-semibold text-text">{post.author}</h3>
                        <span className="text-xs text-text-secondary">{post.timestamp}</span>
                    </div>
                </div>
                <button className="text-text-secondary hover:bg-gray-100 p-1 rounded-full transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <p className="text-text mb-4 leading-relaxed whitespace-pre-wrap">
                {post.content}
            </p>

            <div className="flex items-center gap-6 pt-3 border-t border-gray-50">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isLiked ? 'text-red-500' : 'text-text-secondary hover:text-red-500'}`}
                >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                    <span>{likesCount}</span>
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-liturgical-blue transition-colors"
                >
                    <MessageCircle size={18} />
                    <span>{comments.length}</span>
                </button>

                <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-gold transition-colors ml-auto">
                    <Share2 size={18} />
                </button>
            </div>

            {showComments && (
                <div className="relative">
                    {loadingComments && <div className="text-center py-2 text-sm text-text-secondary">Loading comments...</div>}
                    <CommentSection comments={comments} onAddComment={handleAddComment} />
                </div>
            )}
        </div>
    );
}
