import { useMutation, useQuery, useQueryClient } from 'react-query';

import { PostsAPI } from '../api/posts';

export const usePost = postId => {
	return useQuery([`post`, postId], () => PostsAPI.getPostById(postId));
};

export const useCreatePost = newData => {
	const queryClient = useQueryClient();
	return useMutation(() => PostsAPI.createPost(newData), {
		onSuccess: () => queryClient.refetchQueries(`posts`),
		onError: () => null,
		onSettled: () => null,
	});
};

export const useUpdatePost = (id, newData) => {
	const queryClient = useQueryClient();
	return useMutation(() => PostsAPI.updatePost(id, newData), {
		onSuccess: () => queryClient.refetchQueries(`posts`),
		onError: () => null,
		onSettled: () => null,
	});
};

export const useDeletePost = id => {
	const queryClient = useQueryClient();
	return useMutation(() => PostsAPI.deletePost(id), {
		onSuccess: () => queryClient.refetchQueries(`posts`),
		onError: () => null,
		onSettled: () => null,
	});
};

export const usePosts = () => {
	return useQuery(`posts`, PostsAPI.getPosts);
};
