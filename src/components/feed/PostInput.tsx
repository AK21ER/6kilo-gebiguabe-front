import { useState } from 'react';
import { Send } from 'lucide-react';

interface PostInputProps {
  onPost: (content: string) => void;
}

export default function PostInput({ onPost }: PostInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(content);
    setContent('');
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all hover:shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-liturgical-blue/10 flex items-center justify-center text-liturgical-blue font-bold">
              U
            </div>
          </div>
          <div className="flex-grow">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full min-h-[80px] p-3 text-text placeholder-text-secondary bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-liturgical-blue/20 resize-none transition-all"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!content.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-liturgical-blue text-white rounded-lg font-medium hover:bg-liturgical-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
