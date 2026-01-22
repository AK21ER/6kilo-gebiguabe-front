import { useState } from 'react';
import { Send } from 'lucide-react';

export interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
}

interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (content: string) => void;
}

export default function CommentSection({ comments, onAddComment }: CommentSectionProps) {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        onAddComment(newComment);
        setNewComment('');
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-4 mb-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">
                            {comment.author[0]}
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold text-sm text-text">{comment.author}</span>
                                <span className="text-xs text-text-secondary">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-text-secondary">{comment.content}</p>
                        </div>
                    </div>
                ))}
                {/* Backend Note: Comments are currently mocked. Implementation for fetching real comments linked to post ID is needed. */}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-grow px-3 py-2 text-sm bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-liturgical-blue/20 transition-all placeholder-text-secondary"
                />
                <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="p-2 text-liturgical-blue hover:bg-liturgical-blue/5 rounded-lg disabled:opacity-50 transition-colors"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
