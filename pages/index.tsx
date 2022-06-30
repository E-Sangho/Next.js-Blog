import type { GetStaticProps } from "next";
import PostCard from "@components/PostCard";
import { getPosts, IPost } from "@apis/Posts";

const Home = ({ posts }: { posts: IPost[] }) => {
	return (
		<div>
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	);
};

export default Home;

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
