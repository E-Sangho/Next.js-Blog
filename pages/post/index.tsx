import type { GetStaticProps } from "next";
import PostCard from "@components/PostCard";
import { getPosts, IPost } from "@apis/Posts";
import Layout from "@components/Layout";
import { ChainName } from "@utils/index";
import { useState } from "react";

const PostPage = ({ posts }: { posts: IPost[] }) => {
	let tagSet: Set<string> = new Set();
	const [tagSelected, setTagSelected] = useState<Set<string>>(new Set());

	for (let post of posts) {
		for (let tag of post.metaData.tag) {
			tagSet.add(tag);
		}
	}

	let tagList = Array.from(tagSet);

	const clickTag = (event: React.MouseEvent<HTMLDivElement>) => {
		let curSet = new Set(tagSelected);
		if (tagSelected.has(event.currentTarget.innerText)) {
			curSet.delete(event.currentTarget.innerText);
			setTagSelected(curSet);
		} else {
			curSet.add(event.currentTarget.innerText);
			setTagSelected(curSet);
		}
	};

	return (
		<Layout title="Posts" hasTabBar={true}>
			<div className="flex mx-4 py-2">
				{tagList.map((tag: string) => (
					<div
						onClick={clickTag}
						key={tag}
						className={ChainName(
							"rounded-md mx-2 px-4",
							tagSelected.has(tag)
								? "text-indigo-300 bg-indigo-600"
								: "text-zinc-200 bg-slate-700"
						)}
					>
						{tag}
					</div>
				))}
			</div>
			<div className="mx-4">
				{posts
					.filter((post) => {
						if (tagSelected.size === 0) {
							return true;
						}

						for (let tag of post.metaData.tag) {
							if (tagSelected.has(tag)) {
								return true;
							}
						}

						return false;
					})
					.map((post) => (
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
			posts: JSON.parse(
				JSON.stringify(
					posts.sort((a, b) => {
						return b.metaData.date - a.metaData.date;
					})
				)
			),
		},
	};
};
