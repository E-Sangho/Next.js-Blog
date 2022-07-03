import type { GetStaticProps } from "next";
import PostCard from "@components/PostCard";
import { getPosts, IPost } from "@apis/Posts";
import Layout from "@components/Layout";

const PostPage = ({ posts }: { posts: IPost[] }) => {
	return (
		<Layout title="Posts" hasTabBar={true}>
			<div className="mx-4">
				{posts.map((post) => (
					<PostCard key={post.slug} post={post} />
				))}
			</div>
		</Layout>
	);
};

export default PostPage;

export const getStaticProps: GetStaticProps = () => {
	const posts = getPosts();

	return {
		props: {
			posts: posts.sort((a, b) => {
				return b.metaData.date - a.metaData.date;
			}),
		},
	};
};
