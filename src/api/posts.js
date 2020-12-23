import axios from 'axios';

export const PostsAPI = {
	getPostById: async id => {
		const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
		return data;
	},
	createPost: async newData => {
		const { data } = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
			body: JSON.stringify(newData),
		});
		return data;
	},
	updatePost: async (id, newData) => {
		const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			body: JSON.stringify(newData),
		});
		return data;
	},
	deletePost: async id => {
		const { data } = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
		return data;
	},
	getPosts: async () => {
		const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
		return data;
	},
};
