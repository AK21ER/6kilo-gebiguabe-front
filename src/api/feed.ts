import { getRequest, postRequest } from "./api";

export interface ApiPost {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    likes: number;
    commentsCount: number;
    liked: boolean;
}

export interface ApiComment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
}

export const getPostsApi = () => getRequest<{ success: boolean; posts: ApiPost[] }>("/feed");
export const createPostApi = (content: string) => postRequest<{ success: boolean; post: any }, { content: string }>("/feed", { content });
export const toggleLikeApi = (postId: string) => postRequest<{ success: boolean; liked: boolean }, {}>(`/feed/${postId}/like`, {});
export const getCommentsApi = (postId: string) => getRequest<{ success: boolean; comments: ApiComment[] }>(`/feed/${postId}/comments`);
export const addCommentApi = (postId: string, content: string) => postRequest<{ success: boolean; comment: ApiComment }, { content: string }>(`/feed/${postId}/comments`, { content });
