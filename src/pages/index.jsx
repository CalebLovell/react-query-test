import { useDeletePost, usePost, usePosts } from '../hooks/posts';

import { useQueryClient } from 'react-query';
import { useState } from 'react';

export default function IndexPage() {
	const [postId, setPostId] = useState(-1);
	return <>{postId > -1 ? <Post postId={postId} setPostId={setPostId} /> : <Posts setPostId={setPostId} />}</>;
}

const Posts = ({ setPostId }) => {
	const queryClient = useQueryClient();
	const { status, data, error, isFetching } = usePosts();

	return (
		<div>
			<h1>Posts</h1>
			<div>
				{status === `loading` ? (
					`Loading...`
				) : status === `error` ? (
					<span>Error: {error.message}</span>
				) : (
					<>
						<div>
							{data.map(post => (
								<p key={post.id}>
									<a
										onClick={() => setPostId(post.id)}
										href='#'
										style={
											// We can use the queryCache here to show bold links for
											// ones that are cached
											queryClient.getQueryData([`post`, post.id]) ? { fontWeight: `bold`, color: `green` } : {}
										}
									>
										{post.title}
									</a>
								</p>
							))}
						</div>
						<div>{isFetching ? `Background Updating...` : ` `}</div>
					</>
				)}
			</div>
		</div>
	);
};

const Post = ({ postId, setPostId }) => {
	const { status, data, error, isFetching } = usePost(postId);

	const { mutate: deletePostMutate, status: deletePostStatus } = useDeletePost(postId);

	const onDelete = async () => {
		deletePostMutate();
		setPostId();
	};

	return (
		<div>
			<div>
				<a onClick={() => setPostId(-1)} href='#'>
					Back
				</a>
			</div>
			{!postId || status === `loading` ? (
				`Loading...`
			) : status === `error` ? (
				<span>Error: {error.message}</span>
			) : (
				<>
					<h1>{data.title}</h1>
					<div>
						<p>{data.body}</p>
					</div>
					<div>{isFetching ? `Background Updating...` : ` `}</div>
				</>
			)}
			<button onClick={onDelete}>Delete</button>
		</div>
	);
};
